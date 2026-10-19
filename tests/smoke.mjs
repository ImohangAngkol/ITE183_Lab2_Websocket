// Optional integration check. Start the BSL server first, then use Node 22+.
// Node is only used for this check; the application runs entirely on BSL.
import assert from "node:assert/strict";
import net from "node:net";
import { randomBytes, createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const port = "8081";
const root = await fetch(`http://localhost:${port}/`);
assert.equal(root.status, 200);
assert.match(root.headers.get("content-type"), /text\/html/);
assert.equal(await root.text(), await readFile("public/index.html", "utf8"));
const missing = await fetch(`http://localhost:${port}/undefined-route`);
assert.equal(missing.status, 404);
assert.equal(await missing.text(), await readFile("public/404.html", "utf8"));
console.log(`HTTP serving and custom error page passed (fallback status: ${missing.status}).`);

function client() {
  // The reference native library parses header names case-sensitively.
  // Use the canonical browser casing rather than Node's lowercase headers.
  const connection = net.connect(Number(port), "127.0.0.1");
  const key = randomBytes(16).toString("base64");
  let upgraded = false;
  let buffer = Buffer.alloc(0);
  const received = [];
  const waiters = new Set();
  connection.on("connect", () => {
    connection.write(`GET / HTTP/1.1\r\nHost: localhost:${port}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`);
  });
  connection.on("data", chunk => {
    buffer = Buffer.concat([buffer, chunk]);
    if (!upgraded) {
      const end = buffer.indexOf("\r\n\r\n");
      if (end < 0) return;
      const headers = buffer.subarray(0, end).toString();
      assert.match(headers, /^HTTP\/1.1 101 Switching Protocols/);
      const accept = createHash("sha1").update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest("base64");
      assert.ok(headers.includes(`Sec-WebSocket-Accept: ${accept}`));
      console.log("Verified HTTP 101 upgrade and Sec-WebSocket-Accept.");
      buffer = buffer.subarray(end + 4);
      upgraded = true;
    }
    while (buffer.length >= 2) {
      const opcode = buffer[0] & 15;
      let length = buffer[1] & 127;
      let offset = 2;
      if (length === 126) {
        if (buffer.length < 4) return;
        length = buffer.readUInt16BE(2);
        offset = 4;
      } else if (length === 127) {
        if (buffer.length < 10) return;
        length = Number(buffer.readBigUInt64BE(2));
        offset = 10;
      }
      if (buffer.length < offset + length) return;
      const body = buffer.subarray(offset, offset + length);
      buffer = buffer.subarray(offset + length);
      if (opcode === 1) received.push(body.toString("utf8"));
      for (const check of waiters) check();
    }
  });
  function frame(opcode, text = "") {
    const body = Buffer.from(text);
    const mask = randomBytes(4);
    const header = Buffer.alloc(body.length < 126 ? 2 : 4);
    header[0] = 128 | opcode;
    header[1] = 128 | (body.length < 126 ? body.length : 126);
    if (body.length >= 126) header.writeUInt16BE(body.length, 2);
    const masked = Buffer.from(body);
    for (let i = 0; i < masked.length; i++) masked[i] ^= mask[i % 4];
    connection.write(Buffer.concat([header, mask, masked]));
  }
  const socket = {
    send: text => frame(1, text),
    close: () => { if (upgraded) frame(8); connection.end(); connection.destroy(); }
  };
  const waitFor = predicate => new Promise((resolve, reject) => {
    const timer = setTimeout(() => { waiters.delete(check); reject(new Error("Timed out waiting for WebSocket data")); }, 5000);
    function check() {
      const found = received.find(predicate);
      if (found !== undefined) {
        clearTimeout(timer);
        waiters.delete(check);
        resolve(found);
      }
    }
    waiters.add(check);
    check();
  });
  return { socket, received, waitFor };
}

const clients = [client(), client()];
try {
  const ids = await Promise.all(clients.map(async c => {
    await c.waitFor(text => text === "Welcome to BSL LIVE!");
    return (await c.waitFor(text => /^Your client ID: \d+$/.test(text))).split(": ")[1];
  }));
  assert.notEqual(ids[0], ids[1], "Each client needs its own ID");
  console.log(`Distinct client IDs: ${ids.join(", ")}.`);
  for (const [sender, body] of [[0, "Hello from window A"], [1, "Reply from window B"], [0, "Purple 🟣 orange 🟠 <script>alert('text only')</script>"], [1, "Long message: " + "x".repeat(480)]]) {
    const expected = `User ${ids[sender]} says: ${body}`;
    clients[sender].socket.send(body);
    await Promise.all(clients.map(c => c.waitFor(text => text === expected)));
    for (const c of clients) assert.equal(c.received.filter(text => text === expected).length, 1);
  }
  console.log("Two unique clients, bidirectional broadcasts, sender echo, Unicode, and long frames passed.");
  clients[1].socket.close();
  const survivor = `User ${ids[0]} says: Still connected after the other client left`;
  clients[0].socket.send("Still connected after the other client left");
  await clients[0].waitFor(text => text === survivor);
  const replacement = client();
  clients.push(replacement);
  await replacement.waitFor(text => /^Your client ID: \d+$/.test(text));
  const rejoined = `User ${ids[0]} says: A new client can rejoin`;
  clients[0].socket.send("A new client can rejoin");
  await Promise.all([clients[0], replacement].map(c => c.waitFor(text => text === rejoined)));
  console.log("Remaining client stays active after disconnect; a new client joins and receives broadcasts.");
} finally {
  for (const c of clients) c.socket.close();
}

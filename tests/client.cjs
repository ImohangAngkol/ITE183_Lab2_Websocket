// Browser-script behavior check without extra packages: node tests/client.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

class Element {
  constructor() { this.children = []; this.handlers = {}; this.value = ""; this.textContent = ""; this.hidden = false; this.disabled = false; this.scrollHeight = 1000; this.classList = { toggle() {} }; }
  append(...children) { this.children.push(...children); }
  setAttribute() {}
  focus() {}
  addEventListener(name, handler) { this.handlers[name] = handler; }
}
const elements = new Map();
const get = id => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
const sockets = [];
let expectedSocketUrl = "ws://localhost:8081";
class Socket {
  static CONNECTING = 0; static OPEN = 1; static CLOSING = 2; static CLOSED = 3;
  constructor(url) { assert.equal(url, expectedSocketUrl); this.readyState = 0; this.sent = []; sockets.push(this); }
  send(text) { this.sent.push(text); }
  close() { this.readyState = 3; this.onclose(); }
}
const timers = new Map();
let timerId = 0;
const script = fs.readFileSync("public/index.html", "utf8").match(/<script>([\s\S]*?)<\/script>/)[1];
vm.runInNewContext(script, {
  window: { location: { protocol: "http:", host: "localhost:8081" } },
  document: { getElementById: get, createElement: () => new Element() }, WebSocket: Socket, Date,
  setTimeout: fn => { timers.set(++timerId, fn); return timerId; }, clearTimeout: id => timers.delete(id)
});
const socket = sockets[0];
assert.equal(get("server-address").textContent, expectedSocketUrl);
assert.equal(get("message-input").disabled, true);
socket.readyState = Socket.OPEN;
socket.onopen();
assert.equal(get("connection-label").textContent, "CONNECTED");
assert.equal(get("message-input").disabled, false);
assert.equal(get("send").disabled, false);
socket.onmessage({ data: "Welcome to BSL LIVE!" });
socket.onmessage({ data: "Your client ID: 2" });
assert.equal(get("client-status").textContent, "User 2");
const submit = text => { get("message-input").value = text; get("composer").handlers.submit({ preventDefault() {} }); };
submit("   ");
assert.equal(socket.sent.length, 0);
const before = get("messages").children.length;
submit("  Hello <script> & 🟣  ");
assert.deepEqual(socket.sent, ["Hello <script> & 🟣"]);
assert.equal(get("message-input").value, "");
assert.equal(get("messages").children.length, before, "Wait for echo rather than duplicating the message");
socket.onmessage({ data: "User 1 says: Hello <script> & 🟣" });
assert.equal(get("messages").children.at(-1).className, "message", "Another user's identical text must stay incoming");
socket.onmessage({ data: "User 2 says: Hello <script> & 🟣" });
const outgoing = get("messages").children.at(-1);
assert.equal(outgoing.className, "message outgoing");
assert.equal(outgoing.children[1].children[1].textContent, "Hello <script> & 🟣");
assert.equal(get("messages").children.length, before + 2);
assert.equal(get("history").scrollTop, get("history").scrollHeight);
socket.onerror();
assert.equal(get("send").disabled, true);
assert.match(get("connection-notice").textContent, /localhost:8081/);
socket.close();
assert.equal(get("connection-label").textContent, "DISCONNECTED");
assert.equal(get("message-input").disabled, true);
assert.equal(get("reconnect").disabled, false);
submit("Keep my draft");
assert.equal(socket.sent.length, 1);
assert.equal(get("message-input").value, "Keep my draft");
get("reconnect").handlers.click();
assert.equal(sockets.length, 2);
assert.equal(get("connection-label").textContent, "CONNECTING");
assert.equal(get("reconnect").disabled, true);
sockets[1].readyState = Socket.OPEN;
sockets[1].onopen();
assert.equal(get("send").disabled, false);
assert.equal(get("client-status").textContent, "Connected");
// Verify scheme selection and host-derived addresses, including remote access.
for (const protocol of ["http:", "https:"]) {
  expectedSocketUrl = (protocol === "https:" ? "wss:" : "ws:") + "//lounge.example:8081";
  vm.runInNewContext(script, {
    window: { location: { protocol, host: "lounge.example:8081" } },
    document: { getElementById: get, createElement: () => new Element() }, WebSocket: Socket, Date,
    setTimeout: () => 0, clearTimeout() {}
  });
  assert.equal(get("server-address").textContent, expectedSocketUrl);
}
console.log("Connection lifecycle, disabled controls, empty-message rejection, sender identity, single echo, text safety, scrolling, drafts, and reconnect passed.");

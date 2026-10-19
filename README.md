# BSL LIVE // Developer Lounge

**ITE183 - Web Systems and Technologies | Laboratory 2: WebSocket Server**

A real-time, multi-client chat built with **Bonezegei Scripting Language v1.3.3** and the native HTTP/WebSocket library. The existing purple/orange interface connects everyone to **#general** on port **8081**.

**Verified October 19, 2026:** installation succeeds when this server is stopped; HTTP 200/404, WebSocket handshakes, multi-client broadcasting, disconnect handling, and actual two-window browser messaging pass. All ten supplied screenshots exist, decode, and have been visually audited. They show version 1.3.3, successful installation, startup targeting 8081, connected chat, bidirectional client messaging, and the themed fallback. The updated lifecycle image shows actual connection, message, and disconnection events; real tests also verify disconnect/rejoin behavior. The separate GitHub repository is not published.

## Run locally

Install the required BSL **v1.3.3** using the [official project instructions](https://github.com/bonezegei/Bonezegei_Scripting_Language). Open PowerShell at the project root:

```powershell
bonezegei -v
bzg --version
# Stop any running instance of this Lab 2 server before installation:
bzg install
bzg run
```

Open **http://localhost:8081/** in two independent browser windows. The local socket address is **ws://localhost:8081**. Run commands at the project root so relative library and HTML paths resolve. Node and npm are not needed to run this BSL app.

The verified interpreter is **1.3.3** and package installer **1.0.2**. The manifest uses `main: app.bzg`, `start: bonezegei app.bzg`, and `http: ^1.0.0`, matching the professor's dependency and startup configuration. Keep only application startup in the scripts section: `bzg run` launches manifest scripts concurrently. The direct startup equivalent is `bonezegei app.bzg`.

### Resolved installation error: code=4

The running server had Windows' native library `lib/http/http.dll` loaded. The installer downloaded its replacement, then failed to open the destination DLL for writing. Its internal `code=4` means that output-file open failed. A no-write probe returned **EBUSY**, confirming the lock. The file was not read-only and its access rules allowed modification.

**Resolution:** stop only this project's BSL process, verify port 8081 is free, run `bzg install`, then restart with `bzg run`. The project-root install then reported **Installed 'http' for arch=x86** and exited 0. No manifest correction was necessary. The earlier failure also returned process exit 0, so always inspect the installer message.

The original working DLL, loader, and metadata were preserved in `.tools/original-http-library/`. The official installer supplied an updated DLL; the loader and API metadata are unchanged. All live tests passed with that installed DLL. Its hash and the original backup hash are recorded in [the diagnosis](documentation/evidence/installation-diagnosis.json). The local backup is intentionally ignored by Git; the active Windows DLL and upstream MIT notice remain included.

Evidence: [earlier failure](documentation/evidence/installation.txt), [successful stopped-server install](documentation/evidence/installation-server-stopped.txt), [full investigation](documentation/LABORATORY_REPORT.md).

### Port and platform

Keep **8081** for Lab 2. Other applications on the verification machine use **8000** and **8080**; do not stop or reconfigure them. Before starting a second instance:

```powershell
netstat -ano -p tcp | Select-String ':8081\s'
curl.exe --max-time 5 -i http://localhost:8081/
```

The browser derives the WebSocket URL from `window.location.host`, using `ws:` for HTTP and `wss:` for HTTPS. Local execution uses HTTP/WS. TLS deployment and other operating systems were not tested. Other platforms need their matching native library from the official upstream source.

## How it works

| Event | Behavior |
| --- | --- |
| HTTP `GET /` | Serve `public/index.html` through `server.sendFile` |
| Undefined route | Send the exact `public/404.html` content with HTTP **404** |
| HTTP upgrade | Native library establishes a persistent WebSocket connection on port 8081 |
| `onConnect(clientId)` | Log connection; privately send welcome and identity through `server.send` |
| `onData(message, clientId)` | Log the payload; broadcast `User <id> says: <message>` through `server.sendAll` |
| `onDisconnect(clientId)` | Log the departed connection; remaining clients continue |

BSL registers event callbacks and the native library dispatches HTTP and WebSocket events while `server.run()` remains active. Messages travel in both directions without page reloads or polling. IDs distinguish active connections and may be reused after disconnect; they are not authenticated accounts.

The frontend uses the private identity notice to label the sender's echo as **You**, displaying each broadcast once. It supports Send/Enter, whitespace rejection, a 500-character input limit, timestamps, automatic scrolling, connection state, disabled offline controls, retained drafts, and retries after 3, 6, 12, then 15 seconds. Received content uses `textContent`; HTML remains literal text. Unconfirmed messages are not resent automatically.

Only #general is implemented; other rooms are marked planned. Messages are session-only. Authentication, persistent history, and server-side length enforcement are outside this implementation.

## Verification results

Optional developer checks require Node (verified with **24.11.1**) and no npm packages:

```powershell
node tests/client.cjs
bzg-linter app.bzg
# With bzg run active in another terminal:
node tests/smoke.mjs
```

| Check | Result | Evidence |
| --- | --- | --- |
| BSL version | PASS: 1.3.3 | [Version](documentation/evidence/version.txt) |
| `bzg install` | PASS after stopping this server | [Install output](documentation/evidence/installation-server-stopped.txt) |
| `bzg run` | PASS: actual listener and responses on 8081 | [Startup/lifecycle](documentation/evidence/server-followup.txt) |
| HTTP routes | PASS: exact root file, HTTP 200; exact fallback file, HTTP 404 | [Integration](documentation/evidence/final-audit-smoke.txt) |
| WebSocket protocol | PASS: validated HTTP 101/accept value, distinct IDs, bidirectional broadcasts, Unicode, extended frames | [Integration](documentation/evidence/final-audit-smoke.txt) |
| Disconnect/rejoin | PASS: survivor remains active; replacement receives broadcast | [Integration](documentation/evidence/final-audit-smoke.txt) |
| Frontend behavior and BSL linter | PASS, exit 0 | [Client](documentation/evidence/client-followup.txt), [linter](documentation/evidence/lint-followup.txt) |
| Two independent Edge windows | PASS: A sends; B receives/replies; A receives reply, correct authors | [Browser observations](documentation/evidence/browser-verification.json) |
| Custom 404 browser view and return link | PASS | [Actual capture](documentation/screenshots/05-custom-404.jpg) |
| Terminal screenshots | All four present and visually verified: version, successful install, startup on 8081, connection/message/disconnection logs | [Visual review](documentation/evidence/screenshot-review.json) |

The integration test uses real TCP/WebSocket clients. The frontend test uses a simulated DOM. Separate actual-browser interaction was completed and captured in this follow-up.

## Genuine screenshots

All ten images below exist, fully decode, and were visually checked. Captions state exactly what is visible. [Screenshot audit](documentation/evidence/screenshot-audit.json) records dimensions and hashes. Only existing files are embedded.

### Interpreter version

The terminal shows `bonezegei -v` at the project root and **Bonezegei Script Interpreter v1.3.3**.

![Actual terminal version verification](documentation/screenshots/01-version.png)

### Successful installation

The terminal shows `bzg install` followed by **Installed http for arch=x86** after stopping the previous Lab 2 process. This is the successful installation evidence; the original DLL lock failure remains documented separately.

![Successful actual bzg install output](documentation/screenshots/02-installation.png)

### Server startup on port 8081

The capture shows `bzg run` launching `bonezegei app.bzg` and **Starting BSL LIVE // Developer Lounge: http://localhost:8081**. It also contains an earlier code=4 installation failure, which must not be captioned as installation success. Independent live HTTP/WebSocket checks confirm the server actually serves on that port.

![bzg run startup targeting localhost port 8081](documentation/screenshots/03-server-startup.png)

### Actual WebSocket terminal messages

The updated user-supplied capture shows **WebSocket connected!** events for identified clients, received messages from clients 0 and 1 (including **hello** from client 0), and explicit **WebSocket disconnected!** events. The lower part clearly shows clients 1 and 0 disconnecting. This is genuine visual evidence of all three lifecycle callbacks, corroborated by the saved server transcript and live disconnect/rejoin test.

![Actual WebSocket connection, received-message, and disconnection events](documentation/screenshots/06-server-logs.png)

### Connected interface

The genuine page shows CONNECTED, the host-derived socket endpoint, handshake/welcome notices, and client ID 2.

![Connected BSL LIVE interface](documentation/screenshots/08-connected-lounge.jpg)

### Two independent browser clients

Window A (User 2) shows its outgoing message and the incoming reply from User 0. Window B shows the same exchange with the incoming/outgoing roles reversed. These captures corroborate the recorded bidirectional browser test.

![Window A: outgoing message and incoming reply](documentation/screenshots/04a-client-a.jpg)

![Window B: incoming message and outgoing reply](documentation/screenshots/04b-client-b.jpg)

### Custom fallback

The address bar shows the actual unknown route and themed fallback. The live test separately verifies HTTP 404; an image alone does not prove the response status.

![Custom 404 at the unknown route](documentation/screenshots/05-custom-404.jpg)

### Supplemental user-provided chat evidence

These earlier original PNGs were found in the documentation root and moved into the screenshots folder. They show the same BSL LIVE session from User 0 and User 1, including reciprocal messages such as ?oi? and ?saman?. They support multi-client chat behavior but are not terminal captures or evidence of this audit's test execution.

![Earlier user-provided chat view, User 0](documentation/screenshots/proof1.png)

![Earlier user-provided chat view, User 1](documentation/screenshots/proof2.png)

All ten supplied filenames are present and all required screenshot purposes are verified, including the updated lifecycle capture. See the [complete screenshot inventory](documentation/screenshots/README.md) and [final readiness checklist](documentation/SUBMISSION_READINESS.md).

## Project structure

The publication set contains only active Lab 2 files and intentional evidence:

```text
.gitattributes
.gitignore
LICENSE
README.md
app.bzg
package.json
lib/
  http.bzg
  http.json
  http/
    http.dll
    LICENSE
public/
  index.html
  404.html
tests/
  client.cjs
  smoke.mjs
documentation/
  LABORATORY_REPORT.md
  GITHUB_PREPARATION.md
  SUBMISSION_READINESS.md
  evidence/                    Actual Lab 2 logs, responses, hashes, audit records
  screenshots/                 Ten audited images and evidence inventory
```

Legacy portfolio pages, the old manual HTTP server, original Lab 1 PNGs, and unused socket libraries were preserved under ignored `.local-archive/lab1/`. Local diagnostic tools and the original HTTP library backup remain under ignored `.tools/`; temporary diagnostic downloads remain under ignored `tmp/`. None belongs in the publication set. [Submission audit](documentation/SUBMISSION_READINESS.md) records the checks and exact publication manifest.

## GitHub preparation

Required new public repository: **`ITE183_Lab2_Websocket`**, with README, MIT License, and the required BSL language mapping. Follow [GitHub preparation](documentation/GITHUB_PREPARATION.md) after reviewing the completed evidence and file list. The project root has no `.git` directory. Nothing was initialized, staged, committed, pushed, or published. The [Lab 1 repository](https://github.com/ImohangAngkol/ite183-bsl-http-server) and unrelated processes were untouched.

GitHub hosts source; GitHub Pages cannot execute this BSL/native WebSocket server. A live deployment is a separate hosting task.

## References and license

Primary requirements: the professor's local *Laboratory 2: WebSocket Server* handout, 11 pages, reviewed in the initial verification. See the report for page mapping.

- [Professor's reference implementation](https://github.com/msuiit-ph/BSL_HTTP_and_WebSocket)
- [Reference manifest](https://github.com/msuiit-ph/BSL_HTTP_and_WebSocket/blob/main/package.json)
- [Bonezegei Scripting Language](https://github.com/bonezegei/Bonezegei_Scripting_Language)
- [Official package index](https://github.com/bonezegei/Bonezegei_Scripting_Language/blob/main/Package/package.json)
- [Native HTTP library](https://github.com/bonezegei/BSL_HTTP)
- [BSL standard library](https://bonezegei.com/tutorials/bsl/stdlib)

Project source uses the [MIT License](LICENSE); the HTTP library retains its [upstream MIT notice](lib/http/LICENSE).

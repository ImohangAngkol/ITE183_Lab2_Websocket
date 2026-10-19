# Screenshot evidence inventory

**Final audit:** October 19, 2026 (Asia/Manila).

All **ten supplied files are present, fully decode, and have been visually inspected**. They are embedded with captions in the root README and laboratory report. Dimensions and SHA-256 hashes are recorded in [screenshot-audit.json](../evidence/screenshot-audit.json); content assessments are in [screenshot-review.json](../evidence/screenshot-review.json).

## Confirmed content

| Screenshot | Dimensions | Visible evidence and assessment |
| --- | --- | --- |
| [01-version.png](01-version.png) | 503 x 178 | Project-root `bonezegei -v`; interpreter **v1.3.3**, Windows. PASS. Package manager version is not shown here. |
| [02-installation.png](02-installation.png) | 995 x 135 | Project-root `bzg install`; **Installed http for arch=x86**, followed by returned prompt. PASS. Prior stop-process confirmation and listener check are also visible. Numeric exit code is not pictured. |
| [03-server-startup.png](03-server-startup.png) | 504 x 172 | `bzg run` launches `bonezegei app.bzg`; startup target **http://localhost:8081**. PASS for startup. Earlier failed install code=4 is also visible and is labeled historical context, not success. |
| [04a-client-a.jpg](04a-client-a.jpg) | 1920 x 1032 | User 2's outgoing A message and incoming reply from User 0; connected localhost:8081. PASS. |
| [04b-client-b.jpg](04b-client-b.jpg) | 1920 x 1032 | User 0's incoming A message and own B reply, same conversation with opposite labels. PASS for reciprocal independent client messaging. |
| [05-custom-404.jpg](05-custom-404.jpg) | 1920 x 1032 | Actual `/unknown-route` address and expected themed fallback with return link. PASS for appearance; live protocol test establishes HTTP 404. |
| [06-server-logs.png](06-server-logs.png) | 1060 x 267 | Actual connected callbacks, messages from clients 0/1 (including **hello** from 0), and explicit disconnected callbacks for identified clients. PASS for all lifecycle event categories. |
| [08-connected-lounge.jpg](08-connected-lounge.jpg) | 1920 x 1032 | CONNECTED, host-derived endpoint, handshake/welcome, client ID 2. PASS. |
| [proof1.png](proof1.png) | 1848 x 899 | Earlier BSL LIVE User 0 view with own messages and incoming User 1 messages. PASS as supplemental prior chat evidence. |
| [proof2.png](proof2.png) | 1848 x 896 | Same earlier conversation from User 1's perspective, showing reciprocal labels. PASS as supplemental evidence. |

The terminal PNGs are user-supplied originals. The four browser JPEGs are original same-machine Edge window captures, saved without generation, compositing, or editing. The proof PNGs are earlier user-provided Lab 2 captures; their file timestamps are not used to invent dates for their test sessions. The two browser JPEGs show different active client identities and matching reciprocal messages, corroborated by the recorded real browser test and server transcript.

No credentials were visible in any of the ten inspected images. Original browser chrome and ordinary project-local paths remain part of the captures.

## Installation and startup interpretation

`02-installation.png` visibly demonstrates a successful install. It is consistent with [the actual successful command output](../evidence/installation-server-stopped.txt) and the [resolved DLL-lock diagnosis](../evidence/installation-diagnosis.json). The former failure occurred because the running BSL process held `http.dll` loaded; installation succeeded after only that Lab 2 server was stopped.

`03-server-startup.png` visibly demonstrates invocation of `bzg run` and the port-8081 startup target. The preceding install failure in that image remains correctly labeled. Actual listener inspection and the [final live test](../evidence/final-audit-smoke.txt) independently confirm successful HTTP/WebSocket service; the startup banner is not treated as bind proof by itself.

## Completed lifecycle evidence

The user supplied an updated 06-server-logs.png during the audit. It was reopened and visually inspected. It now contains explicit **WebSocket disconnected! Client ID: ...** lines in addition to connected callbacks and received messages, completing the requested lifecycle screenshot evidence. The screenshot-audit record contains its new dimensions and SHA-256 hash; screenshot-review.json records the final PASS assessment.

All ten supplied images now meet their stated purposes. The two proof PNGs remain supplemental older chat captures. No screenshot was fabricated, regenerated, composited, or edited by the assistant. The current user-supplied lifecycle image replaced the earlier incomplete view.

The [latest real protocol test](../evidence/final-audit-smoke.txt) also passes disconnect/rejoin behavior; [server-followup.txt](../evidence/server-followup.txt) preserves earlier actual lifecycle output. These text records complement the screenshots and are not substituted for them.

The optional 07-reconnect.png is not present and is not required or embedded. There are no missing required screenshot filenames or purpose gaps. Review the [final submission checklist](../SUBMISSION_READINESS.md) before a later authorized publication session.

# Final GitHub submission-readiness audit

**Required repository name:** `ITE183_Lab2_Websocket`  
**Audit date:** October 19, 2026 (Asia/Manila)  
**Status:** local application, documentation, and requested screenshot evidence are ready for a later authorized publication session. The GitHub repository has not been created or published, as instructed.

## Final laboratory requirements checklist

| Requirement | Final result | Verified evidence |
| --- | --- | --- |
| Bonezegei v1.3.3 | PASS | 01-version.png visibly shows interpreter v1.3.3; actual saved version output agrees |
| Package manifest | PASS | Valid package.json; app.bzg entry; bonezegei app.bzg start command; http ^1.0.0 dependency; MIT license |
| Successful dependency install | PASS | 02-installation.png visibly shows Installed http for arch=x86; actual successful output and installed DLL hash agree |
| Resolved installation challenge | PASS | Loaded http.dll lock diagnosed; original library backed up; stopped-server install succeeded; earlier failure correctly retained as historical context |
| Server execution on 8081 | PASS | 03-server-startup.png shows bzg run and localhost:8081 target; actual listener and live requests independently establish service |
| Event-driven HTTP/WebSocket server | PASS | get/onConnect/onData/onDisconnect callbacks and server.run in app.bzg; real runtime tests pass |
| Static main page | PASS | HTTP 200, HTML type, exact public/index.html response |
| Custom fallback | PASS | HTTP 404, exact public/404.html; 05-custom-404.jpg shows actual unknown-route fallback and return link |
| HTTP-to-WebSocket upgrade | PASS | HTTP 101 and calculated Sec-WebSocket-Accept validated by real protocol clients |
| Client identification | PASS | Distinct active IDs in tests and browser screenshots; private identity notices |
| Real-time multi-client broadcasting | PASS | Two-way protocol delivery, single sender echo, Unicode/extended frames; reciprocal browser screenshots |
| Connection handling | PASS | Updated 06-server-logs.png visibly shows actual WebSocket connected events |
| Message callback handling | PASS | Updated 06-server-logs.png shows messages received from clients 0 and 1 |
| Disconnection handling | PASS | Updated 06-server-logs.png visibly includes WebSocket disconnected lines; actual server transcript and live test agree |
| Surviving connection and rejoin | PASS | Latest live test proves survivor remains active and replacement receives broadcast |
| Independent browser clients | PASS | 04a/04b show Users 2/0 with matching reciprocal messages and opposite sender labels; recorded browser test used separate windows |
| Connected interface | PASS | 08-connected-lounge.jpg shows CONNECTED, host-derived endpoint, handshake/welcome, client ID |
| Genuine screenshot inventory | PASS | All ten originals fully decode and were visually inspected; four terminal, four browser, two supplemental prior chat captures |
| README and laboratory report | COMPLETE | Ten existing images embedded once per document, accurate captions, tests, challenges, solutions, conclusion |
| Markdown image/local links | PASS | All image targets and relative documentation links exist |
| Required language mapping | PASS | .gitattributes contains *.bzg linguist-language=JavaScript |
| MIT License | PASS | Root MIT License and upstream HTTP library MIT notice retained |
| Required BSL libraries | PASS | Active loader, native Windows DLL, and upstream API metadata present; installed DLL integrity matches verified record |
| Lab 1 independence | PASS | Active app needs only Lab 2 source/public files and lib/http; legacy files are ignored local archives, not publication candidates |
| Credential/temporary-file audit | PASS within scan scope | No credential-pattern findings or credential-file candidates; temporary tools, downloads and legacy material excluded |
| GitHub repository name/public visibility | PREPARED, NOT EXECUTED | Later create public ITE183_Lab2_Websocket; no repository or public URL claimed yet |
| Staging, commits, push, repository creation | NOT PERFORMED | Explicitly withheld per user instruction; no project-root .git metadata |

The screenshot review is complete, including the user-updated lifecycle image. The startup image includes an earlier failed installation message above its successful launch command; its caption preserves that distinction. Successful-install evidence is the separate 02-installation.png, not the failed line in the startup capture. A startup banner alone is not bind proof, and a rendered 404 image alone is not status-code proof; live checks provide those protocol results.

## Final non-disruptive verification

The current user-started server was already listening on port **8081**, PID **34684**, when this audit began. The assistant did not stop or restart it. The [final live test](evidence/final-audit-smoke.txt) exited 0 and verified HTTP 200/404, handshake accept values, distinct client IDs 2/3, bidirectional broadcasts, sender echo, Unicode/extended frames, disconnect survival, and rejoining. The [frontend check](evidence/final-audit-client.txt) and [BSL linter](evidence/final-audit-lint.txt) also exited 0.

The original app.bzg, package.json, both public HTML files, and active installed native DLL retain their previously verified hashes. The original working HTTP library backup remains intact in ignored .tools/original-http-library/. Installation was not repeated merely for this audit. Existing services on ports **8000/PID 6260** and **8080/PID 5032** were not modified or stopped.

Detailed results are in [submission-audit.json](evidence/submission-audit.json), [screenshot-audit.json](evidence/screenshot-audit.json), and [screenshot-review.json](evidence/screenshot-review.json). The [publication file list](evidence/publication-files.txt) enumerates proposed repository contents; it is not a Git index or a claim of publication.

## Final publication structure

```text
ITE183_Lab2_Websocket/
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
    GITHUB_PREPARATION.md
    LABORATORY_REPORT.md
    SUBMISSION_READINESS.md
    evidence/
      publication-files.txt
      submission-audit.json
      screenshot-audit.json
      screenshot-review.json
      final-audit-smoke.txt
      final-audit-client.txt
      final-audit-lint.txt
      ... intentional Lab 2 test logs, diagnosis, hashes, HTTP responses
    screenshots/
      README.md
      01-version.png
      02-installation.png
      03-server-startup.png
      04a-client-a.jpg
      04b-client-b.jpg
      05-custom-404.jpg
      06-server-logs.png
      08-connected-lounge.jpg
      proof1.png
      proof2.png
```

The optional 07-reconnect.png is not supplied, required, or embedded. No nonexistent screenshot reference remains.

## Repository hygiene and independence

The active server imports only lib/http.bzg, loads its native HTTP library, and serves only the Lab 2 public files. It does not depend on the Lab 1 repository, portfolio pages, old manual HTTP server, Faculty Scheduling System, or another project's files. Port 8081 and the host-derived WebSocket URL are preserved.

The following are local-only and excluded by .gitignore:

- `.local-archive/`: preserved Lab 1 pages, old HTTP source/screenshots, and unused socket libraries; none is in the publication list.
- `.tools/`: diagnostic packages and the original native HTTP library rollback copy.
- `tmp/`: investigation downloads, scripts and rendering intermediates.
- Standard node_modules, editor settings, environment/credential files and PID files covered by the ignore rules.

No source was deleted or changed in the original Lab 1 project, Faculty Scheduling System, or unrelated applications. The active Windows DLL and its upstream license remain included; no broad DLL ignore hides the runtime dependency.

All proposed publication files were checked for private-key material, common provider-token patterns, credential URLs, and credential-like filenames. No findings were detected. All ten images were visually checked and show no credentials. This is a bounded audit, not a guarantee against every possible representation of a secret. Historical Lab 2 command logs and response snapshots are retained intentionally as evidence; tool installations, temporary downloads and legacy archives are excluded rather than published.

## Remaining submission actions

There are no unresolved local implementation or required screenshot-evidence gaps. In a later authorized publication session:

1. Create the separate **public ITE183_Lab2_Websocket** repository using the reviewed publication file list; do not copy local ignored directories or Lab 1 Git metadata.
2. Verify the new remote points only to that repository and never to the Lab 1 remote.
3. Stage, commit and push only when separately authorized. None of these actions occurred in this task.
4. Verify the public README, all ten images, report, source, .gitattributes and MIT notices, then submit the verified repository URL.

GitHub source publication is separate from live hosting. GitHub Pages cannot execute the BSL/native WebSocket server; TLS hosting, cross-platform deployment, load testing and production security were outside this laboratory audit.

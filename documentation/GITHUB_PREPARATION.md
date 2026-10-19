# Separate Lab 2 GitHub preparation

Target: a new **public** repository named **`ITE183_Lab2_Websocket`** under the student's account. The intended URL is `https://github.com/ImohangAngkol/ITE183_Lab2_Websocket`. This is a planned destination, not a verified published repository link.

Working folder: `C:\Users\User\Desktop\ITE183_LAB2_BSL_WEBSOCKET`. Do not use the Lab 1 checkout or its remote `https://github.com/ImohangAngkol/ite183-bsl-http-server`.

## Prepared locally

- Existing application and purple/orange frontend retained; fallback returns true HTTP 404.
- BSL v1.3.3, successful stopped-server installation, startup, frontend behavior, real WebSocket integration, and independent browser-window messaging verified.
- README, report, actual text evidence, screenshot checklist, and `.gitignore` prepared.
- MIT License, upstream notice, and required `.gitattributes` preserved.
- Active native DLL installed successfully; original HTTP DLL/loader/metadata preserved in ignored `.tools/original-http-library/`. `.gitignore` does not exclude the active native libraries.
- No `.git` directory exists at this project's root. No Git initialization, remote changes, staging, commits, pushes, or GitHub writes were performed.

## Completed evidence and remaining publication

1. All four terminal screenshots are now present and visually verified: version 1.3.3, successful install, startup targeting 8081, and complete connection/message/disconnection events in the updated lifecycle image. Installation was not unnecessarily repeated during the audit.
2. All ten supplied Lab 2 images fully decode and are embedded with accurate captions: four terminal, four browser, and two supplemental prior chat captures. The earlier install failure visible in the startup image is labeled historical context; successful installation is shown separately.
3. The local [submission audit](SUBMISSION_READINESS.md) is complete. Review its final checklist and [publication file list](evidence/publication-files.txt) before later authorized publication. No required image filename or purpose gap remains.
4. Publish the separate public repository in a later authorized session. Publication was not performed here.

## File selection

Include active source, manifest, tests, MIT notices, installed Windows HTTP library, README, report, and genuine Lab 2 evidence. Lab 1 pages/screenshots, old manual server code, and unused socket libraries were preserved in ignored `.local-archive/lab1/`; they are excluded from the publication set.

Exclude `.local-archive/`, `.tools/`, `tmp/`, `node_modules/`, editor settings, PID files, and credentials. `.gitignore` covers these. The old proof PNGs were reviewed and retained as clearly labeled prior Lab 2 chat evidence; the old port-8080 terminal image was archived. No unrelated project content belongs in the publication list. The handout was read from Downloads and was not copied into the repository.

## Later publication procedure (not executed)

1. Create a new public GitHub repository with exactly the required name. When publishing this local folder, create an empty remote without generated files; this folder already has README and MIT License. If GitHub generates those files, clone that new repository separately and copy in the Lab 2 files, excluding local tools and temporary files.
2. Confirm the terminal is in the Lab 2 folder. Initialize Git only there if necessary. Set the new repository as the remote, then inspect `git remote -v` before any future push. Neither fetch nor push URL may point to Lab 1.
3. Review `.gitignore`, source, evidence, and the intended file list. Do not force push, replace another repository's history, or copy a Lab 1 `.git` directory.
4. Only after publication is authorized, stage the reviewed Lab 2 files, commit them, and push to the new repository's main branch.
5. Verify the public repository while signed out. Check README links, MIT License, `.gitattributes`, report, screenshots, and source tree. Submit the verified repository URL.

Suggested description: **ITE183 Laboratory 2 - BSL v1.3.3 HTTP/WebSocket chat server with real-time multi-client broadcasting.**

Suggested commit message: **Finalize ITE183 Lab 2 WebSocket chat, tests, and documentation**.

GitHub hosts source code. GitHub Pages cannot execute `app.bzg` or load this Windows native server library. A live deployment is a separate hosting task.

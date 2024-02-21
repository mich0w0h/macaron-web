# Backend

This directory contains the backend code for the Macaron web app.

## Setup

- Ensure Deno is installed.
- Run `deno cache ./src/server.ts` to cache the server file.
- Run `deno run --allow-net --allow-env --allow-read src/server.ts` to start the
  server.
- You can use `denon` command instead to automatically restart the server when
  changes are made.

## Scripts

- `test`: Run tests for the backend.
- `lint`: Lint the code using Deno's built-in linter.

## Dependencies

- Deno: Latest version
- Other dependencies as per the backend codebase.

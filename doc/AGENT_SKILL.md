# rocptx AGENT_SKILL

## Purpose

This file is the agent-oriented counterpart of `README.md`.

- `README.md` = same rules, optimized for human readers
- `doc/AGENT_SKILL.md` = same rules, optimized for AI execution
- if one file changes, update the other to keep the rules consistent

Primary rule: **reuse the current `src/*.js` structure; do not invent a new architecture first.**

---

## Repo map

### Foundation
- `src/common.js`: constants, base URLs, shared helpers
- `src/ptx.js`: auth headers, query helpers, request helpers

### Transport wrappers
- `src/bus.js`
- `src/metro.js`
- `src/trtc.js`, `src/tmrt.js`, `src/krtc.js`, `src/tymetro.js`, `src/klrt.js`
- `src/thsr.js`
- `src/tra.js`
- `src/afr.js`

### Support layers
- `src/id.js`: station / line / version ID conversion
- `src/router.js`, `src/router.v2.js`, `src/router.bus.js`: routing / transfer logic
- `src/data.js`, `src/datax.js`: static or enriched data

### Export and packaging
- `src/main.js`: public export aggregator
- `rollup.config.js`: bundle formats and output rules
- `package.json`: build scripts

---

## Decision order for any new API

1. **Choose family**
   - Bus → `src/bus.js`
   - Metro shared → `src/metro.js`
   - Metro operator-specific → operator wrapper such as `src/trtc.js`
   - THSR → `src/thsr.js`
   - TRA → `src/tra.js`
   - AFR → `src/afr.js`
2. **Choose version**
   - keep v2 / v3 namespace boundaries intact
3. **Choose layer**
   - raw endpoint → update `urls` / `v2urls` / `v3urls` first
   - high-level helper → add `getXxx(...)`, `ByRouteName`, `ByNumber` only if there is real usability gain
4. **Choose scope**
   - shared metro logic belongs in `src/metro.js`
   - operator-only logic belongs in operator wrappers
5. **Choose support layer only if needed**
   - ID conversion → `src/id.js`
   - reshaped or merged data → `catchData`
   - path search / transfer inference → `router*`

---

## Required implementation order

1. Find the matching source under `doc/tdx_docs/*.json`
2. Reuse the closest existing pattern in the same file
3. Add endpoint mapping to `urls` / `v2urls` / `v3urls`
4. Ensure the low-level `_Xxx` wrapper exists
5. Add a high-level helper only if needed
6. Add `catchData` only if data must be reshaped or merged
7. Add `src/id.js` support only if public usage crosses ID systems
8. Add `router*` logic only if the task is routing / transfer inference
9. Export through `src/main.js` if the capability should be public
10. Sync documentation and run minimal validation

Do **not** jump directly to a high-level helper before the endpoint mapping is in place.

---

## Module shape to preserve

Most transport modules follow this structure:

1. import `common`, `ptx`, and optional support modules
2. define base URL and `urls`
3. define optional shared variables / helper functions
4. define `setDefaultCfg` / `processCfg`
5. define common filter helpers when needed
6. create the public namespace object
7. auto-generate `_Xxx` wrappers from the URL map when that file already does so
8. add higher-level `getXxx(...)` helpers only where justified
9. add aliases, `catchData`, or version bridges only when needed

### Naming rules
- no path params: `Station`, `Operator`, `News`
- with path params: `ODFareFromTo`, `GeneralTrainTimetable_TrainNo`
- Bus v3 route-name variant: `RealTimeNearStop_RouteName`

### Config rules
- prefer the config contract already used by the file
- common keys: `selectField`, `filterBy`, `orderBy`, `orderDir`, `top`, `format`, `paramDirectlyUse`
- older callback modules may use `cbFn`
- Bus v2 also uses `manageBy = 'City' | 'InterCity'`
- do **not** copy another module's config style into the current file unless the file already uses it

---

## When to add higher-level helpers

Add a convenience method only when at least one of these is true:

- a filter pattern repeats often, such as `StationID`, `LineID`, `RouteID`, `TrainNo`
- path parameters should be wrapped into a clearer API, such as `getFromToFare(from, to)`
- a date default should be injected, such as today's timetable
- users would otherwise need to manually convert IDs
- a semantic alias improves stability or discoverability

Do **not** add a helper that only forwards to one `_Xxx` call without improving readability or safety.

---

## Search / retrieval layering

- query-layer search: prefer `ptx.filterParam(...)`, `ptx.filterFn(...)`, `ptx.orderByFn(...)`, `ptx.selectFieldFn(...)`, `ptx.spatialFilterFn(...)`
- module-level convenience search: use helpers like `ByNumber`, `ByRouteName`, `getStation(...)`, `getStationOfLine(...)` when the same pattern repeats inside one module
- `id.js`: extend when a public API crosses two or more ID systems
- `catchData`: use for simplified timetables, merged line/station bundles, or enriched fields from `datax`
- `router*`: use only for direct-route search, graph / block / transfer inference, or cross-line routing logic

Do **not** place normal query helpers into `router*`.

---

## Family-specific rules

### Bus
- `src/bus.js` contains both legacy `bus` v2 and Promise-based `bus.v3`
- Bus v2 should keep the callback / `ptx.getURL` style already used in that file
- Bus v3 should keep the URL-map + auto-generated Promise wrapper style
- for Bus v3, extend `v3urls`, `drtsV3urls`, or `shuttleHospitalV3urls` first
- common high-level helpers are `ByRouteName`, `ByNumber`, and City / InterCity selection
- if Swagger only exposes a City path, do not invent an InterCity variant

### Metro
- shared operator behavior belongs in `src/metro.js`
- operator-only data shaping belongs in wrappers such as `src/trtc.js`
- preserve the `new metro.baseMethod(companyTag)` pattern
- search / retrieval enhancements usually belong in operator wrappers or `catchData`

### THSR / TRA / AFR
- all three usually follow the same pattern: endpoint mapping first, helper second
- `catchData` is for reshaping, not for raw endpoint wrapping
- if station or line IDs cross versions or systems, inspect `src/id.js`
- for TRA, remember that `tra` and `tra.v3` coexist and may bridge each other

---

## Public export and packaging rules

### Public export
- if users should access the capability, wire it into `src/main.js`
- import the module, add it to the combined public object, and expose it through the final `ptx` export
- if only the module file changes and `src/main.js` is not updated, the feature is still private

### Packaging
- entrypoint is controlled by `package.json` and currently resolves to `src/main.js`
- output formats are managed by `rollup.config.js`
- existing bundle targets include `umd`, `es`, `iife`, `amd`, and `cjs`
- do **not** edit `dist` as the primary implementation path

---

## Node.js automation crawler

This repo also contains a standalone Node.js automation layer under `nodejs/`.

Use it when the task is to run `rocptx` from Node in a scriptable / CLI form, instead of extending the public SDK source under `src/`.

### Purpose and boundaries
- keep Node automation code in `nodejs/`
- keep SDK implementation in `src/`
- keep compiled library output in `dist/rocptx.js`
- do **not** bundle `nodejs/` automation code into `dist`
- do **not** move Node runtime shims back into `src/` unless the task is explicitly to make the SDK itself natively Node-first

### Current Node automation files
- `nodejs/runtime.js`: installs a Node-side `XMLHttpRequest` shim backed by `fetch`, loads `dist/rocptx.js`, and initializes token auth
- `nodejs/auto-crawler.js`: crawler classes and CLI entrypoint
- `nodejs/auto-crawler.test.js`: live integration-style smoke tests through the crawler layer

### Required loading flow
When working on the Node automation layer, preserve this order:

1. build or load compiled `dist/rocptx.js`
2. install Node runtime compatibility such as `XMLHttpRequest`
3. initialize token auth
4. create crawler wrappers
5. call crawler methods, not raw SDK calls from the CLI surface

### Build and run commands
- build Node-loadable compiled SDK: `npm run build:node-lib`
- run crawler tests: `npm run test:nodejs`
- run one crawler action manually: `node nodejs/auto-crawler.js <crawler> <action> [args...]`

### Credentials
- prefer `ROCPTX_APP_ID` and `ROCPTX_APP_KEY` from environment when running Node automation
- if touching auth flow, verify it still works through `nodejs/runtime.js`
- if changing credential resolution behavior, be conservative and keep compatibility with the existing automation entrypoint

### Implementation rules for agents
- if the user asks for Node automation behavior, prefer editing `nodejs/*.js` before changing `src/*.js`
- if the user asks for new crawler capabilities, add or extend crawler wrapper methods instead of exposing raw SDK internals directly in tests or CLI code
- preserve the pattern `createCrawler()` / `createAllCrawlers()` for mounting automation classes
- keep the CLI thin: parse args, resolve crawler, call method, print JSON
- if `dist/rocptx.js` is missing, build it through the package script instead of hand-writing or copying bundle output

---

## Node.js automated tests

The Node automation layer is validated through `nodejs/auto-crawler.test.js`.

### Test goals
- mount the automation crawler layer first
- call crawler methods from tests
- let crawler methods call `rocptx` internally
- confirm each crawler class can successfully return data from at least two API operations

### Test style to preserve
- use Node built-in `node:test`
- keep tests small and live-data oriented
- prefer one smoke path per crawler class first, then expand only if the user asks
- use real returned IDs from the first API call as input to the second API call whenever possible

### Current smoke coverage pattern
- metro family / TRA / TRA v3: first fetch line list, then fetch stations by the returned `LineID`
- THSR v2: first fetch station list, then fetch station detail by returned `StationID`

### Rate-limit handling
- TDX live endpoints may return `429 Too Many Requests`
- preserve retry / backoff behavior in `nodejs/runtime.js` when touching request flow
- keep crawler smoke tests serialized when needed to reduce burst traffic and flaky failures
- if a live test fails, distinguish between data-shape issues and rate-limit issues before editing the crawler surface

### Validation commands
- preferred full validation: `npm run test:nodejs`
- preferred manual smoke run: `node nodejs/auto-crawler.js trtc listLines`

### Rules for agents
- do **not** rewrite the tests to call SDK namespaces directly; they should validate the automation layer
- do **not** expand the test matrix far beyond the user request unless explicitly asked
- if adding a new crawler class, add at least one two-step smoke test that proves the wrapper can return data
- when a test depends on live APIs, prefer sequential execution and targeted reruns

---

## Documentation sync requirements

When public API surface changes, review these files:

1. `README.md`
2. `doc/API_MAPPING.md`
3. `doc/README.md`
4. `doc/tdx_docs/upgrade_plan.md`
5. `doc/AGENT_SKILL.md`

Rules:
- `README.md` is the human-oriented explanation
- `doc/AGENT_SKILL.md` is the agent-oriented execution guide
- they must carry the same development rules, even if the format is different

---

## Final checklist for AI agents

- [ ] I identified the correct family: Bus / Metro / THSR / TRA / AFR / router / id
- [ ] I identified the correct version boundary: v2 / v3
- [ ] I reused the closest existing pattern in the same file
- [ ] I added endpoint mapping before adding high-level helpers
- [ ] I did not move ordinary query helpers into `router*`
- [ ] I did not put operator-specific logic into a shared layer
- [ ] I checked `src/id.js` if ID systems differ
- [ ] I checked `catchData` only for reshaping needs
- [ ] I checked `src/main.js` for public export needs
- [ ] I checked doc sync requirements
- [ ] I ran minimal validation

---

## Six rules to remember

1. Classify first, then code.
2. Add `urls` first, `_Xxx` second, `getXxx` last.
3. Preserve the style of the current file; do not force one style across the whole repo.
4. Use `catchData` for reshaping, `id.js` for ID conversion, and `router*` only for routing logic.
5. If it should be public, wire it into `src/main.js`.
6. After implementation, check docs and packaging together.
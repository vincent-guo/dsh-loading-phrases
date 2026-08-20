// dsh-loading-phrases host half.
//
// v1 is a pure client feature (phrases and tips are bundled in the client
// module; tuning constants live at the top of lib/client.js). The host half
// contributes nothing yet.
//
// Roadmap:
//   v2 — read `dsh-loading-phrases.json` from the session workspace and
//        expose it to the client (mode, intervals, shuffle, per-language
//        phrase/tips overrides).
//   v3 — settings panel entry for phrase management.
export function apply() {}

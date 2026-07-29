#  Bug History

This folder contains bugs, debugging processes, and solutions found during development.

The goal is to document problems so they can be solved faster in the future.

---

## Bug List

| Date | Bug | Solution |
|---|---|---|
| 24-07-2026 | Electron preload script not loading | Changed preload module syntax from ES Module (`import`) to CommonJS (`require`) |
| 28-07-2026 | UI not showing timestamp data | Fixed timestamp property mismatch in class constructor (`timestap` → `timestaps`) |
| 29-07-2026 | UI not updating after deleting logs | The database was updated correctly, but the UI only created rows and did not remove old elements. Added UI clearing before rendering new log data. |
| | | |

---

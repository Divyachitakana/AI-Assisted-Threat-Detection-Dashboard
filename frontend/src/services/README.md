# services/

One file per backend domain, mapping to the four modules in the project
statement. These are intentionally left as stubs in this scaffolding phase —
implement the request/response bodies once the FastAPI/Flask routes exist.

- `alerts.service.ts`      -> Module 2 (AI-Based Threat Detection & Anomaly Analysis)
- `incidents.service.ts`   -> Module 3 (Risk Prioritization & Security Intelligence)
- `analytics.service.ts`   -> Module 4 (dashboard aggregates: trends, distributions)
- `threatIntel.service.ts` -> Module 1 (Security Data Aggregation & Threat Intel)
- `chat.service.ts`        -> LLM Assistant Agent (Gemini + RAG over MITRE ATT&CK
                               and internal playbooks)

Every service function should return typed data from `src/types/index.ts`
and go through `apiClient.ts`. Keep React Query hooks in `src/hooks/`, not here —
this layer is pure data-fetching, no component concerns.

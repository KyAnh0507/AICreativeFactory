# AI Creative Factory

A frontend-only prototype for an AI creative workflow focused on game-to-creative pipeline UX.

## Features

- Responsive dark SaaS shell with persistent sidebar and top bar
- Multi-step workflow mockup for gameplay input, strategy, matching, generation, timeline, QA, and output
- Deterministic mock data and simulated async service layer
- Interactive filter/search and concept selection
- Mock QA, variation, and export states
- Accessible focus states, button states, and toast notifications

## Install

```bash
npm install
```

## Run

```bash
npm run dev -- --host 0.0.0.0
```

## Build

```bash
npm run build
```

## Project structure

```text
src/
  App.tsx
  data/mockData.ts
  services/mockCreativeService.ts
  styles/index.css
  types/creative.ts
```

## Mock service architecture

The app uses a mock service layer that simulates async backend calls without hitting any production APIs. These can be replaced later with FastAPI endpoints or real inference pipelines while keeping the UI contract stable.

## Future FastAPI integration points

- `analyzeGame` -> `/api/game/analyze`
- `generateConcepts` -> `/api/strategy/concepts`
- `analyzeGameplay` -> `/api/gameplay/analyze`
- `matchFootage` -> `/api/footage/match`
- `generateCreativeComponents` -> `/api/creative/components`
- `generateVariants` -> `/api/creative/variants`
- `runCreativeQA` -> `/api/qa/run`
- `exportCreativePack` -> `/api/export/pack`

## Frontend-only limitations

- No real upload, FastAPI, model calls, or cloud storage
- No actual video rendering or ZIP export
- No authentication, database, analytics, or ad platform integration
- Mock timing and deterministic data only

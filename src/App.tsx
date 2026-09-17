import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Film,
  FolderOpen,
  Gauge,
  LayoutGrid,
  ListVideo,
  PlayCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  TriangleAlert,
  Video,
  Wand2,
  XCircle
} from 'lucide-react';
import { defaultConcepts, defaultGameDNA, defaultMoments, defaultProject, defaultQAResults, defaultTimeline, defaultVariants } from './data/mockData';
import type { CreativeConcept, GameProject, GameplayMoment, NotificationItem, QAStatus, StageStatus } from './types/creative';

const navItems = [
  'Overview',
  'Game Input',
  'Creative Strategy',
  'Gameplay Library',
  'Footage Matching',
  'Generate Creatives',
  'Timeline Preview',
  'QA Center',
  'Creative Output'
];

const overviewCards = [
  { label: 'Gameplay Recording', value: '1', tone: 'bg-violet-500/10 text-violet-200 border-violet-500/30' },
  { label: 'Creative Concepts', value: '5', tone: 'bg-sky-500/10 text-sky-200 border-sky-500/30' },
  { label: 'Gameplay Moments', value: '14', tone: 'bg-emerald-500/10 text-emerald-200 border-emerald-500/30' },
  { label: 'Generated Variants', value: '10', tone: 'bg-amber-500/10 text-amber-200 border-amber-500/30' },
  { label: 'Passed QA', value: '7', tone: 'bg-green-500/10 text-green-200 border-green-500/30' },
  { label: 'Rejected', value: '3', tone: 'bg-rose-500/10 text-rose-200 border-rose-500/30' }
];

const filterKeys = ['All', 'Ready to Test', 'Needs Repair', 'Rejected'];

function App() {
  const [project] = useState<GameProject>(defaultProject);
  const [selectedStage, setSelectedStage] = useState('Overview');
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>(['last-slot-panic', 'satisfying-sort']);
  const [concepts] = useState<CreativeConcept[]>(defaultConcepts);
  const [moments] = useState<GameplayMoment[]>(defaultMoments);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'n1', title: 'Demo ready', message: 'Bus Sort Puzzle pipeline loaded.', type: 'success' }
  ]);
  const [filter, setFilter] = useState('All');

  const currentStatus: StageStatus = 'Completed';

  const statusSummary = useMemo(() => [
    { label: 'Game Input', status: 'Completed' },
    { label: 'Strategy', status: 'Completed' },
    { label: 'Footage', status: 'In progress' },
    { label: 'Generation', status: 'Completed' },
    { label: 'QA', status: 'Needs attention' },
    { label: 'Export', status: 'Not started' }
  ], []);

  const toggleConcept = (id: string) => {
    setSelectedConcepts((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const addNotification = (type: NotificationItem['type'], title: string, message: string) => {
    const item: NotificationItem = { id: crypto.randomUUID(), title, message, type };
    setNotifications((prev) => [item, ...prev].slice(0, 4));
  };

  const AppShell = () => (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-800 bg-slate-950/90 p-5 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-lg font-bold text-slate-950">A</div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Workspace</p>
              <h1 className="text-xl font-semibold">AI Creative Factory</h1>
            </div>
          </div>

          <div className="mb-6 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-violet-200/90">Current demo</p>
                <p className="mt-1 text-sm font-semibold text-white">Bus Sort Puzzle</p>
              </div>
              <span className="pill border-violet-500/40 bg-violet-500/10 text-violet-200">Demo</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = item === selectedStage;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedStage(item)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${active ? 'bg-slate-800 text-white ring-1 ring-violet-500/40' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}
                >
                  <span>{item}</span>
                  {active && <ArrowRight size={16} className="text-violet-300" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3">
            <button type="button" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 hover:border-slate-500" onClick={() => addNotification('info', 'Reset demo', 'Demo state is ready to be reset.')}>Reset Demo</button>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-400">
              <p className="font-medium uppercase tracking-[0.14em] text-slate-500">Pipeline</p>
              <div className="mt-3 space-y-2">
                {statusSummary.map(({ label, status }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span>{label}</span>
                    <span className={`text-[10px] uppercase tracking-[0.12em] ${status === 'Completed' ? 'text-emerald-300' : status === 'In progress' ? 'text-amber-300' : status === 'Needs attention' ? 'text-rose-300' : 'text-slate-500'}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-lg border border-slate-700 p-2 text-slate-200 lg:hidden" aria-label="Open menu">☰</button>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Project</p>
                <h2 className="text-base font-semibold text-white">{project.name}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="pill border-emerald-500/30 bg-emerald-500/10 text-emerald-200">Demo mode</span>
              <button type="button" className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-100 hover:border-slate-500" onClick={() => addNotification('success', 'Demo reset', 'The mock project was reset to the default Bus Sort Puzzle demo.')}>Reset Demo</button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200">Workflow</p>
                <h3 className="mt-1 text-2xl font-semibold text-white md:text-3xl">From one gameplay recording to test-ready creatives</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">Game Input</span>
                <ArrowRight size={14} className="text-slate-500" />
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">Strategy</span>
                <ArrowRight size={14} className="text-slate-500" />
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">Footage</span>
                <ArrowRight size={14} className="text-slate-500" />
                <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5">QA</span>
              </div>
            </div>

            {selectedStage === 'Overview' && (
              <>
                <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {overviewCards.map((card) => (
                    <div key={card.label} className={`rounded-2xl border p-4 ${card.tone}`}>
                      <p className="text-xs uppercase tracking-[0.18em]">{card.label}</p>
                      <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
                  <section className="card-surface p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Project</p>
                        <h4 className="mt-1 text-xl font-semibold text-white">Bus Sort Puzzle</h4>
                      </div>
                      <span className="pill border-emerald-500/40 bg-emerald-500/10 text-emerald-200">Ready</span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Market</p>
                        <p className="mt-2 text-base font-medium text-white">United States</p>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Audience</p>
                        <p className="mt-2 text-base font-medium text-white">Female, 18–35</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">USP</p>
                      <p className="mt-2 text-sm text-slate-200">Satisfying sorting puzzle with high-tension final-slot moments</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button type="button" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500" onClick={() => setSelectedStage('Creative Strategy')}>Continue Workflow</button>
                      <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 hover:border-slate-500">Start New Project</button>
                    </div>
                  </section>

                  <aside className="card-surface p-5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">Pipeline status</h4>
                      <Gauge size={18} className="text-violet-300" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {statusSummary.map(({ label, status }) => (
                        <div key={label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
                          <span className="text-sm text-slate-300">{label}</span>
                          <span className={`text-[10px] font-medium uppercase tracking-[0.14em] ${status === 'Completed' ? 'text-emerald-300' : status === 'In progress' ? 'text-amber-300' : status === 'Needs attention' ? 'text-rose-300' : 'text-slate-500'}`}>{status}</span>
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>

                <section className="mt-8 card-surface p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-white">Recent creatives</h4>
                    <button type="button" className="text-sm text-violet-300 hover:text-violet-200">View all</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {defaultVariants.map((variant) => (
                      <div key={variant.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.16em] text-slate-400">{variant.id}</span>
                          <span className={`pill ${variant.status === 'READY TO TEST' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : variant.status === 'NEEDS REPAIR' ? 'border-amber-500/30 bg-amber-500/10 text-amber-200' : 'border-rose-500/30 bg-rose-500/10 text-rose-200'}`}>{variant.status}</span>
                        </div>
                        <div className="mb-3 h-28 rounded-xl bg-gradient-to-br from-violet-500/20 via-slate-800 to-slate-900" />
                        <p className="text-sm font-medium text-white">{variant.concept}</p>
                        <p className="mt-1 text-sm text-slate-300">{variant.hook}</p>
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                          <span>QA score {variant.qaScore}</span>
                          <span>{variant.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {selectedStage === 'Game Input' && (
              <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <section className="card-surface p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-white">Game input</h4>
                    <span className="pill border-sky-500/30 bg-sky-500/10 text-sky-200">Draft</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block text-sm text-slate-300"><span>Game name</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue={project.name} /></label>
                    <label className="block text-sm text-slate-300"><span>Target market</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue={project.market} /></label>
                    <label className="block text-sm text-slate-300 md:col-span-2"><span>Game description</span><textarea className="mt-2 min-h-[110px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue={project.description} /></label>
                    <label className="block text-sm text-slate-300"><span>Target audience</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue={project.audience} /></label>
                    <label className="block text-sm text-slate-300"><span>USP</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue={project.usp} /></label>
                  </div>

                  <div className="mt-6 rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">Gameplay MP4</p>
                        <p className="text-xs text-slate-400">gameplay_01.mp4 • 60 sec • 38.4 MB</p>
                      </div>
                      <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">Browse</button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button type="button" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white" onClick={() => addNotification('success', 'Game analyzed', 'The game input was validated and a strategy pipeline was created.')}>Analyze Game</button>
                      <button type="button" className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm text-slate-200" onClick={() => setSelectedStage('Creative Strategy')}>Use default mock footage</button>
                    </div>
                  </div>
                </section>

                <aside className="card-surface p-5">
                  <h4 className="text-lg font-semibold text-white">Validation</h4>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: 'MP4 format', value: 'Valid', status: 'pass' },
                      { label: 'Duration', value: '60s', status: 'pass' },
                      { label: 'Size', value: '38.4MB', status: 'warning' },
                      { label: 'Filename', value: 'gameplay_01.mp4', status: 'pass' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
                        <span className="text-sm text-slate-300">{item.label}</span>
                        <span className={`inline-flex items-center gap-2 text-xs ${item.status === 'pass' ? 'text-emerald-300' : 'text-amber-300'}`}>
                          {item.status === 'pass' ? <CheckCircle2 size={14} /> : <TriangleAlert size={14} />}
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            )}

            {selectedStage === 'Creative Strategy' && (
              <div className="space-y-6">
                <section className="card-surface p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-white">Game DNA</h4>
                    <button type="button" className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-200" onClick={() => addNotification('info', 'Updated DNA', 'The creative angle summary was refreshed.')}>Refresh</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Genre</p><p className="mt-2 text-base font-medium text-white">{defaultGameDNA.genre}</p></div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Core mechanic</p><p className="mt-2 text-base font-medium text-white">{defaultGameDNA.coreMechanic}</p></div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Emotional drivers</p><p className="mt-2 text-base font-medium text-white">{defaultGameDNA.emotionalDrivers.join(', ')}</p></div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.16em] text-slate-400">Visual drivers</p><p className="mt-2 text-base font-medium text-white">{defaultGameDNA.visualDrivers.join(', ')}</p></div>
                  </div>
                </section>

                <section className="card-surface p-5">
                  <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h4 className="text-xl font-semibold text-white">Creative concepts</h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"><Search size={14} className="mb-0.5 inline" /> Search</button>
                      <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200">Sort: confidence</button>
                    </div>
                  </div>
                  <div className="grid gap-4 xl:grid-cols-2">
                    {concepts.map((concept) => (
                      <div key={concept.id} className={`rounded-2xl border p-4 ${selectedConcepts.includes(concept.id) ? 'border-violet-500/40 bg-violet-500/5' : 'border-slate-800 bg-slate-950/60'}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{concept.emotion}</p>
                            <h5 className="mt-1 text-lg font-semibold text-white">{concept.name}</h5>
                          </div>
                          <button type="button" className={`rounded-full border px-3 py-1 text-xs ${selectedConcepts.includes(concept.id) ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : 'border-slate-700 bg-slate-900 text-slate-200'}`} onClick={() => toggleConcept(concept.id)}>{selectedConcepts.includes(concept.id) ? 'Selected' : 'Select'}</button>
                        </div>
                        <p className="mt-3 text-sm text-slate-200">{concept.hook}</p>
                        <div className="mt-4 grid gap-2 text-sm text-slate-300">
                          <div><span className="text-slate-500">Angle:</span> {concept.angle}</div>
                          <div><span className="text-slate-500">Required scene:</span> {concept.requiredScene}</div>
                          <div><span className="text-slate-500">Confidence:</span> {concept.confidence}%</div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <button type="button" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100" onClick={() => addNotification('warning', 'Hook updated', 'Local hook edit saved for this concept.')}>Edit hook</button>
                          <button type="button" className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100" onClick={() => addNotification('success', 'Hook regenerated', 'A fresh hook was generated from the selected idea.')}>Regenerate hook</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex justify-end">
                  <button type="button" className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-700" disabled={selectedConcepts.length === 0} onClick={() => { setSelectedStage('Gameplay Library'); addNotification('success', 'Matching started', 'Matching footage to your concept selection.'); }}>Find Matching Footage</button>
                </div>
              </div>
            )}

            {selectedStage === 'Gameplay Library' && (
              <section className="card-surface p-5">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Recording summary</p>
                    <h4 className="mt-1 text-xl font-semibold text-white">Gameplay library</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Sort: confidence</button>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Tag filter</button>
                  </div>
                </div>
                <div className="mb-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Duration</p><p className="mt-2 text-base font-medium text-white">00:60</p></div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Moments detected</p><p className="mt-2 text-base font-medium text-white">14</p></div>
                  <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-400">Search</p><p className="mt-2 text-base font-medium text-white">parking, rescue...</p></div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {moments.map((moment) => (
                    <article key={moment.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                      <div className="mb-3 h-24 rounded-xl bg-gradient-to-br from-violet-500/20 via-slate-800 to-slate-900" />
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{moment.start}–{moment.end}</p>
                          <h5 className="mt-1 text-base font-semibold text-white">{moment.title}</h5>
                        </div>
                        <button type="button" className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100">Preview</button>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{moment.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                        <span>{moment.tag}</span>
                        <span>{moment.confidence}%</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button type="button" className="flex-1 rounded-xl bg-violet-600 px-3 py-2 text-xs font-medium text-white" onClick={() => setSelectedStage('Footage Matching')}>Select</button>
                        <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100">Details</button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {selectedStage === 'Footage Matching' && (
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="card-surface p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Selected concept</p>
                      <h4 className="mt-1 text-xl font-semibold text-white">Last Slot Panic</h4>
                    </div>
                    <span className="pill border-violet-500/30 bg-violet-500/10 text-violet-200">97% match</span>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-300">Hook: <span className="font-medium text-white">Can you save the last bus?</span></p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3"><span className="text-xs uppercase tracking-[0.16em] text-slate-400">Angle</span><p className="mt-2 text-sm text-white">Last-slot panic</p></div>
                      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-3"><span className="text-xs uppercase tracking-[0.16em] text-slate-400">Emotional goal</span><p className="mt-2 text-sm text-white">High tension</p></div>
                    </div>
                  </div>
                  <div className="mt-5 rounded-2xl border border-violet-500/30 bg-violet-500/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-violet-200">Recommended clip</p>
                        <h5 className="mt-1 text-lg font-semibold text-white">00:29–00:36 • Last parking slot</h5>
                      </div>
                      <button type="button" className="rounded-xl border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-sm text-violet-100">Preview</button>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-300">
                      <li>• Only one parking slot remains</li>
                      <li>• Bus is waiting</li>
                      <li>• Visual tension is high</li>
                    </ul>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <button type="button" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white" onClick={() => setSelectedStage('Generate Creatives')}>Generate Creative</button>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100">Alternative footage</button>
                  </div>
                </section>

                <aside className="card-surface p-5">
                  <h4 className="text-lg font-semibold text-white">Missing footage state</h4>
                  <div className="mt-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                    <p className="font-semibold text-white">No suitable footage found for this concept.</p>
                    <div className="mt-3 space-y-2 text-amber-100/90">
                      <p>Level 23</p>
                      <p>1 parking slot remaining</p>
                      <p>3 buses waiting</p>
                      <p>Record 8–12 seconds</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-slate-100">Save brief</button>
                    <button type="button" className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-slate-100">Copy brief</button>
                    <button type="button" className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-slate-100">Change concept</button>
                  </div>
                </aside>
              </div>
            )}

            {selectedStage === 'Generate Creatives' && (
              <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                <section className="card-surface p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-white">Creative generation</h4>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Generate voice-over</button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block text-sm text-slate-300"><span>Primary hook</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue="Can you save the last bus?" /></label>
                    <label className="block text-sm text-slate-300"><span>Voice style</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue="Energetic female" /></label>
                    <label className="block text-sm text-slate-300 md:col-span-2"><span>Supporting copy</span><textarea className="mt-2 min-h-[110px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue="One wrong move and the level is over." /></label>
                    <label className="block text-sm text-slate-300"><span>CTA</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue="Play Now" /></label>
                    <label className="block text-sm text-slate-300"><span>Subtitle</span><input className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white" defaultValue="Can you save the last bus?" /></label>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Regenerate hook</button>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Regenerate copy</button>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Generate subtitles</button>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Reset content</button>
                    <button type="button" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white" onClick={() => setSelectedStage('Timeline Preview')}>Create Video Variants</button>
                  </div>
                </section>

                <aside className="card-surface p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Preview</p>
                  <div className="mx-auto mt-4 flex h-[420px] w-[230px] flex-col justify-between rounded-[30px] border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-4 shadow-soft">
                    <div className="h-32 rounded-2xl bg-gradient-to-br from-violet-500/20 via-slate-700 to-slate-800" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-violet-200">Can you save the last bus?</p>
                      <p className="mt-2 text-sm text-slate-200">One wrong move and the level is over.</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Play Now</span>
                      <span>● audio</span>
                    </div>
                  </div>
                </aside>
              </div>
            )}

            {selectedStage === 'Timeline Preview' && (
              <section className="card-surface p-5">
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="text-xl font-semibold text-white">Timeline preview</h4>
                  <div className="flex gap-2">
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Play</button>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Pause</button>
                    <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Reset</button>
                  </div>
                </div>
                <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <div className="h-12 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
                      {defaultTimeline.map((segment) => (
                        <div key={segment.id} className="float-left h-full border-r border-slate-700 bg-gradient-to-r from-violet-500/50 via-sky-500/30 to-emerald-400/30" style={{ width: `${segment.widthPercent}%` }} title={`${segment.label} ${segment.start}s-${segment.end}s`} />
                      ))}
                    </div>
                    <div className="mt-4 space-y-3">
                      {defaultTimeline.map((segment) => (
                        <div key={segment.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2">
                          <div>
                            <p className="text-sm font-medium text-white">{segment.label}</p>
                            <p className="text-xs text-slate-400">{segment.start}s–{segment.end}s</p>
                          </div>
                          <p className="text-xs text-slate-300">{segment.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">9:16 preview</p>
                    <div className="mx-auto mt-4 flex h-[420px] w-[220px] items-end rounded-[28px] border border-slate-700 bg-gradient-to-br from-violet-500/20 via-slate-800 to-slate-900 p-4">
                      <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/70 p-3 text-center">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-violet-200">Hook</p>
                        <p className="mt-2 text-sm font-medium text-white">Can you save the last bus?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {selectedStage === 'QA Center' && (
              <div className="space-y-6">
                <section className="card-surface p-5">
                  <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <h4 className="text-xl font-semibold text-white">QA Center</h4>
                    <div className="flex flex-wrap gap-2">
                      {['All', 'Ready to Test', 'Needs Repair', 'Rejected'].map((item) => (
                        <button key={item} type="button" className={`rounded-xl border px-3 py-2 text-sm ${filter === item ? 'border-violet-500/40 bg-violet-500/10 text-violet-200' : 'border-slate-700 bg-slate-900 text-slate-100'}`} onClick={() => setFilter(item)}>{item}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {[
                      ['1080×1920', 'pass'],
                      ['9:16', 'pass'],
                      ['MP4', 'pass'],
                      ['Target duration', 'warning'],
                      ['Naming convention', 'pass'],
                      ['Audio present', 'pass']
                    ].map(([label, state]) => (
                      <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-white">{label}</p>
                          <span className={`inline-flex items-center gap-1 text-xs ${state === 'pass' ? 'text-emerald-300' : 'text-amber-300'}`}>
                            {state === 'pass' ? <CheckCircle2 size={14} /> : <TriangleAlert size={14} />}
                            {state === 'pass' ? 'Pass' : 'Warning'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="card-surface p-5">
                  <div className="grid gap-5 xl:grid-cols-2">
                    {[
                      ['Hook Strength', 87],
                      ['Visual Clarity', 91],
                      ['Gameplay Relevance', 95],
                      ['Pacing', 82],
                      ['CTA', 78],
                      ['Overall', 88]
                    ].map(([label, score]) => (
                      <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-300">{label}</p>
                          <p className="text-base font-semibold text-white">{score}/100</p>
                        </div>
                        <div className="mt-3 h-2.5 rounded-full bg-slate-800">
                          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {selectedStage === 'Creative Output' && (
              <section className="card-surface p-5">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <h4 className="text-xl font-semibold text-white">Creative output</h4>
                  <div className="flex flex-wrap gap-2">
                    {filterKeys.map((item) => (
                      <button key={item} type="button" className={`rounded-xl border px-3 py-2 text-sm ${filter === item ? 'border-violet-500/40 bg-violet-500/10 text-violet-200' : 'border-slate-700 bg-slate-900 text-slate-100'}`} onClick={() => setFilter(item)}>{item}</button>
                    ))}
                  </div>
                </div>
                <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {[
                    ['Total generated', '12'],
                    ['Passed QA', '7'],
                    ['Needs repair', '3'],
                    ['Rejected', '2'],
                    ['Selected', '4']
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100">Select all passed</button>
                  <button type="button" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white" onClick={() => addNotification('success', 'Creative pack exported', 'The export simulation succeeded and the pack is ready for review.')}>Export Creative Pack</button>
                </div>
              </section>
            )}

            {selectedStage === 'Overview' && (
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100" onClick={() => setSelectedStage('Game Input')}>Open pipeline</button>
                <button type="button" className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white" onClick={() => addNotification('success', 'Pipeline ready', 'The creative workflow has been prepared for review.')}>Start new project</button>
              </div>
            )}
          </main>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-4 right-4 z-50 space-y-3">
        {notifications.map((note) => (
          <div key={note.id} className="pointer-events-auto flex w-80 items-start gap-3 rounded-2xl border border-slate-700 bg-slate-900/95 p-3 shadow-soft">
            <div className={`mt-0.5 rounded-full p-1 ${note.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : note.type === 'warning' ? 'bg-amber-500/20 text-amber-300' : note.type === 'error' ? 'bg-rose-500/20 text-rose-300' : 'bg-violet-500/20 text-violet-300'}`}>
              {note.type === 'success' ? <CheckCircle2 size={16} /> : note.type === 'warning' ? <TriangleAlert size={16} /> : note.type === 'error' ? <XCircle size={16} /> : <Sparkles size={16} />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{note.title}</p>
              <p className="mt-1 text-xs text-slate-300">{note.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return <AppShell />;
}

export default App;

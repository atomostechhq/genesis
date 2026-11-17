"use client";

import Dropdown, { Option } from "@/app/components/Dropdown";
import React, {
  Profiler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const PRIORITIES = ["High", "Medium", "Low"];

// Unique values, some disabled rows.
// uniform=false: mixed row heights (long wrapping labels + addInfo) -> dynamic measuring
// uniform=true : every row is single-line -> safe for the fixed `rowHeight` mode
const makeOptions = (count: number, uniform = false): Option[] =>
  Array.from({ length: count }, (_, i) =>
    uniform
      ? {
          label: `Option ${i + 1} - ${PRIORITIES[i % 3]}`,
          value: `opt-${i + 1}`,
          disabledOption: i % 7 === 0,
          info: i % 5 === 0 ? `#${i + 1}` : undefined,
        }
      : {
          label:
            i % 11 === 0
              ? `Option ${i + 1} - a much longer label that should wrap onto more than one line in the dropdown`
              : `Option ${i + 1} - ${PRIORITIES[i % 3]}`,
          value: `opt-${i + 1}`,
          disabledOption: i % 7 === 0,
          info: i % 5 === 0 ? `#${i + 1}` : undefined,
          addInfo:
            i % 4 === 0 ? `Extra details for option ${i + 1}` : undefined,
        },
  );

const SIZES = [30, 1000, 10000, 50000];
const NUMERIC: Option[] = [
  { label: 0, value: 0 },
  { label: 1, value: 1 },
  { label: 2, value: 2 },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Probe = { commits: number; scrolls: number };
type Result = {
  name: string;
  status: "pass" | "fail" | "skip";
  detail: string;
};

// ---------------------------------------------------------------------------
// Live stats. Lives in its own component so its updates never re-render the
// Dropdown (which would inflate the commit counter).
// ---------------------------------------------------------------------------
function Stats({
  probe,
  wrapRef,
  total,
}: {
  probe: React.MutableRefObject<Probe>;
  wrapRef: React.RefObject<HTMLDivElement>;
  total: number;
}) {
  const [s, setS] = useState({ commits: 0, scrolls: 0, mounted: 0, setSize: 0 });

  useEffect(() => {
    const id = setInterval(() => {
      const rows = wrapRef.current?.querySelectorAll('[role="option"]');
      const first = rows?.[0] as HTMLElement | undefined;
      setS({
        commits: probe.current.commits,
        scrolls: probe.current.scrolls,
        mounted: rows?.length ?? 0,
        setSize: Number(first?.getAttribute("aria-setsize") ?? 0),
      });
    }, 250);
    return () => clearInterval(id);
  }, [probe, wrapRef]);

  return (
    <div className="rounded border border-gray-300 p-3 text-xs flex flex-col gap-1">
      <p className="font-medium text-sm">Live stats (multi select)</p>
      <p>
        Rows in DOM: <b>{s.mounted}</b> of {s.setSize || total} matching
        (total options: {total.toLocaleString()})
      </p>
      <p>
        Scroll events: <b>{s.scrolls}</b> | Dropdown commits: <b>{s.commits}</b>
        {s.scrolls > 0 && (
          <> | commits per scroll event: {(s.commits / s.scrolls).toFixed(2)}</>
        )}
      </p>
      <p className="text-gray-500">
        Commits come from React&apos;s Profiler, so they only count in dev
        builds. Scroll slowly: commits should be well below scroll events
        (a render only happens when a row boundary is crossed).
      </p>
      <button
        type="button"
        className="self-start px-2 py-1 border border-gray-300 rounded"
        onClick={() => {
          probe.current = { commits: 0, scrolls: 0 };
        }}
      >
        Reset counters
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Automated checks against the multi-select dropdown
// ---------------------------------------------------------------------------
function TestPanel({ wrapRef }: { wrapRef: React.RefObject<HTMLDivElement> }) {
  const [results, setResults] = useState<Result[]>([]);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  // Opens the menu if needed (clicking a test button closes it via click-outside)
  const ensureOpen = async () => {
    const wrap = wrapRef.current;
    if (!wrap) return null;
    const trigger = wrap.querySelector<HTMLButtonElement>(
      'button[aria-haspopup="listbox"]',
    );
    if (trigger?.getAttribute("aria-expanded") !== "true") {
      trigger?.click();
      await sleep(400); // open transition + first render
    }
    return wrap.querySelector<HTMLElement>('[role="listbox"]');
  };

  const run = async (fn: () => Promise<Result>) => {
    if (busy) return;
    setBusy(true);
    try {
      const r = await fn();
      setResults((prev) => [r, ...prev].slice(0, 10));
    } catch (e) {
      setResults((prev) =>
        [{ name: "Error", status: "fail" as const, detail: String(e) }, ...prev].slice(0, 10),
      );
    } finally {
      setBusy(false);
      setNote("");
    }
  };

  const virtualRows = (lb: HTMLElement) =>
    Array.from(
      lb.querySelectorAll<HTMLElement>('[role="option"][data-index]'),
    ).sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));

  // 1) Real row heights: use it to calibrate estimatedRowHeight / rowHeight
  const measureRows = () =>
    run(async () => {
      const lb = await ensureOpen();
      if (!lb) return { name: "Measure rows", status: "skip", detail: "No listbox found." };
      const hs = Array.from(
        lb.querySelectorAll<HTMLElement>('[role="option"]'),
      )
        .map((r) => r.getBoundingClientRect().height)
        .sort((a, b) => a - b);
      if (!hs.length)
        return { name: "Measure rows", status: "skip", detail: "No rows rendered." };
      const med = hs[Math.floor(hs.length / 2)];
      return {
        name: "Measure rows",
        status: "pass",
        detail: `${hs.length} rows: min ${hs[0].toFixed(1)}px, median ${med.toFixed(1)}px, max ${hs[hs.length - 1].toFixed(1)}px. Use ~${Math.round(med)} for estimatedRowHeight / rowHeight.`,
      };
    });

  // 2) Sweep the whole list: adjacent rows must touch, and the viewport must
  //    always be covered by mounted rows (no gaps, overlaps or blank areas)
  const layoutCheck = () =>
    run(async () => {
      const lb = await ensureOpen();
      if (!lb) return { name: "Layout sweep", status: "skip", detail: "No listbox found." };
      if (!virtualRows(lb).length)
        return {
          name: "Layout sweep",
          status: "skip",
          detail: "List is not virtualized. Use 1,000+ options with Virtualize on.",
        };

      const problems: string[] = [];
      let windows = 0;

      const checkWindow = () => {
        const rows = virtualRows(lb);
        windows++;
        for (let i = 0; i < rows.length - 1; i++) {
          const ia = Number(rows[i].dataset.index);
          const ib = Number(rows[i + 1].dataset.index);
          if (ib !== ia + 1) {
            problems.push(`index jump ${ia} -> ${ib} at scrollTop ${Math.round(lb.scrollTop)}`);
            continue;
          }
          const a = rows[i].getBoundingClientRect();
          const b = rows[i + 1].getBoundingClientRect();
          if (Math.abs(a.bottom - b.top) > 1.5) {
            problems.push(`rows ${ia} -> ${ib}: ${(b.top - a.bottom).toFixed(1)}px gap/overlap`);
          }
        }
        if (rows.length) {
          const box = lb.getBoundingClientRect();
          const top = rows[0].getBoundingClientRect().top;
          const bottom = rows[rows.length - 1].getBoundingClientRect().bottom;
          const atStart = lb.scrollTop <= 0.5;
          const atEnd = lb.scrollTop + lb.clientHeight >= lb.scrollHeight - 1;
          if (!atStart && top > box.top + 1)
            problems.push(`blank area at top, scrollTop ${Math.round(lb.scrollTop)}`);
          if (!atEnd && bottom < box.bottom - 1)
            problems.push(`blank area at bottom, scrollTop ${Math.round(lb.scrollTop)}`);
        }
      };

      lb.scrollTop = 0;
      await sleep(150);
      const step = Math.max(lb.clientHeight * 2, lb.scrollHeight / 300);
      for (let pos = 0; pos < lb.scrollHeight; pos += step) {
        setNote(`Layout sweep: ${Math.round((pos / lb.scrollHeight) * 100)}%`);
        lb.scrollTop = pos;
        await sleep(70);
        checkWindow();
      }
      lb.scrollTop = lb.scrollHeight;
      await sleep(120);
      checkWindow();

      return {
        name: "Layout sweep",
        status: problems.length ? "fail" : "pass",
        detail: problems.length
          ? `${problems.length} problem(s) in ${windows} windows. First: ${problems.slice(0, 3).join("; ")}`
          : `${windows} windows checked, no gaps, overlaps or blank areas.`,
      };
    });

  // 3) Scroll anchoring: scroll up in small steps from the middle. Rows above the
  //    viewport get measured as they mount; a visible row must not move by more
  //    than the amount we scrolled. Try estimatedRowHeight = 20 for a hard test.
  const anchorCheck = () =>
    run(async () => {
      const lb = await ensureOpen();
      if (!lb) return { name: "Scroll anchoring", status: "skip", detail: "No listbox found." };
      if (!virtualRows(lb).length)
        return {
          name: "Scroll anchoring",
          status: "skip",
          detail: "List is not virtualized. Use 1,000+ options with Virtualize on.",
        };

      lb.scrollTop = lb.scrollHeight / 2;
      await sleep(200);

      const STEP = 40;
      const STEPS = 80;
      let maxDrift = 0;
      let worst = "";
      let measured = 0;

      for (let i = 0; i < STEPS; i++) {
        setNote(`Scroll anchoring: ${i + 1}/${STEPS}`);
        const boxTop = lb.getBoundingClientRect().top;
        const anchor = virtualRows(lb)
          .filter((r) => r.getBoundingClientRect().top >= boxTop)
          .sort(
            (a, b) =>
              a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          )[0];
        if (!anchor) continue;
        const idx = anchor.dataset.index as string;
        const t0 = anchor.getBoundingClientRect().top;
        const before = lb.scrollTop;
        lb.scrollTop = before - STEP;
        const applied = before - lb.scrollTop; // may be clamped at 0
        await sleep(90);
        const el = lb.querySelector<HTMLElement>(`[role="option"][data-index="${idx}"]`);
        if (!el) continue;
        const drift = el.getBoundingClientRect().top - t0 - applied;
        measured++;
        if (Math.abs(drift) > Math.abs(maxDrift)) {
          maxDrift = drift;
          worst = idx;
        }
      }

      return {
        name: "Scroll anchoring",
        status: Math.abs(maxDrift) <= 2 ? "pass" : "fail",
        detail: `${measured} steps, max drift ${maxDrift.toFixed(1)}px${worst ? ` (row index ${worst})` : ""}. Under 2px = content stayed put.`,
      };
    });

  // Manual helpers
  const jump = (fraction: number) =>
    run(async () => {
      const lb = await ensureOpen();
      if (lb) lb.scrollTop = (lb.scrollHeight - lb.clientHeight) * fraction;
      await sleep(100);
      return {
        name: `Jump to ${Math.round(fraction * 100)}%`,
        status: "pass",
        detail: "Now scroll up/down by hand and watch for jumps or blank areas.",
      };
    });

  const badge = (s: Result["status"]) =>
    s === "pass" ? "text-green-700" : s === "fail" ? "text-red-600" : "text-gray-500";

  return (
    <div className="rounded border border-gray-300 p-3 text-xs flex flex-col gap-2">
      <p className="font-medium text-sm">Automated checks (multi select)</p>
      <div className="flex flex-wrap gap-2">
        {[
          ["Measure row heights", measureRows],
          ["Layout sweep", layoutCheck],
          ["Scroll anchoring", anchorCheck],
          ["Jump 0%", () => jump(0)],
          ["Jump 50%", () => jump(0.5)],
          ["Jump 100%", () => jump(1)],
        ].map(([label, fn]) => (
          <button
            key={label as string}
            type="button"
            disabled={busy}
            onClick={fn as () => void}
            className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            {label as string}
          </button>
        ))}
      </div>
      {busy && <p className="text-gray-500">Running… {note}</p>}
      <ul className="flex flex-col gap-1">
        {results.map((r, i) => (
          <li key={i}>
            <b className={badge(r.status)}>[{r.status.toUpperCase()}]</b>{" "}
            <b>{r.name}</b>: {r.detail}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------

export default function DropdownTest() {
  const [size, setSize] = useState(1000);
  const [virtualize, setVirtualize] = useState(true);
  const [mode, setMode] = useState<"dynamic" | "fixed">("dynamic");
  const [estimate, setEstimate] = useState(34);
  const [rowH, setRowH] = useState(34);

  const options = useMemo(
    () => makeOptions(size, mode === "fixed"),
    [size, mode],
  );
  const smallOptions = useMemo(() => makeOptions(10), []);

  // ---- Multi select: state is already Option[] ----
  const [multiSelected, setMultiSelected] = useState<Option[]>([]);

  // ---- Single select with string | null state (adapter) ----
  const [priority, setPriority] = useState<string | null>(null);

  const singleSelected = useMemo(
    () => options.filter((o) => o.value === priority),
    [options, priority],
  );

  const handleSetSingle: React.Dispatch<React.SetStateAction<Option[]>> = (
    action,
  ) => {
    const next =
      typeof action === "function" ? action(singleSelected) : action;
    setPriority(next[0] ? String(next[0].value) : null);
  };

  // ---- Small / edge-case dropdowns ----
  const [smallSel, setSmallSel] = useState<Option[]>([]);
  const [numSel, setNumSel] = useState<Option[]>([NUMERIC[0]]);

  // ---- Probes for live stats ----
  const probe = useRef<Probe>({ commits: 0, scrolls: 0 });
  const multiWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = multiWrapRef.current;
    if (!el) return;
    // scroll doesn't bubble, so listen in the capture phase
    const onScroll = () => {
      probe.current.scrolls++;
    };
    el.addEventListener("scroll", onScroll, true);
    return () => el.removeEventListener("scroll", onScroll, true);
  }, []);

  const onRender = useCallback(() => {
    probe.current.commits++;
  }, []);

  // Infinity turns virtualization off
  const threshold = virtualize ? 50 : Infinity;
  const rowHeight = mode === "fixed" ? rowH : undefined;

  const resetSelections = () => {
    setMultiSelected([]);
    setPriority(null);
  };

  const pill = (active: boolean) =>
    `px-3 py-1 rounded border ${
      active ? "bg-primary-600 text-white border-primary-600" : "border-gray-300"
    }`;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-xl">
      <section className="flex flex-col gap-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">Options:</span>
          {SIZES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setSize(n);
                resetSelections();
              }}
              className={pill(size === n)}
            >
              {n.toLocaleString()}
            </button>
          ))}
          <label className="flex items-center gap-1 ml-4">
            <input
              type="checkbox"
              checked={virtualize}
              onChange={(e) => setVirtualize(e.target.checked)}
            />
            Virtualize (threshold 50)
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">Row mode:</span>
          <button
            type="button"
            className={pill(mode === "dynamic")}
            onClick={() => {
              setMode("dynamic");
              resetSelections();
            }}
          >
            Dynamic (mixed heights)
          </button>
          <button
            type="button"
            className={pill(mode === "fixed")}
            onClick={() => {
              setMode("fixed");
              resetSelections();
            }}
          >
            Fixed rowHeight (uniform rows)
          </button>
        </div>

        {mode === "dynamic" ? (
          <label className="flex items-center gap-2">
            <span className="font-medium">estimatedRowHeight:</span>
            <select
              value={estimate}
              onChange={(e) => setEstimate(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value={20}>20 (too small, stress test)</option>
              <option value={34}>34 (default)</option>
              <option value={60}>60 (too big, stress test)</option>
            </select>
          </label>
        ) : (
          <label className="flex items-center gap-2">
            <span className="font-medium">rowHeight (px):</span>
            <input
              type="number"
              min={20}
              max={80}
              value={rowH}
              onChange={(e) => setRowH(Number(e.target.value) || 34)}
              className="border border-gray-300 rounded px-2 py-1 w-20"
            />
            <span className="text-gray-500">
              Use &quot;Measure row heights&quot; below to find the real value
            </span>
          </label>
        )}
      </section>

      <div>
        <p className="mb-1 text-sm font-medium">
          Multi select with search ({multiSelected.length} selected)
        </p>
        <div ref={multiWrapRef}>
          <Profiler id="multi-dropdown" onRender={onRender}>
            <Dropdown
              options={options}
              search
              multiple
              dropdownFooter
              selected={multiSelected}
              setSelected={setMultiSelected}
              dropdownText="Pick many"
              virtualizeThreshold={threshold}
              estimatedRowHeight={estimate}
              rowHeight={rowHeight}
            />
          </Profiler>
        </div>
      </div>

      <Stats probe={probe} wrapRef={multiWrapRef} total={size} />
      <TestPanel wrapRef={multiWrapRef} />

      <div>
        <p className="mb-1 text-sm font-medium">
          Single select, string | null state (value: {String(priority)})
        </p>
        <Dropdown
          options={options}
          search
          selected={singleSelected}
          setSelected={handleSetSingle}
          dropdownText="Pick one"
          virtualizeThreshold={threshold}
          estimatedRowHeight={estimate}
          rowHeight={rowHeight}
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">
          Small list, single select, dropdown-level info=&quot;fallback&quot;
          (never virtualized)
        </p>
        <Dropdown
          options={smallOptions}
          selected={smallSel}
          setSelected={setSmallSel}
          info="fallback"
          dropdownText="10 options"
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">
          Numeric label 0 (trigger should read &quot;0&quot;, not &quot;Select&quot;)
        </p>
        <Dropdown
          options={NUMERIC}
          selected={numSel}
          setSelected={setNumSel}
          dropdownText="Select"
        />
      </div>

      <ul className="text-xs text-gray-600 list-disc pl-5 flex flex-col gap-1">
        <li>Scroll fast: no overlapping rows or gaps (mixed row heights).</li>
        <li>Search &quot;Option 99&quot; or &quot;Low&quot;: list jumps to top, results filter.</li>
        <li>Close and reopen the menu: the search box is empty again.</li>
        <li>Press Escape with the menu open: it closes and focus returns to the trigger.</li>
        <li>Select all: only matching, enabled rows get selected.</li>
        <li>Every 7th option is disabled and cannot be picked (click and checkbox).</li>
        <li>Single select rows show their own info; rows without one show &quot;fallback&quot; in the small list.</li>
        <li>Wrapped rows show addInfo in both single and multi select.</li>
        <li>Switch Virtualize off at 10,000: &quot;Rows in DOM&quot; jumps to 10,000 even while closed.</li>
        <li>Fixed mode: with the right rowHeight, the scrollbar thumb never changes size while scrolling.</li>
        <li>Dynamic mode, estimate 20 or 60: run &quot;Scroll anchoring&quot; and scroll up by hand from the middle; nothing should jump.</li>
        <li>Screen reader / devtools: listbox is the scroll area, each row has role=option with setsize and posinset.</li>
      </ul>
    </div>
  );
}
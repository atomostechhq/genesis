"use client";

import Dropdown, { Option } from "@/app/components/Dropdown";
import React, { useMemo, useState } from "react";

const PRIORITIES = ["High", "Medium", "Low"];

// Unique values, mixed row heights, some disabled rows
const makeOptions = (count: number): Option[] =>
  Array.from({ length: count }, (_, i) => ({
    label:
      i % 11 === 0
        ? `Option ${i + 1} - a much longer label that should wrap onto more than one line in the dropdown`
        : `Option ${i + 1} - ${PRIORITIES[i % 3]}`,
    value: `opt-${i + 1}`,
    disabledOption: i % 7 === 0,
    info: i % 5 === 0 ? `#${i + 1}` : undefined,
    addInfo: i % 4 === 0 ? `Extra details for option ${i + 1}` : undefined,
  }));

const SIZES = [30, 1000, 10000];

export default function DropdownTest() {
  const [size, setSize] = useState(1000);
  const [virtualize, setVirtualize] = useState(true);

  const options = useMemo(() => makeOptions(size), [size]);

  // ---- Multi select: state is already Option[] ----
  const [multiSelected, setMultiSelected] = useState<Option[]>([]);

  // ---- Single select with string | null state (adapter) ----
  const [priority, setPriority] = useState<string | null>(null);

  const singleSelected = useMemo(
    () => options.filter((o) => o.value === priority),
    [options, priority]
  );

  const handleSetSingle: React.Dispatch<React.SetStateAction<Option[]>> = (
    action
  ) => {
    const next =
      typeof action === "function" ? action(singleSelected) : action;
    setPriority(next[0] ? String(next[0].value) : null);
  };

  // Infinity turns virtualization off
  const threshold = virtualize ? 50 : Infinity;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-xl">
      <section className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">Options:</span>
        {SIZES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setSize(n);
              setMultiSelected([]);
              setPriority(null);
            }}
            className={`px-3 py-1 rounded border ${
              size === n
                ? "bg-primary-600 text-white border-primary-600"
                : "border-gray-300"
            }`}
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
      </section>

      <div>
        <p className="mb-1 text-sm font-medium">
          Multi select with search ({multiSelected.length} selected)
        </p>
        <Dropdown
          options={options}
          search
          multiple
          dropdownFooter
          selected={multiSelected}
          setSelected={setMultiSelected}
          dropdownText="Pick many"
          virtualizeThreshold={threshold}
        />
      </div>

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
        />
      </div>

      <div>
        <p className="mb-1 text-sm font-medium">Small list (never virtualized)</p>
        <Dropdown
          options={makeOptions(10)}
          selected={[]}
          dropdownText="10 options"
        />
      </div>

      <ul className="text-xs text-gray-600 list-disc pl-5">
        <li>Scroll fast: no overlapping rows or gaps (mixed row heights).</li>
        <li>Search "Option 99" or "Low": list jumps to top, results filter.</li>
        <li>Select all: only matching, enabled rows get selected.</li>
        <li>Every 7th option is disabled and cannot be picked.</li>
        <li>Switch Virtualize off at 10,000 to compare open speed.</li>
      </ul>
    </div>
  );
}
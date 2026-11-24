"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useRef,
  useId,
  useImperativeHandle,
  useDeferredValue,
} from "react";
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";
import { cn } from "../utils/utils";
import Input from "./Input";
import Label from "./Label";
import Checkbox from "./Checkbox";

export type Option = {
  label: string | number;
  value: string | number;
  info?: string;
  addInfo?: string;
  tooltipContent?: string;
  disabledOption?: boolean;
  labelTextColor?: string;
};

interface MenuItemProps {
  label?: string | number;
  value: string | number;
  children?: React.ReactNode;
}

interface DropdownProps {
  id?: string;
  icon?: JSX.Element;
  /** Optional: when omitted, `children` is rendered inside the menu instead. */
  options?: Option[];
  selected?: Option[];
  setSelected?: React.Dispatch<React.SetStateAction<Option[]>>;
  onApply?: () => void;
  onReset?: () => void;
  dropdownText?: string;
  search?: boolean;
  multiple?: boolean;
  renderItem?: (option: Option) => React.ReactNode;
  children?: React.ReactNode;
  position?: "top" | "bottom";
  /** Fallback `info` for single-select rows whose option has no `info` of its own. */
  info?: string | number;
  /** @deprecated Not used by the component. Use `Option.addInfo` instead. */
  addInfo?: string | number;
  /** @deprecated Not used by the component. Use `Option.tooltipContent` instead. */
  tooltipContent?: string;
  width?: string;
  dropdownFooter?: boolean | undefined;
  disabled?: boolean;
  /** @deprecated Not used by the component. Use `Option.labelTextColor` instead. */
  labelTextColor?: string;
  footerAction?: React.ReactNode;
  height?: string;
  /**
   * Virtualize the list when it has more options than this number.
   * Below it, all rows render normally. Pass Infinity to disable virtualization.
   */
  virtualizeThreshold?: number;
  /**
   * Estimated row height in px, used before a row is measured.
   * Set this close to your real row height to avoid layout recalculations.
   */
  estimatedRowHeight?: number;
  /**
   * Fast path for uniform lists. When set, every row is forced to exactly this
   * height (px), and the list skips measuring entirely: no ResizeObserver,
   * no offsets table, no scrollbar jitter. Rows taller than this get clipped.
   */
  rowHeight?: number;
}

// -------------------- Virtual list (dependency-free) --------------------

type VirtualItem = { index: number; key: string; start: number };

// useLayoutEffect warns during SSR (this file is "use client" but still SSR'd in Next)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Index of the first row whose bottom edge is below `top`. O(1) fixed, O(log n) dynamic. */
function findFirstIndex(
  top: number,
  count: number,
  fixedSize: number | undefined,
  offsets: Float64Array | null,
) {
  if (count <= 0) return 0;
  if (fixedSize) {
    return Math.min(count - 1, Math.max(0, Math.floor(top / fixedSize)));
  }
  const o = offsets as Float64Array;
  let lo = 0;
  let hi = count - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (o[mid + 1] <= top) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Minimal windowing hook.
 *
 * - Dynamic mode (default): rows report their real height through a shared
 *   ResizeObserver; until measured, `estimateSize` is used. Offsets are kept in
 *   a cumulative Float64Array and searched with a binary search.
 * - Fixed mode (`fixedSize` set): everything is arithmetic, nothing is measured.
 *
 * State holds only the index of the first visible row (not raw scrollTop), so
 * scroll events that don't cross a row boundary cause no re-render.
 */
function useVirtualList({
  enabled,
  active,
  count,
  keys,
  estimateSize,
  fixedSize,
  overscan,
  scrollRef,
}: {
  enabled: boolean;
  /** Only produce rows while true (e.g. while the dropdown is open). */
  active: boolean;
  count: number;
  /** Stable string key per row, computed once per list (not per offsets rebuild). */
  keys: string[];
  estimateSize: number;
  fixedSize?: number;
  overscan: number;
  scrollRef: React.RefObject<HTMLElement>;
}) {
  const isFixed = !!fixedSize && fixedSize > 0;

  const sizes = useRef(new Map<string, number>());
  const observerRef = useRef<ResizeObserver | null>(null);
  const nodesRef = useRef(new Set<HTMLElement>());
  const pendingDelta = useRef(0); // height change of rows above the viewport
  const [tick, setTick] = useState(0); // bumps when a row height changes
  const [first, setFirst] = useState(0); // first visible row index
  const [viewport, setViewport] = useState(360);

  // Cumulative offsets: offsets[i] is the top of row i, offsets[count] the total height.
  // Not needed in fixed mode.
  const offsets = useMemo(() => {
    if (isFixed) return null;
    const arr = new Float64Array(count + 1);
    const map = sizes.current;
    for (let i = 0; i < count; i++) {
      arr[i + 1] = arr[i] + (map.get(keys[i]) ?? estimateSize);
    }
    return arr;
    // `tick` is the invalidation signal for sizes.current (a ref)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, keys, estimateSize, isFixed, tick]);

  // Latest layout, readable from event handlers without re-subscribing
  const layoutRef = useRef({
    count,
    fixedSize: isFixed ? fixedSize : undefined,
    offsets,
    first,
    estimateSize,
  });
  layoutRef.current = {
    count,
    fixedSize: isFixed ? fixedSize : undefined,
    offsets,
    first,
    estimateSize,
  };

  const offsetAt = (i: number) =>
    isFixed ? i * (fixedSize as number) : (offsets as Float64Array)[i];

  // Recompute the first visible index from the real scroll position.
  // Bails out (no re-render) when the index is unchanged.
  const sync = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { count, fixedSize, offsets } = layoutRef.current;
    const f = findFirstIndex(el.scrollTop, count, fixedSize, offsets);
    setFirst((prev) => (prev === f ? prev : f));
  }, [scrollRef]);

  // Track scroll position and viewport height of the scroll container
  useEffect(() => {
    const el = scrollRef.current;
    if (!enabled || !el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sync();
      });
    };
    const ro = new ResizeObserver(() => setViewport(el.clientHeight));

    setViewport(el.clientHeight);
    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(el);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [enabled, scrollRef, sync]);

  // After layout changes (new measurements, new list, menu opened):
  //  1. keep the visible content anchored if rows ABOVE the viewport changed size
  //  2. re-sync the first visible index (it may have shifted or exceed the new count)
  useIsoLayoutEffect(() => {
    const el = scrollRef.current;
    if (el && pendingDelta.current !== 0) {
      el.scrollTop += pendingDelta.current;
    }
    pendingDelta.current = 0;
    if (enabled && active) sync();
  }, [offsets, count, enabled, active, sync, scrollRef]);

  // Shared row observer, created lazily so rows can attach during commit
  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver((entries) => {
        let changed = false;
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          const k = target.dataset.vkey;
          // Detached rows report 0; ignore them
          if (k === undefined || !target.isConnected) continue;
          const h =
            entry.borderBoxSize?.[0]?.blockSize ??
            target.getBoundingClientRect().height;
          if (h <= 0) continue;
          const prev = sizes.current.get(k);
          if (prev === undefined || Math.abs(prev - h) > 0.5) {
            // A row above the first visible one changed: remember the delta so
            // the scroll position can be corrected and content doesn't jump.
            const index = Number(target.dataset.index);
            if (index < layoutRef.current.first) {
              pendingDelta.current +=
                h - (prev ?? layoutRef.current.estimateSize);
            }
            sizes.current.set(k, h);
            changed = true;
          }
        }
        if (changed) setTick((t) => t + 1);
      });
    }
    return observerRef.current;
  }, []);

  const measureRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      const nodes = nodesRef.current;
      // Keep the registry from growing as rows scroll in and out
      if (nodes.size > 200) {
        nodes.forEach((n) => {
          if (!n.isConnected) nodes.delete(n);
        });
      }
      nodes.add(node);
      getObserver().observe(node);
    },
    [getObserver],
  );

  // (Re)attach observers after mount. This also covers React Strict Mode's
  // simulated unmount/remount, which disconnects the observer without
  // re-running row ref callbacks.
  useEffect(() => {
    const nodes = nodesRef.current;
    const ro = getObserver();
    nodes.forEach((n) => {
      if (n.isConnected) ro.observe(n);
      else nodes.delete(n);
    });
    return () => {
      ro.disconnect();
      observerRef.current = null;
    };
  }, [getObserver]);

  const totalSize =
    count > 0 ? (isFixed ? count * (fixedSize as number) : offsetAt(count)) : 0;

  const items: VirtualItem[] = [];
  if (enabled && active && count > 0) {
    const f = Math.min(first, count - 1);

    // Safe upper bound for the viewport bottom: scrollTop is somewhere inside row f,
    // so it is never beyond the bottom edge of row f.
    const bottom = offsetAt(f + 1) + viewport;
    let last = f;
    while (last < count - 1 && offsetAt(last + 1) < bottom) last++;

    const from = Math.max(0, f - overscan);
    const to = Math.min(count - 1, last + overscan);
    for (let i = from; i <= to; i++) {
      items.push({ index: i, key: keys[i], start: offsetAt(i) });
    }
  }

  return {
    items,
    totalSize,
    // No measuring needed in fixed mode
    measureRef: isFixed ? undefined : measureRef,
  };
}

const defaultRenderItem = (option: Option) => {
  return <MenuItem label={option.label} value={option.value} />;
};

const DISABLED_COLOR = "#D1D5DB";

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      id: idProp,
      options,
      selected,
      setSelected,
      search = false,
      multiple = false,
      dropdownText = "Select",
      renderItem = defaultRenderItem,
      children,
      icon,
      position = "top",
      width,
      info,
      dropdownFooter = false,
      onApply,
      disabled = false,
      onReset,
      footerAction,
      height = "200px",
      virtualizeThreshold = 50,
      estimatedRowHeight = 34,
      rowHeight,
    },
    ref,
  ) => {
    // Stable across renders and SSR (Math.random() in a default param is not)
    const generatedId = useId();
    const id = idProp ?? `dropdown-${generatedId}`;

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const scrollRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => dropdownRef.current!);
    const searchIndex = useMemo(
      () =>
        search && options
          ? options.map((o) =>
              `${o.label}\n${o.info ?? ""}\n${o.addInfo ?? ""}`.toLowerCase(),
            )
          : null,
      [options, search],
    );

    const deferredQuery = useDeferredValue(searchQuery);
    const isStale = searchQuery !== deferredQuery;

    // Derived from props, no extra state or effect needed
    const memoizedFilteredOptions = useMemo(() => {
      if (!options) return [];
      if (!search || !deferredQuery || !searchIndex) return options;
      const q = deferredQuery.toLowerCase();
      return options.filter((_, i) => searchIndex[i].includes(q));
    }, [options, search, deferredQuery, searchIndex]);

    // O(1) "is selected" lookups instead of scanning `selected` for every row
    const selectedValues = useMemo(
      () => new Set((selected ?? []).map((item) => item.value)),
      [selected],
    );

    // -------------------- Virtualization --------------------

    const shouldVirtualize =
      !!options && memoizedFilteredOptions.length > virtualizeThreshold;

    // String keys computed once per filtered list, reused by the hook
    const keys = useMemo(
      () => memoizedFilteredOptions.map((option) => String(option.value)),
      [memoizedFilteredOptions],
    );

    const {
      items: virtualItems,
      totalSize,
      measureRef,
    } = useVirtualList({
      enabled: shouldVirtualize,
      active: dropdownMenu, // no rows while the menu is closed
      count: memoizedFilteredOptions.length,
      keys,
      estimateSize: estimatedRowHeight,
      fixedSize: rowHeight,
      overscan: 8,
      scrollRef,
    });

    // Jump back to the top whenever the search changes
    useIsoLayoutEffect(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    }, [deferredQuery]);

    // Don't show a stale filter when the menu is reopened
    useEffect(() => {
      if (!dropdownMenu) setSearchQuery("");
    }, [dropdownMenu]);

    // -------------------- Handlers --------------------

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      },
      [],
    );

    // One handler for both modes
    const toggleOption = useCallback(
      (option: Option) => {
        if (!setSelected || option.disabledOption) return;
        if (multiple) {
          setSelected((prevSelected) =>
            prevSelected.some((item) => item.value === option.value)
              ? prevSelected.filter((item) => item.value !== option.value)
              : [...prevSelected, option],
          );
        } else {
          setSelected([option]);
          setDropdownMenu(false);
        }
      },
      [multiple, setSelected],
    );

    // Works on the rows currently matching the search and skips disabled options
    const handleSelectAll = () => {
      if (!setSelected) return;
      const selectable = memoizedFilteredOptions.filter(
        (option) => !option.disabledOption,
      );
      const selectableValues = new Set(selectable.map((o) => o.value));
      const allSelected =
        selectable.length > 0 &&
        selectable.every((option) => selectedValues.has(option.value));

      if (allSelected) {
        setSelected((prev) =>
          prev.filter((item) => !selectableValues.has(item.value)),
        );
      } else {
        setSelected((prev) => {
          const have = new Set(prev.map((item) => item.value));
          return [...prev, ...selectable.filter((o) => !have.has(o.value))];
        });
      }
    };

    const handleReset = () => {
      if (onReset) {
        onReset();
      }
      setSelected?.([]);
      scrollRef.current?.scrollTo({ top: 0 });
      setDropdownMenu(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape" && dropdownMenu) {
        e.stopPropagation();
        setDropdownMenu(false);
        triggerRef.current?.focus();
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setDropdownMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // -------------------- Row --------------------

    const optionColor = (option: Option) =>
      option.disabledOption ? DISABLED_COLOR : option.labelTextColor;

    const renderRow = (option: Option) =>
      multiple ? (
        <Label
          className={cn(
            "has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600 hover:bg-gray-50 flex flex-col py-[6px] px-[14px] cursor-pointer border-l-4 border-transparent",
            option.disabledOption &&
              "opacity-50 cursor-not-allowed hover:bg-white text-gray-300 select-none",
          )}
          htmlFor={`${id}-checkbox-${option.value}`}
        >
          <section className="flex items-center justify-between gap-2 w-full">
            <div className="flex gap-2">
              <Checkbox
                id={`${id}-checkbox-${option.value}`}
                checked={selectedValues.has(option.value)}
                onChange={() => toggleOption(option)}
                disabled={option.disabledOption}
              />
              <div className="flex items-center gap-1">
                <div
                  style={{ color: optionColor(option) }}
                  className={cn(
                    "break-words",
                    option.disabledOption && "text-gray-300",
                  )}
                >
                  {renderItem(option)}
                </div>
              </div>
            </div>
            <span className="text-gray-500">{option.info}</span>
          </section>
          {option.addInfo && (
            <span className="pt-[2px] text-sm text-gray-500">
              {option.addInfo}
            </span>
          )}
        </Label>
      ) : (
        // No htmlFor: there is no control to point at in single-select mode
        <Label
          className={cn(
            "flex flex-col py-[6px] px-[14px] hover:bg-gray-50 border-l-4 border-transparent cursor-pointer",
            selectedValues.has(option.value) &&
              "bg-primary-50 border-primary-600",
            option.disabledOption &&
              "opacity-50 cursor-not-allowed hover:bg-white text-gray-500",
          )}
          onClick={() => toggleOption(option)}
        >
          <section className="flex items-center justify-between gap-2 w-full">
            <div
              style={{ color: optionColor(option) }}
              className={cn(
                "break-words",
                option.disabledOption && "text-gray-300",
              )}
            >
              {renderItem(option)}
            </div>
            {/* Per-option info first, dropdown-level `info` as a fallback */}
            <span className="text-gray-500">{option.info ?? info}</span>
          </section>
          {option.addInfo && (
            <span className="pt-[2px] text-sm text-gray-500">
              {option.addInfo}
            </span>
          )}
        </Label>
      );

    // Same ARIA option semantics in both virtualized and plain rendering
    const optionAria = (option: Option, index: number) => ({
      role: "option" as const,
      "aria-selected": selectedValues.has(option.value),
      "aria-disabled": option.disabledOption || undefined,
      "aria-setsize": memoizedFilteredOptions.length,
      "aria-posinset": index + 1,
    });

    const triggerLabel = multiple
      ? (selected?.length ?? 0) > 0
        ? `${selected?.length} Selected`
        : dropdownText
      : selected?.[0]
        ? selected[0].label
        : dropdownText; // `0` is a valid label, so don't rely on truthiness

    return (
      <div
        id={id}
        ref={dropdownRef}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative bg-gray-25 shadow-[0px_1px_2px_0px_#1018280D] rounded-lg",
          !width && "w-full",
          disabled && "cursor-not-allowed opacity-50",
        )}
        style={{
          width: width,
        }}
      >
        {/* A native <button> already toggles on Enter/Space, so only onClick is needed */}
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownMenu}
          aria-controls={`${id}-menu`}
          aria-labelledby={`${id}-label`}
          disabled={disabled}
          onClick={() => !disabled && setDropdownMenu((prev) => !prev)}
          className={cn(
            "w-full hover:bg-gray-50 py-2 px-[14px] rounded-lg flex justify-between items-center text-gray-900 bg-gray-25 text-sm cursor-pointer",
            dropdownMenu
              ? "border border-primary-600"
              : "border border-gray-200",
            disabled && "bg-gray-300 hover:bg-gray-300 cursor-not-allowed",
          )}
        >
          <section className="flex items-center gap-2 text-ellipsis overflow-hidden">
            {icon && <span aria-hidden="true">{icon}</span>}
            <span id={`${id}-label`} className="line-clamp-1 w-full">
              {triggerLabel}
            </span>
          </section>
          <RiArrowDownSLine aria-hidden="true" size={18} />
        </button>
        <div
          id={`${id}-menu`}
          aria-hidden={!dropdownMenu}
          className={cn(
            "max-h-0 opacity-0 overflow-hidden shadow-sm mt-1 rounded absolute text-sm bg-white z-[1000] w-full transition-all duration-75 delay-100 ease-in",
            !dropdownMenu && "invisible",
            position === "top" ? "top-10" : "bottom-10",
            dropdownMenu
              ? "border border-primary-600"
              : "border border-gray-200",
            dropdownMenu &&
              "max-h-[360px] h-fit opacity-[1] transition-all ease-in duration-150",
          )}
        >
          {search && (
            <Input
              id={`${id}-search`}
              type="text"
              placeholder="Search..."
              aria-label="Search options"
              value={searchQuery}
              onChange={handleSearchChange}
              className="rounded rounded-b-none text-gray-800 bg-white w-full h-[35px] pl-3 border-none"
              endIcon={<RiSearchLine size={18} />}
            />
          )}
          {multiple && (
            <section className="py-[6px] px-[14px] flex justify-between items-center">
              <button
                type="button"
                aria-label="Select all"
                onClick={handleSelectAll}
                className="text-sm  hover:text-primary-700 text-primary-600 cursor-pointer"
              >
                Select all
              </button>
              <button
                aria-label="Reset"
                type="button"
                className="text-sm text-warning-500 hover:text-warning-600"
                onClick={handleReset}
              >
                Reset
              </button>
            </section>
          )}

          {/*
            Scroll container the list windowing watches. It is also the listbox,
            so the search input and Select all / Reset buttons are no longer
            (invalid) children of role="listbox".
            overflowAnchor: none, because we correct scroll position ourselves.
          */}
          <section
            ref={scrollRef}
            role={options ? "listbox" : undefined}
            aria-multiselectable={options ? multiple : undefined}
            aria-labelledby={`${id}-label`}
            aria-busy={isStale}
            style={{ maxHeight: height, overflowAnchor: "none" }}
            className={cn(
              "customScroll z-[1000] transition-all duration-75 delay-100 ease-in-out overflow-y-auto",
              isStale && "opacity-60",
            )}
          >
            {!options ? (
              children
            ) : shouldVirtualize ? (
              <div
                style={{
                  height: totalSize,
                  width: "100%",
                  position: "relative",
                }}
              >
                {virtualItems.map((virtualRow) => {
                  const option = memoizedFilteredOptions[virtualRow.index];
                  if (!option) return null;
                  return (
                    <div
                      key={virtualRow.key}
                      data-vkey={virtualRow.key}
                      data-index={virtualRow.index}
                      // Measures real height (undefined in fixed-height mode)
                      ref={measureRef}
                      {...optionAria(option, virtualRow.index)}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${virtualRow.start}px)`,
                        ...(rowHeight
                          ? { height: rowHeight, overflow: "hidden" }
                          : null),
                      }}
                    >
                      {renderRow(option)}
                    </div>
                  );
                })}
              </div>
            ) : (
              memoizedFilteredOptions.map((option, i) => (
                <div key={`${option.value}-${i}`} {...optionAria(option, i)}>
                  {renderRow(option)}
                </div>
              ))
            )}
            {options && !isStale && memoizedFilteredOptions.length === 0 && (
              <p className="py-[6px] px-[14px] text-gray-500">No options</p>
            )}
          </section>

          {footerAction && (
            <div className="py-2 mt-1 px-2 border-t">{footerAction}</div>
          )}
          {dropdownFooter && (
            <DropdownFooter
              setDropdownMenu={setDropdownMenu}
              onApply={onApply}
            />
          )}
        </div>
      </div>
    );
  },
);

export const MenuItem: React.FC<MenuItemProps> = ({ label, children }) => {
  // `??` so a numeric label of 0 still renders
  return <p className="break-all">{label ?? children}</p>;
};

interface DropdownFooterProps {
  onApply?: (() => void) | undefined;
  setDropdownMenu?: (value: boolean) => void;
}

export const DropdownFooter: React.FC<DropdownFooterProps> = ({
  onApply,
  setDropdownMenu,
}) => {
  return (
    <div className="flex justify-end border-t border-gray-200 px-[14px] py-[8px] text-sm">
      <button
        type="button"
        className="text-primary-600 hover:text-primary-700"
        onClick={() => {
          if (onApply) {
            onApply();
          }
          if (setDropdownMenu) {
            setDropdownMenu(false);
          }
        }}
      >
        Apply
      </button>
    </div>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;

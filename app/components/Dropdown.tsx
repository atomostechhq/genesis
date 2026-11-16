"use client";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useRef,
  useId,
  useImperativeHandle,
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
  options: Option[];
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
  info?: string | number;
  addInfo?: string | number;
  tooltipContent?: string;
  width?: string;
  dropdownFooter?: boolean | undefined;
  disabled?: boolean;
  labelTextColor?: string;
  footerAction?: React.ReactNode;
  height?: string;
  /**
   * Virtualize the list when it has more options than this number.
   * Below it, all rows render normally. Pass Infinity to disable virtualization.
   */
  virtualizeThreshold?: number;
  /** Estimated row height in px, used before a row is measured. */
  estimatedRowHeight?: number;
}

// -------------------- Virtual list (dependency-free) --------------------

type VirtualItem = { index: number; key: string | number; start: number };

/**
 * Minimal windowing hook with dynamic row heights.
 * Rows report their real height through a shared ResizeObserver; until a row
 * is measured, `estimateSize` is used. Only rows near the viewport are returned.
 */
function useVirtualList({
  enabled,
  active,
  count,
  estimateSize,
  overscan,
  getKey,
  scrollRef,
}: {
  enabled: boolean;
  /** Only produce rows while true (e.g. while the dropdown is open). */
  active: boolean;
  count: number;
  estimateSize: number;
  overscan: number;
  getKey: (index: number) => string | number;
  scrollRef: React.RefObject<HTMLElement>;
}) {
  const sizes = useRef(new Map<string, number>());
  const observerRef = useRef<ResizeObserver | null>(null);
  const [tick, setTick] = useState(0); // bumps when a row height changes
  const [scrollTop, setScrollTop] = useState(0);
  const [viewport, setViewport] = useState(360);

  // Track scroll position and viewport height of the scroll container
  useEffect(() => {
    const el = scrollRef.current;
    if (!enabled || !el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrollTop(el.scrollTop);
      });
    };
    const ro = new ResizeObserver(() => setViewport(el.clientHeight));

    setScrollTop(el.scrollTop);
    setViewport(el.clientHeight);
    el.addEventListener("scroll", onScroll, { passive: true });
    ro.observe(el);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [enabled, scrollRef]);

  // Shared row observer, created lazily so rows can attach during commit
  const measureRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
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
            sizes.current.set(k, h);
            changed = true;
          }
        }
        if (changed) setTick((t) => t + 1);
      });
    }
    observerRef.current.observe(node);
  }, []);

  useEffect(
    () => () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    },
    [],
  );

  // Cumulative offsets: offsets[i] is the top of row i, offsets[count] the total height
  const offsets = useMemo(() => {
    const arr = new Float64Array(count + 1);
    for (let i = 0; i < count; i++) {
      arr[i + 1] =
        arr[i] + (sizes.current.get(String(getKey(i))) ?? estimateSize);
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, getKey, estimateSize, tick]);

  const totalSize = offsets[count] ?? 0;

  const items: VirtualItem[] = [];
  if (enabled && active && count > 0) {
    // First row whose bottom edge is below scrollTop
    let lo = 0;
    let hi = count - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (offsets[mid + 1] <= scrollTop) lo = mid + 1;
      else hi = mid;
    }
    const first = lo;

    // Last row whose top edge is above the viewport bottom
    const bottom = scrollTop + viewport;
    let last = first;
    while (last < count - 1 && offsets[last + 1] < bottom) last++;

    const from = Math.max(0, first - overscan);
    const to = Math.min(count - 1, last + overscan);
    for (let i = from; i <= to; i++) {
      items.push({ index: i, key: getKey(i), start: offsets[i] });
    }
  }

  return { items, totalSize, measureRef };
}

const defaultRenderItem = (option: Option) => {
  return <MenuItem label={option.label} value={option.value} />;
};

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
    },
    ref,
  ) => {
    // Stable across renders and SSR (Math.random() in a default param is not)
    const generatedId = useId();
    const id = idProp ?? `dropdown-${generatedId}`;

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLElement>(null);

    useImperativeHandle(ref, () => dropdownRef.current!);

    // Derived from props, no extra state or effect needed
    const memoizedFilteredOptions = useMemo(() => {
      if (!options) return [];
      if (!search || !searchQuery) return options;
      const q = searchQuery.toLowerCase();
      return options.filter((option) =>
        String(option.label).toLowerCase().includes(q),
      );
    }, [options, search, searchQuery]);

    // O(1) "is selected" lookups instead of scanning `selected` for every row
    const selectedValues = useMemo(
      () => new Set((selected ?? []).map((item) => item.value)),
      [selected],
    );

    // -------------------- Virtualization --------------------

    const shouldVirtualize =
      !!options && memoizedFilteredOptions.length > virtualizeThreshold;

    const getKey = useCallback(
      (index: number) => memoizedFilteredOptions[index]?.value ?? index,
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
      estimateSize: estimatedRowHeight,
      overscan: 8,
      getKey,
      scrollRef,
    });

    // Jump back to the top whenever the search changes
    useEffect(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    }, [searchQuery]);

    // -------------------- Handlers --------------------

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      },
      [],
    );

    const toggleOption = useCallback(
      (option: Option) => {
        if (multiple && setSelected) {
          setSelected((prevSelected) =>
            prevSelected.some((item) => item.value === option.value)
              ? prevSelected.filter((item) => item.value !== option.value)
              : [...prevSelected, option],
          );
        } else if (setSelected) {
          setSelected([option]);
          setDropdownMenu(false);
        }
      },
      [multiple, setSelected],
    );

    const handleCheckboxChange = useCallback(
      (option: Option) => {
        if (multiple && setSelected) {
          setSelected((prevSelected) =>
            prevSelected.some((item) => item.value === option.value)
              ? prevSelected.filter((item) => item.value !== option.value)
              : [...prevSelected, option],
          );
        } else if (setSelected) {
          setSelected([option]);
        }
      },
      [multiple, setSelected],
    );

    // Works on the rows currently visible (respects search) and skips disabled options
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
      setDropdownMenu(false);
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

    const renderRow = (option: Option) =>
      multiple ? (
        <Label
          className={cn(
            "has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600 hover:bg-gray-50 flex flex-col py-[6px] px-[14px] cursor-pointer border-l-4 border-transparent",
            option?.disabledOption &&
              "opacity-50 cursor-not-allowed hover:bg-white text-gray-300 select-none",
          )}
          htmlFor={`${id}-checkbox-${option.value}`}
        >
          <section className="flex items-center justify-between gap-2 w-full">
            <div className="flex gap-2">
              <Checkbox
                id={`${id}-checkbox-${option.value}`}
                checked={selectedValues.has(option.value)}
                onChange={() => handleCheckboxChange(option)}
                disabled={option?.disabledOption}
              />
              <div className="flex items-center gap-1">
                <div
                  style={{
                    color: option?.disabledOption
                      ? "#D1D5DB"
                      : option.labelTextColor,
                  }}
                  className={cn(
                    "break-words",
                    option?.disabledOption && "text-gray-300",
                  )}
                >
                  {renderItem(option)}
                </div>
              </div>
            </div>
            <span className="text-gray-500">{option?.info}</span>
          </section>
          <span className="pt-[2px] text-sm text-gray-500">
            {option?.addInfo}
          </span>
        </Label>
      ) : (
        <Label
          htmlFor={`${id}-checkbox-${option.value}`}
          className={cn(
            "flex justify-between py-[6px] px-[14px] hover:bg-gray-50 gap-2 items-center border-l-4 border-transparent cursor-pointer",
            {
              "bg-primary-50 border-primary-600":
                selected && selected[0]?.value === option.value,
              "opacity-50 cursor-not-allowed hover:bg-white text-gray-500":
                option?.disabledOption,
            },
          )}
          onClick={() => !option?.disabledOption && toggleOption(option)}
        >
          <div
            style={{
              color: option?.disabledOption ? "#D1D5DB" : option.labelTextColor,
            }}
            className={cn(
              "break-words",
              option?.disabledOption && "text-gray-300",
            )}
          >
            {renderItem(option)}
          </div>
          <span className="text-gray-500">{info}</span>
        </Label>
      );

    return (
      <div
        id={id}
        ref={dropdownRef}
        className={cn(
          "relative bg-gray-25 shadow-[0px_1px_2px_0px_#1018280D] rounded-lg",
          !width && "w-full",
          disabled && "cursor-not-allowed opacity-50",
        )}
        style={{
          width: width,
        }}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownMenu}
          aria-labelledby={`${id}-label`}
          disabled={disabled}
          onClick={() => !disabled && setDropdownMenu((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              !disabled && setDropdownMenu((prev) => !prev);
            }
          }}
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
              {multiple
                ? (selected?.length ?? 0) > 0
                  ? `${selected?.length} Selected`
                  : dropdownText
                : selected?.[0]?.label
                  ? selected?.[0]?.label
                  : dropdownText}
            </span>
          </section>
          <RiArrowDownSLine aria-hidden="true" size={18} />
        </button>
        <div
          role="listbox"
          aria-multiselectable={multiple}
          aria-labelledby={`${id}-label`}
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

          {/* This section is the scroll container the list windowing watches */}
          <section
            ref={scrollRef}
            style={{ maxHeight: height }}
            className="z-[1000] transition-all duration-75 delay-100 ease-in-out overflow-y-scroll"
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
                      key={String(virtualRow.key)}
                      data-vkey={String(virtualRow.key)}
                      data-index={virtualRow.index}
                      // Measures the real height, so rows with addInfo or wrapped text still work
                      ref={measureRef}
                      role="option"
                      aria-selected={selectedValues.has(option.value)}
                      aria-setsize={memoizedFilteredOptions.length}
                      aria-posinset={virtualRow.index + 1}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      {renderRow(option)}
                    </div>
                  );
                })}
              </div>
            ) : (
              memoizedFilteredOptions.map((option, i) => (
                <React.Fragment key={`${option.value}-${i}`}>
                  {renderRow(option)}
                </React.Fragment>
              ))
            )}
            {options && memoizedFilteredOptions.length === 0 && (
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
  return <p className="break-all">{label || children}</p>;
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

import React, { useState } from "react";
import { cn } from "../utils/utils";
import { RiArrowDownSFill, RiArrowRightSFill } from "@remixicon/react";

// -------------------- Types --------------------

interface TreeViewProps {
  children: React.ReactNode;
  "aria-label": string;
  flat?: boolean;
  className?: string;
  /** Optional array of IDs to expand initially */
  defaultExpandedIds?: string[];
  /** Controlled expansion (useful if parent manages state externally) */
  expandedIds?: string[];
  /** Callback for when expanded nodes change */
  onExpandedChange?: (expanded: string[]) => void;
  /** Allow multiple nodes to be expanded simultaneously */
  allowMultiple?: boolean;
  /** Automatically expand all top-level items by default */
  expandTopLevelByDefault?: boolean;
}

interface TreeViewItemProps {
  id: string;
  children: React.ReactNode;
  current?: boolean;
  className?: string;
  onSelect?: (id: string) => void;
  level?: number;
  expanded?: boolean;
  onToggle?: (id: string) => void;
  selected?: boolean;
  flat?: boolean;
}

interface TreeViewSubTreeProps {
  children: React.ReactNode;
  state?: "loading";
  count?: number;
  className?: string;
  expanded?: boolean;
  flat?: boolean;
}

// -------------------- Main TreeView --------------------

export const TreeView: React.FC<TreeViewProps> & {
  Item: React.FC<TreeViewItemProps>;
  SubTree: typeof TreeViewSubTree;
  LeadingVisual: typeof TreeViewLeadingVisual;
  TrailingVisual: typeof TreeViewTrailingVisual;
} = ({
  children,
  "aria-label": ariaLabel,
  flat = false,
  className,
  defaultExpandedIds = [],
  expandedIds,
  onExpandedChange,
  allowMultiple = true,
  expandTopLevelByDefault = false,
}) => {
  // Extract all top-level IDs if needed for default expansion
  const topLevelIds = React.Children.toArray(children)
    .map((child) =>
      React.isValidElement<TreeViewItemProps>(child) ? child.props.id : null
    )
    .filter(Boolean) as string[];

  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () =>
      new Set(
        defaultExpandedIds.length
          ? defaultExpandedIds
          : expandTopLevelByDefault
          ? topLevelIds
          : []
      )
  );

  const expandedNodes = expandedIds ? new Set(expandedIds) : internalExpanded;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Handle node toggle
  const toggleNode = (id: string) => {
    const updateSet = (set: Set<string>): Set<string> => {
      const next = new Set(set);
      if (allowMultiple) {
        next.has(id) ? next.delete(id) : next.add(id);
      } else {
        next.clear();
        next.add(id);
      }
      return next;
    };

    if (expandedIds && onExpandedChange) {
      // Controlled mode
      const newExpanded = updateSet(expandedNodes);
      onExpandedChange(Array.from(newExpanded));
    } else {
      // Uncontrolled mode
      setInternalExpanded((prev) => updateSet(prev));
    }
  };

  const handleSelect = (id: string) => setSelectedId(id);

  // Recursively enhance children
  const enhanceChildren = (
    nodes: React.ReactNode,
    level = 0
  ): React.ReactNode =>
    React.Children.map(nodes, (child) => {
      if (React.isValidElement<TreeViewItemProps>(child)) {
        return React.cloneElement(child, {
          level,
          expanded: expandedNodes.has(child.props.id),
          onToggle: toggleNode,
          onSelect: handleSelect,
          selected: selectedId === child.props.id,
          flat,
          children: enhanceChildren(child.props.children, level + 1),
        });
      }
      return child;
    });

  return (
    <ul
      role="tree"
      aria-label={ariaLabel}
      className={cn("list-none p-0 m-0 text-sm", className)}
    >
      {enhanceChildren(children)}
    </ul>
  );
};

// -------------------- Item --------------------

const DefaultExpandIcon: React.FC<{ expanded?: boolean }> = ({ expanded }) => (
  <span className="transition-transform duration-200">
    {expanded ? (
      <RiArrowDownSFill size={18} />
    ) : (
      <RiArrowRightSFill size={18} />
    )}
  </span>
);

const TreeViewItem: React.FC<TreeViewItemProps> = ({
  id,
  children,
  current = false,
  className,
  onSelect,
  expanded = false,
  onToggle,
  selected = false,
  level = 0,
  flat = false,
}) => {
  const leading: React.ReactNode[] = [];
  const trailing: React.ReactNode[] = [];
  const content: React.ReactNode[] = [];
  let subTree: React.ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === TreeViewLeadingVisual) leading.push(child);
      else if (child.type === TreeViewTrailingVisual) trailing.push(child);
      else if (child.type === TreeViewSubTree) subTree = child;
      else content.push(child);
    } else content.push(child);
  });

  const hasSubTree = !!subTree;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasSubTree && !flat && onToggle) onToggle(id);
    if (onSelect) onSelect(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleClick(e as any);
        break;
      case "ArrowRight":
        if (hasSubTree && !expanded && !flat && onToggle) {
          e.preventDefault();
          onToggle(id);
        }
        break;
      case "ArrowLeft":
        if (hasSubTree && expanded && !flat && onToggle) {
          e.preventDefault();
          onToggle(id);
        }
        break;
    }
  };

  const processedSubTree =
    subTree && React.isValidElement(subTree)
      ? React.cloneElement(subTree, { expanded, flat })
      : null;

  return (
    <>
      <li
        role="treeitem"
        aria-expanded={hasSubTree && !flat ? expanded : undefined}
        aria-selected={selected}
        aria-current={current ? "true" : undefined}
        className={cn(
          "flex items-center gap-2 px-2 py-1 cursor-pointer select-none rounded transition-colors duration-150",
          selected && "bg-blue-50 text-blue-600 font-medium",
          "hover:bg-gray-100",
          className
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span className="flex items-center gap-1">
          {/* Show arrow only if there is no custom leading visual */}
          {!leading.length && hasSubTree && !flat && (
            <DefaultExpandIcon expanded={expanded} />
          )}
          {leading}
        </span>

        <span className="flex-1">{content}</span>
        {trailing}
      </li>
      {processedSubTree}
    </>
  );
};

// -------------------- SubTree --------------------

const TreeViewSubTree: React.FC<TreeViewSubTreeProps> = ({
  children,
  state,
  count,
  className,
  expanded = false,
  flat = false,
}) => {
  if (flat) return null;
  if (state === "loading") {
    return (
      <ul role="group" className={cn("list-none m-0", className)}>
        <li className="text-gray-500 italic p-1 pl-6">
          Loading{count ? ` ${count} items...` : "..."}
        </li>
      </ul>
    );
  }

  return (
    <ul
      role="group"
      className={cn(
        "list-none m-0 pl-0 overflow-hidden transition-all duration-300 ease-in-out",
        expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        className
      )}
    >
      {children}
    </ul>
  );
};

// -------------------- Visuals --------------------

const TreeViewLeadingVisual: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <span className={cn("flex items-center flex-shrink-0", className)}>
    {children}
  </span>
);

const TreeViewTrailingVisual: React.FC<{
  children: React.ReactNode;
  label?: string;
  className?: string;
}> = ({ children, label, className }) => (
  <span
    className={cn("flex items-center ml-auto flex-shrink-0", className)}
    aria-label={label}
  >
    {children}
  </span>
);

// Attach subcomponents
TreeView.Item = TreeViewItem;
TreeView.SubTree = TreeViewSubTree;
TreeView.LeadingVisual = TreeViewLeadingVisual;
TreeView.TrailingVisual = TreeViewTrailingVisual;

export default TreeView;

import React, { useState } from "react";
import { cn } from "../utils/utils";

// Types
interface TreeViewProps {
  children: React.ReactNode;
  "aria-label": string;
  flat?: boolean;
  className?: string;
}

interface TreeViewItemProps {
  id: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
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

// Helper function to find all default expanded nodes recursively
const findDefaultExpandedNodes = (children: React.ReactNode, flat: boolean = false): Set<string> => {
  const expandedNodes = new Set<string>();
  
  const traverse = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (React.isValidElement(child)) {
        // Check if it's a TreeViewItem with defaultExpanded
        const props = child.props as any;
        if ((child.type as any) === TreeViewItem && props?.defaultExpanded && !flat) {
          expandedNodes.add(props.id);
        }
        
        // Recursively check children for SubTrees
        if (props?.children) {
          React.Children.forEach(props.children, (grandChild) => {
            if (React.isValidElement(grandChild) && (grandChild.type as any) === TreeViewSubTree) {
              const subTreeProps = grandChild.props as any;
              traverse(subTreeProps?.children);
            }
          });
        }
      }
    });
  };
  
  traverse(children);
  return expandedNodes;
};

// Main TreeView Component
export const TreeView: React.FC<TreeViewProps> & {
  Item: React.FC<TreeViewItemProps>;
  SubTree: typeof TreeViewSubTree;
  LeadingVisual: typeof TreeViewLeadingVisual;
  TrailingVisual: typeof TreeViewTrailingVisual;
} = ({ children, "aria-label": ariaLabel, flat = false, className }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => 
    findDefaultExpandedNodes(children, flat)
  );
  
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleSelect = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<TreeViewItemProps>(child)) {
      return React.cloneElement(child, {
        level: 0,
        expanded: expandedNodes.has(child.props.id),
        onToggle: toggleNode,
        selected: selectedNode === child.props.id,
        onSelect: handleSelect,
        flat,
      });
    }
    return child;
  });

  return (
    <ul
      role="tree"
      aria-label={ariaLabel}
      className={cn("list-none p-0 m-0", className)}
    >
      {enhancedChildren}
    </ul>
  );
};

// TreeView Item Component
const TreeViewItem: React.FC<TreeViewItemProps> = ({
  id,
  children,
  defaultExpanded = false,
  current = false,
  className,
  onSelect,
  expanded = false,
  onToggle,
  selected = false,
  level = 0,
  flat = false,
}) => {
  const leadingVisuals: React.ReactNode[] = [];
  const trailingVisuals: React.ReactNode[] = [];
  let content: React.ReactNode[] = [];
  let subTree: React.ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === TreeViewLeadingVisual) {
        leadingVisuals.push(child);
      } else if (child.type === TreeViewTrailingVisual) {
        trailingVisuals.push(child);
      } else if (child.type === TreeViewSubTree) {
        subTree = child;
      } else {
        content.push(child);
      }
    } else {
      content.push(child);
    }
  });

  const hasSubTree = !!subTree;

  React.useEffect(() => {
    if (current && onSelect) {
      onSelect(id);
    }
  }, [current, id, onSelect]);

  const handleClick = () => {
    if (hasSubTree && !flat && onToggle) {
      onToggle(id);
    }
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleClick();
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

  const EnhancedSubTree = subTree
    ? React.cloneElement(subTree, {
        expanded,
        flat,
      } as any)
    : null;

  // Process SubTree children if EnhancedSubTree exists
  const ProcessedSubTree =
    EnhancedSubTree && React.isValidElement(EnhancedSubTree)
      ? React.cloneElement(EnhancedSubTree, {
          children: React.Children.map(
            (EnhancedSubTree as React.ReactElement).props.children,
            (child) => {
              if (React.isValidElement<TreeViewItemProps>(child)) {
                return React.cloneElement(child, {
                  level: level + 1,
                  onToggle,
                  onSelect,
                  flat,
                });
              }
              return child;
            }
          ),
        } as any)
      : EnhancedSubTree;

  return (
    <>
      <li
        role="treeitem"
        aria-expanded={hasSubTree && !flat ? expanded : undefined}
        aria-selected={selected}
        aria-current={current ? "true" : undefined}
        className={cn(
          "flex items-center gap-2 px-2 py-1 cursor-pointer select-none rounded",
          selected && "bg-blue-50 text-blue-600",
          className
        )}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {hasSubTree && !flat && (
          <span className="w-4 h-4 flex items-center justify-center flex-shrink-0">
            {expanded ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12 5l-4 4-4-4h8z" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 12l4-4 4 4H5z" />
              </svg>
            )}
          </span>
        )}

        {!hasSubTree && !flat && <span className="w-4 h-4 flex-shrink-0" />}

        {leadingVisuals}
        <span className="flex-1">{content}</span>
        {trailingVisuals}
      </li>

      {ProcessedSubTree}
    </>
  );
};

// TreeView SubTree Component
const TreeViewSubTree: React.FC<TreeViewSubTreeProps> = ({
  children,
  state,
  count,
  className,
  expanded = false,
  flat = false,
}) => {
  if (flat || !expanded) {
    return null;
  }

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
    <ul role="group" className={cn("list-none m-0", className)}>
      {children}
    </ul>
  );
};

// Visual Components
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
'use client';

import React, {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiArrowDownSLine, RiArrowRightSLine } from '@remixicon/react';
import { cn } from '../utils/utils';
import Divider from './Divider';

// -------------------- Types --------------------

export interface NavItem {
  label: string;
  /** Route or URL. Absolute URLs (http, https, mailto, tel) open as normal links. */
  href?: string;
  icon?: React.ReactElement;
  subItems?: NavItem[];
  /** Run an action instead of navigating (used when there is no href). */
  onClick?: () => void;
  disabled?: boolean;
  /** Only highlight on an exact path match (default also matches nested routes). */
  exact?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  children: React.ReactNode;
  /** NOTE: `collapsed === true` means the sidebar is EXPANDED (hovered/focused). */
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  dense?: boolean;
}

interface SidebarHeaderProps {
  children: ReactNode;
  dense?: boolean;
}

interface SidebarMenuProps {
  collapsed: boolean;
  scroll?: boolean;
  dense?: boolean;
  navItems?: NavGroup[];
}

interface FooterProps {
  children?: React.ReactNode;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  navItems?: NavGroup[];
  dense?: boolean;
}

// -------------------- Helpers --------------------

const isExternal = (href?: string) =>
  !!href && /^(https?:|mailto:|tel:|\/\/)/i.test(href);

const normalizePath = (p: string) => p.split(/[?#]/)[0].replace(/\/+$/, '') || '/';

/** Exact match, or nested-route match (/accounts matches /accounts/123). */
const isPathActive = (item: NavItem, pathname: string) => {
  const { href } = item;
  if (!pathname || !href || href === '#' || isExternal(href)) return false;
  const target = normalizePath(href);
  const current = normalizePath(pathname);
  if (item.exact || target === '/') return current === target;
  return current === target || current.startsWith(`${target}/`);
};

const hasActiveDescendant = (item: NavItem, pathname: string): boolean =>
  !!item.subItems?.some(
    (sub) => isPathActive(sub, pathname) || hasActiveDescendant(sub, pathname),
  );

/** Drop groups with no items so empty headings never render. */
const useVisibleGroups = (navItems?: NavGroup[]) =>
  useMemo(
    () => (navItems ?? []).filter((group) => group?.items?.length > 0),
    [navItems],
  );

/** Label that fades out while the sidebar is in its narrow (icon-only) state. */
const FadingText: React.FC<{ show: boolean; children: ReactNode }> = ({
  show,
  children,
}) => (
  <span
    className={cn(
      !show ? 'opacity-0' : '',
      'transition-opacity duration-200',
    )}
  >
    {children}
  </span>
);

/** A single clickable entry (no sub-items). Shared by the menu and the footer. */
const NavLeaf: React.FC<{
  item: NavItem;
  level?: number;
  isActive: boolean;
  collapsed: boolean;
  dense: boolean;
}> = ({ item, level = 0, isActive, collapsed, dense }) => {
  const className = cn(
    'flex items-center gap-2 rounded-md cursor-pointer transition-colors duration-300 whitespace-nowrap overflow-hidden',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600',
    dense ? 'px-3 py-1 mb-1' : 'px-3 py-2 mb-[6px]',
    isActive
      ? 'bg-primary-600 hover:bg-primary-700 text-white'
      : 'text-gray-700 hover:bg-gray-100',
    level > 0 ? 'text-sm font-medium' : 'font-semibold',
    item.disabled ? 'opacity-50 pointer-events-none' : '',
  );

  const content = (
    <>
      {item.icon && level === 0 && (
        <span className={dense ? 'text-xs' : 'text-text-sm'}>{item.icon}</span>
      )}
      <FadingText show={collapsed}>{item.label}</FadingText>
    </>
  );

  // Tooltip so labels stay discoverable in the icon-only state
  const title = !collapsed ? item.label : undefined;

  if (!item.href && item.onClick) {
    return (
      <button
        type="button"
        title={title}
        disabled={item.disabled}
        onClick={item.onClick}
        className={cn(className, 'w-full text-left')}
      >
        {content}
      </button>
    );
  }

  if (isExternal(item.href)) {
    return (
      <a
        href={item.href}
        title={title}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={item.disabled}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={item.href || '#'}
      title={title}
      aria-current={isActive ? 'page' : undefined}
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : undefined}
      onClick={item.onClick}
      className={className}
    >
      {content}
    </Link>
  );
};

// -------------------- Sidebar --------------------

const Sidebar: React.FC<SidebarProps> & {
  Header: React.FC<SidebarHeaderProps>;
  Menu: React.FC<SidebarMenuProps>;
  Footer: React.FC<FooterProps>;
} = ({ children, collapsed, setCollapsed, dense = false }) => {
  const handleExpand = useCallback(() => setCollapsed(true), [setCollapsed]);
  const handleShrink = useCallback(() => setCollapsed(false), [setCollapsed]);

  return (
    <aside
      onMouseEnter={handleExpand}
      onMouseLeave={handleShrink}
      onFocus={handleExpand}
      onBlur={(e) => {
        // Only shrink when focus leaves the sidebar entirely
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          handleShrink();
        }
      }}
      className={cn(
        // Fixed-height flex column: header and footer keep their size,
        // the menu in between takes the remaining space and scrolls.
        'border border-gray-200 shadow-sm relative flex flex-col h-screen overflow-hidden transition-all duration-300 ease-in-out cursor-pointer',
        !collapsed
          ? dense
            ? 'w-[76px] py-[19px] px-[15px]'
            : 'w-[80px] py-[21px] px-[17px]'
          : dense
            ? 'w-[304px] py-[20px] px-5'
            : 'w-[308px] py-[22px] px-6',
      )}
    >
      {/* min-h-0 lets this flex child shrink so the menu can scroll */}
      <div className="flex flex-col flex-1 min-h-0">{children}</div>
    </aside>
  );
};

// -------------------- SidebarHeader --------------------

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  dense = false,
}) => {
  return (
    <div className={cn('z-20 shrink-0', dense ? 'mb-3' : 'mb-4')}>
      <div className="flex justify-between items-center">
        <span className="whitespace-nowrap">{children}</span>
      </div>
    </div>
  );
};

// -------------------- SidebarMenu --------------------

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  collapsed,
  navItems,
  scroll = true,
  dense = false,
}) => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname() ?? '';
  const groups = useVisibleGroups(navItems);

  // When the sidebar shrinks, forget manual toggles so the next expand
  // starts with only the active section open.
  useEffect(() => {
    if (!collapsed) {
      setOpenMenus({});
    }
  }, [collapsed]);

  const renderMenuItems = (items: NavItem[], level: number, keyPrefix: string) => {
    return (
      <ul className={level > 0 ? 'ml-5 border-l border-gray-200' : ''}>
        {items.map((item, index) => {
          // Unique per position, so duplicate labels never share open state
          const key = `${keyPrefix}/${item.label}:${index}`;
          const hasSubItems = !!item.subItems && item.subItems.length > 0;
          const childActive = hasSubItems && hasActiveDescendant(item, pathname);
          const isActive = isPathActive(item, pathname);
          // Manual toggle wins; otherwise the section holding the active page is open
          const isOpen = openMenus[key] ?? childActive;
          const paddingLeft =
            level === 0
              ? dense
                ? '10px'
                : '12px'
              : `${level * 5 + (dense ? 10 : 12)}px`;

          return (
            <li key={key}>
              {hasSubItems ? (
                <button
                  type="button"
                  aria-expanded={collapsed ? isOpen : undefined}
                  title={!collapsed ? item.label : undefined}
                  disabled={item.disabled}
                  className={cn(
                    'w-full text-left flex items-center justify-between rounded-md cursor-pointer transition-colors duration-300 font-semibold whitespace-nowrap overflow-hidden',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600',
                    dense ? 'px-3 py-1.5 mb-1' : 'px-3 py-2 mb-[6px]',
                    // Closed parent holding the active page stays highlighted
                    (isActive || childActive) && !isOpen
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100',
                    isOpen ? 'bg-gray-100' : '',
                    level > 0 ? 'text-sm font-medium' : '',
                    item.disabled ? 'opacity-50 pointer-events-none' : '',
                  )}
                  style={{ paddingLeft }}
                  onClick={() => {
                    // Only toggle while expanded
                    if (collapsed) {
                      setOpenMenus((prev) => ({ ...prev, [key]: !isOpen }));
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && level === 0 && (
                      <span className={dense ? 'text-xs' : 'text-text-sm'}>
                        {item.icon}
                      </span>
                    )}
                    <FadingText show={collapsed}>{item.label}</FadingText>
                  </div>
                  {collapsed && (
                    <span aria-hidden="true">
                      {isOpen ? (
                        <RiArrowDownSLine
                          size={dense ? 16 : 18}
                          color="currentColor"
                        />
                      ) : (
                        <RiArrowRightSLine
                          size={dense ? 16 : 18}
                          color="currentColor"
                        />
                      )}
                    </span>
                  )}
                </button>
              ) : (
                <NavLeaf
                  item={item}
                  level={level}
                  isActive={isActive}
                  collapsed={collapsed}
                  dense={dense}
                />
              )}

              {hasSubItems && isOpen && collapsed && (
                <div className={dense ? 'mt-0.5' : 'mt-1'}>
                  {renderMenuItems(item.subItems!, level + 1, key)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  if (groups.length === 0) return null;

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        // Fill the space between header and footer, then scroll inside it
        'flex-1 min-h-0',
        scroll && collapsed
          ? 'overflow-y-auto customScroll'
          : 'overflow-hidden',
      )}
    >
      <ul
        className={cn(
          'flex flex-col gap-2 items-stretch',
          dense ? 'my-1.5' : 'my-2',
        )}
      >
        {groups.map((group, groupIndex) => (
          <li
            key={`${group.label}:${groupIndex}`}
            className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
          >
            <p
              className={cn(
                'text-gray-500 font-medium',
                dense ? 'text-[12px]' : 'text-[14px]',
                !collapsed ? 'opacity-0' : '',
                'transition-opacity duration-200',
              )}
            >
              {group.label}
            </p>
            {renderMenuItems(group.items, 0, group.label)}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// -------------------- Footer --------------------

const SidebarFooter: React.FC<FooterProps> = ({
  children,
  setCollapsed,
  collapsed,
  navItems,
  dense = false,
}) => {
  const pathname = usePathname() ?? '';
  const groups = useVisibleGroups(navItems);
  const hasItems = groups.length > 0;

  // Nothing to show: render no footer at all (no padding, no divider)
  if (!hasItems && !children) return null;

  return (
    <div
      // Normal flex child (not absolute), so it can never cover the menu.
      // Only the footer items scroll; `children` (e.g. logout) stays pinned.
      // The cap is relative to the viewport so the menu always keeps some room.
      className={cn(
        'shrink-0 w-full flex flex-col bg-white z-10',
        dense
          ? 'max-h-[min(226px,40vh)] pt-2.5 pb-0'
          : 'max-h-[min(230px,40vh)] pt-3 pb-0',
      )}
      onClick={() => setCollapsed(true)}
    >
      {collapsed && (
        <div className="shadow-md shrink-0">
          <Divider />
        </div>
      )}

      {hasItems && (
        <nav
          aria-label="Utility navigation"
          className={cn(
            // Same scrollbar behaviour as the main menu
            'flex-1 min-h-0 w-full',
            collapsed ? 'overflow-y-auto customScroll' : 'overflow-hidden',
          )}
        >
          <ul
            className={cn(
              'flex flex-col gap-2 items-stretch',
              dense ? 'my-1.5' : 'my-2',
            )}
          >
            {groups.map((group, groupIndex) => (
              <li
                key={`${group.label}:${groupIndex}`}
                className="flex flex-col gap-3 mb-1 whitespace-nowrap overflow-hidden"
              >
                <p
                  className={cn({
                    'text-gray-500': true,
                    'text-[12px]': dense,
                    'text-[14px]': !dense,
                    'w-[35px] text-ellipsis invisible whitespace-nowrap overflow-hidden':
                      !collapsed && dense,
                    'w-[37px] text-ellipsis invisible whitespace-nowrap overflow-hidden':
                      !collapsed && !dense,
                  })}
                >
                  {group.label}
                </p>
                <ul>
                  {group.items.map((item, index) => (
                    <li key={`${item.label}:${index}`}>
                      <NavLeaf
                        item={item}
                        isActive={isPathActive(item, pathname)}
                        collapsed={collapsed}
                        dense={dense}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Divider + logout: outside the scroll area, always visible */}
      {children && <div className="shrink-0">{children}</div>}
    </div>
  );
};

Sidebar.Header = SidebarHeader;
Sidebar.Menu = SidebarMenu;
Sidebar.Footer = SidebarFooter;

export { SidebarHeader, SidebarMenu, SidebarFooter };
export default Sidebar;
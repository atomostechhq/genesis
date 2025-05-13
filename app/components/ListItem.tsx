import Link from "next/link";
import React from "react";
import { cn } from "../utils/utils";

interface BaseProps {
  className?: string;
  children?: React.ReactNode;
  title: string;
  as?: "link" | "button";
  icon?: React.ReactNode;
}

type LinkProps = BaseProps & {
  as: "link";
  href: string;
  onClick?: never;
  className?: string;
};

type ButtonProps = BaseProps & {
  as: "button";
  href?: never;
  onClick?: () => void;
  className?: string;
};

type ListItemProps = LinkProps | ButtonProps;

const ListItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ListItemProps
>(({ className, title, href, onClick, as = "link", icon }, ref) => {
  const commonClasses = cn(
    "px-4 py-[8px] w-full flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-600 focus-visible:ring-2 rounded",
    className
  );

  if (as === "button") {
    return (
      <button
        className={commonClasses}
        onClick={onClick}
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        role="menuitem"
      >
        <span className="text-base font-normal">{title}</span>
        {icon && (
          <span className="flex-shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
      </button>
    );
  }

  return (
    <Link
      href={href ?? ""}
      className={commonClasses}
      ref={ref as React.Ref<HTMLAnchorElement>}
      role="menuitem"
      onClick={(e) => {
        if (!href) {
          e.preventDefault();
        }
      }}
    >
      <span className="text-base font-normal">{title}</span>
      {icon && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </Link>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;

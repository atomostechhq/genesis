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
  if (as === "button") {
    return (
      <button
        className={cn(
          "px-4 py-[8px] w-full text-left flex items-center gap-2",
          className
        )}
        onClick={onClick}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        <h1>{title}</h1>
        {icon && <span>{icon}</span>}
      </button>
    );
  }

  return (
    <Link
      href={href ?? ""}
      passHref
      className={cn("px-4 py-[8px] w-full flex items-center gap-2", className)}
      ref={ref as React.Ref<HTMLAnchorElement>}
    >
      <h1>{title}</h1>
      {icon && <p>{icon}</p>}
    </Link>
  );
});

ListItem.displayName = "ListItem";

export default ListItem;

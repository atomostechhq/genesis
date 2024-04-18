"use client";
import { useMemo, useState } from "react";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import { usePathname, useRouter } from "next/navigation";
import SubMenuItem from "./sub-item";
import Link from "next/link";

interface ISidebarItem {
  name: string;
  path: string;
  icon: any;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const SidebarItem = ({ item }: { item: ISidebarItem }) => {
  const { name, icon: Icon, items, path } = item;
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  // console.log("pathname", pathname);

  const onClick = () => {
    if (items && items.length > 0) {
      return setExpanded(!expanded);
    }

    return router.push(path);
  };
  const isActive = useMemo(() => {
    if (items && items.length > 0) {
      if (items.find((item) => item.path === pathname)) {
        setExpanded(true);
        return true;
      }
    }

    return path === pathname;
  }, [items, path, pathname]);

  // console.log("isActive", isActive);

  return (
    <>
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-primary-50 cursor-pointer hover:text-sidebar-active justify-between
     ${isActive && "text-primary-400 bg-primary-50"}
    `}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <Icon size={20} />
          <p className="text-sm font-semibold">{name} </p>
        </div>
        {items && items.length > 0 && <ArrowDownSLineIcon size={18} />}
      </div>
      {/* <Link
        className={`flex  test items-center p-3 rounded-lg hover:bg-primary-50 cursor-pointer hover:text-sidebar-active ${
          pathname === path ? "text-primary-600" : ""
        }`}
        href={path}
      >
        <span className="sidebar__icon">
          <Icon size={20} />
        </span>
        <span className="sidebar__name">{name}</span>
        {items && items.length > 0 && <ArrowDownSLineIcon size={18} />}
      </Link> */}
      {expanded && items && items.length > 0 && (
        <div className="flex flex-col space-y-1 ml-10">
          {items.map((item) => (
            <SubMenuItem key={item.path} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default SidebarItem;

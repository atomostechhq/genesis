import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";

const BreadCrumb = () => {
  const pathname = usePathname();
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const segments = pathname.split("/").filter((segment) => segment !== "");
    let url = "";
    const links = segments.map((segment, i) => {
      url += `/${segment}`;
      const isActive = i === segments.length - 1;
      const isLast = i === segments.length - 1;
      return (
        <React.Fragment key={i}>
          {i !== 0 && <ArrowRightSLineIcon size={16} />}
          <Link
            className={`text-gray-700 text-text-xs font-semibold py-[6px] rounded-lg ${
              isActive ? "bg-gray-200 px-3 rounded-lg" : ""
            }`}
            href={url}
          >
            {i === 0 ? "Home" : segment}
          </Link>
        </React.Fragment>
      );
    });

    if (segments.length === 0) {
      links.unshift(
        <Link
          key="home"
          href="/"
          className="text-gray-700 text-text-xs font-semibold px-3 py-[6px] rounded-lg bg-gray-200"
        >
          Home
        </Link>
      );
    }

    setBreadcrumbLinks(links);
  }, [pathname]);

  return <div className="flex items-center gap-2">{breadcrumbLinks}</div>;
};

export default BreadCrumb;

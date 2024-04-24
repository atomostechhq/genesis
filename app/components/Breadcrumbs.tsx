import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadCrumb = () => {
  const pathname = usePathname();
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const segments = pathname.split("/").filter((segment) => segment !== "");

    let url = "";
    const links = segments?.map((segment, i) => {
      url += `/${segment}`;
      const isActive = i === segments.length - 1;
      return (
        <Link
          className={`"text-gray-700 text-text-xs font-semibold px-3 py-[6px] rounded-lg", ${isActive ? "bg-gray-200 rounded-lg" : ""}`}
          key={i}
          href={url}
        >
          {i === 0 ? "Home" : segment}
        </Link>
      );
    });

    // Dynamically handle the root route ("/")
    if (segments.length === 0) {
      links.unshift(
        <Link key="home" href="/" className={`text-gray-700 text-text-xs font-semibold px-3 py-[6px] rounded-lg bg-gray-200`}>
          Home
        </Link>
      );
    }

    setBreadcrumbLinks(links);
  }, [pathname]);

  return <div className="flex gap-2">{breadcrumbLinks}</div>;
};

export default BreadCrumb;

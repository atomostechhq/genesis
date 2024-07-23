"use client"
import Breadcrumbs from "@/app/components/Breadcrumb";
import Breadcrumb from "@/app/components/Breadcrumb";
import { RiArrowRightSLine, RiHome2Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Team = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter(x => x);
  return (
    <div className="my-5">
      <h1>Team page</h1>
      <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
      <Breadcrumbs aria-label="breadcrumb" separator=">">
          <Link href="/" className="text-decoration-none text-inherit">
            Home
          </Link>
          {pathnames.map((name, index) => {
            const href = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isActive = href === pathname;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={href}>
                <Link
                  href={href}
                  className={`capitalize ${
                    isActive
                      ? "bg-blue-500 text-white px-2 py-1 rounded-full"
                      : "text-decoration-none text-inherit"
                  } ${isLast ? "font-semibold" : ""}`}
                >
                  {name.replace(/-/g, " ")}
                </Link>
                {/* {!isLast && <span className="mx-2">></span>} */}
              </React.Fragment>
            );
          })}
        </Breadcrumbs>
    </div>
  );
};

export default Team;

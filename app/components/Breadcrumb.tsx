// "use client"
// import React, { ReactNode } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

// type BreadCrumbProps = {
//   homeElement: ReactNode;
//   separator: ReactNode;
//   containerClasses?: string;
//   listClasses?: string;
//   activeClasses?: string;
//   capitalizeLinks?: boolean;
// };

// const Breadcrumb = ({
//   homeElement,
//   separator,
//   containerClasses,
//   listClasses,
//   activeClasses,
//   capitalizeLinks,
// }: BreadCrumbProps) => {
//   const paths = usePathname();
//   const pathNames = paths?.split("/")?.filter((path) => path);

//   return (
//     <div>
//       <ul className={containerClasses}>
//         <li className={listClasses}>
//           <Link href={"/"}>{homeElement}</Link>
//         </li>
//         {pathNames?.length > 0 && separator}
//         {pathNames?.map((link, index) => {
//           let href = `/${pathNames?.slice(0, index + 1)?.join("/")}`;
//           let itemClasses =
//             paths === href ? `${listClasses} ${activeClasses}` : listClasses;
//           let itemLink = capitalizeLinks
//             ? link[0]?.toUpperCase() + link?.slice(1, link?.length)
//             : link;
//           return (
//             <React.Fragment key={index}>
//               <li className={itemClasses}>
//                 <Link href={href}>{itemLink}</Link>
//               </li>
//               {pathNames?.length !== index + 1 && separator}
//             </React.Fragment>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default Breadcrumb;

import React from 'react';

type BreadcrumbsProps = {
  children: React.ReactNode;
  separator?: React.ReactNode;
  'aria-label': string;
  containerClasses?: string;
};

const Breadcrumbs = ({
  children,
  separator = '/',
  'aria-label': ariaLabel,
  containerClasses
}: BreadcrumbsProps) => {
  const items = React.Children.toArray(children).map((child, index) => {
    const isLast = index === React.Children.count(children) - 1;
    return (
      <span key={index} className='flex items-center text-text-xs text-gray-700 font-semibold'>
        {child}
        {!isLast && <span className='mx-[6px]'>{separator}</span>}
      </span>
    );
  });

  return (
    <nav aria-label={ariaLabel} className={`flex items-center text-text-xs text-gray-700 font-semibold ${containerClasses}`}>
      {items}
    </nav>
  );
};

export default Breadcrumbs;

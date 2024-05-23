"use client"
import { Dropdown } from "@/app/components";
import Breadcrumb from "@/app/components/Breadcrumb";
import { RiArrowRightSLine, RiHome2Line } from "@remixicon/react";
import React, { useState } from "react";
interface Option {
  label: string;
  value: string;
}

const Team = () => {
  const [singleSelect, setSingleSelect] = useState<Option[]>([]);

  const singleOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];
  return (
    <div className="my-5">
      <h1>Team page</h1>
      <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
      <Breadcrumb
        homeElement={<RiHome2Line size={18} />}
        separator={
          <span>
            <RiArrowRightSLine size={18} color="gray" />
          </span>
        }
        activeClasses="bg-gray-200"
        containerClasses="flex gap-[6px] items-center"
        listClasses="hover:bg-gray-100 rounded-lg py-[6px] px-3 text-text-xs font-semibold font-bold cursor-pointer"
        capitalizeLinks
      />
      <Dropdown
        options={singleOptions}
        selected={singleSelect}
        setSelected={setSingleSelect}
        // search={true}
        multiple={false}
        info="info"
        // dropDownTooltip={true}
      />
    </div>
  );
};

export default Team;

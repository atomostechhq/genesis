"use client";
import BreadCrumb from "@/app/components/Breadcrumbs";
import DateRangePicker from "@/app/components/DateRangePicker";
import React from "react";

const Team = () => {
  return (
    <div className="my-5">
      <h1>Team page</h1>
      <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
      <BreadCrumb />
      <div>
        <DateRangePicker />
      </div>
    </div>
  );
};

export default Team;

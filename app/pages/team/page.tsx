"use client";
import BreadCrumb from "@/app/components/Breadcrumbs";
import React from "react";

const Team = () => {
  return (
    <div className="my-5">
      <h1>Team page</h1>
      <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
      <BreadCrumb />
    </div>
  );
};

export default Team;

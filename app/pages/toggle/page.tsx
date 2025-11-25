import { Label, Toggle } from "@/app/components";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5 m-5">
      <h1 className="text-display-sm text-primary-600">Toggle:</h1>
      <section className="flex items-center gap-4">
        <h1>Size:</h1>
        <Toggle size="sm" />
        <Toggle size="md" />
        <Toggle size="lg" checked readOnly />
      </section>
      <section className="flex items-center gap-4">
        <h1>Variants:</h1>
        <Toggle size="md" intent={"primary"} />
        <Toggle size="md" intent={"success"} />
      </section>
      <section className="flex items-center gap-4">
        <h1>With Labels:</h1>
        <div className="flex items-center gap-2">
          <Label htmlFor="primary">On</Label>
          <Toggle size="md" id="primary" intent={"primary"} />
        </div>
        <div className="flex items-center gap-2">
          <Toggle size="md" id="success" intent={"success"} />
          <Label htmlFor="success">Success</Label>
        </div>
      </section>
    </div>
  );
};

export default page;

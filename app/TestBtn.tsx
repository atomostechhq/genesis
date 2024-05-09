import React from "react";
import Button from "@/app/components/Button";
import Toggle from "@/app/components/Toggle";
import Skeleton from "@/app/components/Skeleton";
import Checkbox from "@/app/components/Checkbox";
import Label from "@/app/components/Label";
import Input from "@/app/components/Input";
import HelperText from "@/app/components/HelperText";
import BreadCrumb from "@/app/components/Breadcrumbs"
import Loading from "@/app/components/Loading"

const TestBtn = () => {
  return (
    <div>
      <Button variant="filled" intent="primary">
        Default
      </Button>

      <Toggle size="sm" />
      <Toggle size="md" />
      <Toggle size="lg" checked readOnly />
      <Skeleton width="200px" height="38px" />
      <div className="flex items-center gap-2">
        <Checkbox id="small" size="sm" />
        <Label htmlFor="small">Small</Label>
      </div>
      <section className="flex items-center gap-4">
        <h1>Size with Text:</h1>
        <div>
          <Label required htmlFor="">
            Email
          </Label>
          <Input type="text" size="sm" placeholder="olivia@untitledui.com" />
          <HelperText size="sm">This is a hint text to help user.</HelperText>
        </div>
        <div>
          <Label required htmlFor="">
            Email
          </Label>
          <Input type="text" size="lg" placeholder="olivia@untitledui.com" />
          <HelperText size="lg">This is a hint text to help user.</HelperText>
        </div>
      </section>
      <BreadCrumb />
      <Button>
          Loading{" "}
          <Loading
            width="15px"
            height="15px"
            variant="light"
            loaderColor="white"
          />
        </Button>
    </div>
  );
};

export default TestBtn;

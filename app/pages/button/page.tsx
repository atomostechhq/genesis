import { Button } from "@/app/components";
import { RiAlertFill, RiListCheck } from "@remixicon/react";
import React from "react";

const ButtonTest = () => {
  return (
    <div className="flex flex-col gap-5 m-5">
      <h1 className="text-display-sm text-primary-600">
        Accessible Button Test
      </h1>

      {/* Full Width */}
      <section className="my-2">
        <h1>Full width:</h1>
        <Button variant="filled" fullWidth>
          Submit Form (Full Width)
        </Button>
      </section>

      {/* Variants */}
      <section className="flex items-center gap-4 my-2">
        <h1>Variants:</h1>
        <Button variant="filled">Save (Filled)</Button>
        <Button variant="outlined">Save (Outlined)</Button>
      </section>

      {/* Disabled */}
      <section className="flex items-center gap-4 my-2">
        <h1>Disabled:</h1>
        <Button variant="filled" disabled>
          Save (Disabled)
        </Button>
        <Button variant="outlined" disabled>
          Submit (Disabled)
        </Button>
      </section>

      {/* Size */}
      <section className="flex items-center gap-4">
        <h1>Size:</h1>
        <Button variant="filled" intent="default" size="sm">
          Small Button
        </Button>
        <Button variant="filled" intent="error" size="md">
          Medium Button
        </Button>
        <Button variant="filled" intent="primary" size="lg">
          Large Button
        </Button>
        <Button variant="outlined" intent="success-outlined">
          Submit (Success Outlined)
        </Button>
      </section>

      {/* Filled States */}
      <section className="flex flex-wrap items-center gap-2">
        <h1>States Filled:</h1>
        <Button variant="filled" intent="default">
          Default Action
        </Button>
        <Button variant="filled" intent="error">
          Delete Item
        </Button>
        <Button variant="filled" intent="primary">
          Primary Action
        </Button>
        <Button variant="filled" intent="success">
          Save Changes
        </Button>
        <Button variant="filled" intent="warning">
          Warning Action
        </Button>
        <Button variant="filled" intent="blue">
          Info Blue
        </Button>
        <Button variant="filled" intent="bluegray">
          Bluegray Action
        </Button>
        <Button variant="filled" intent="bluelight">
          Light Blue Action
        </Button>
        <Button variant="filled" intent="indigo">
          Indigo Action
        </Button>
        <Button variant="filled" intent="purple">
          Purple Action
        </Button>
        <Button variant="filled" intent="violet">
          Violet Action
        </Button>
        <Button variant="filled" intent="pink">
          Pink Action
        </Button>
        <Button variant="filled" intent="rose">
          Rose Action
        </Button>
        <Button variant="filled" intent="orange">
          Orange Action
        </Button>
      </section>

      {/* Outlined States */}
      <section className="flex flex-wrap items-center gap-2">
        <h1>States Outlined:</h1>
        <Button variant="outlined" intent="default-outlined">
          Default Outlined
        </Button>
        <Button variant="outlined" intent="error-outlined">
          Error Outlined
        </Button>
        <Button variant="outlined" intent="primary-outlined">
          Primary Outlined
        </Button>
        <Button variant="outlined" intent="success-outlined">
          Success Outlined
        </Button>
        <Button variant="outlined" intent="warning-outlined">
          Warning Outlined
        </Button>
        <Button variant="outlined" intent="blue-outlined">
          Blue Outlined
        </Button>
        <Button variant="outlined" intent="bluegray-outlined">
          Bluegray Outlined
        </Button>
        <Button variant="outlined" intent="bluelight-outlined">
          Bluelight Outlined
        </Button>
        <Button variant="outlined" intent="indigo-outlined">
          Indigo Outlined
        </Button>
        <Button variant="outlined" intent="purple-outlined">
          Purple Outlined
        </Button>
        <Button variant="outlined" intent="violet-outlined">
          Violet Outlined
        </Button>
        <Button variant="outlined" intent="pink-outlined">
          Pink Outlined
        </Button>
        <Button variant="outlined" intent="rose-outlined">
          Rose Outlined
        </Button>
        <Button variant="outlined" intent="orange-outlined">
          Orange Outlined
        </Button>
      </section>

      {/* Icon Buttons */}
      <section className="flex items-center gap-4">
        <Button
          variant="filled"
          startIcon={
            <span aria-hidden="true">
              <RiAlertFill size={20} />
            </span>
          }
          endIcon={
            <span aria-hidden="true">
              <RiListCheck size={20} />
            </span>
          }
        >
          Warning With Checkmark
        </Button>

        <Button
          variant="outlined"
          startIcon={
            <span aria-hidden="true">
              <RiAlertFill size={20} />
            </span>
          }
          endIcon={
            <span aria-hidden="true">
              <RiListCheck size={20} />
            </span>
          }
        >
          Outlined Warning With Checkmark
        </Button>

        <Button
          variant="outlined"
          intent="default-outlined"
          className="border-none"
        >
          Custom Action
        </Button>

        {/* Icon-only button for testing */}
        <Button
          aria-label="Delete item"
          variant="filled"
          startIcon={<RiAlertFill aria-hidden="true" size={20} />}
        />
      </section>
    </div>
  );
};

export default ButtonTest;

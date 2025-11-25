"use client";
import { Chip } from "@/app/components";
import { RiInformationLine } from "@remixicon/react";
import React from "react";

const ChipTest = () => {
  return (
    <div className="space-y-5 m-5">
      <h1 className="text-display-sm text-primary-600">Chip Tests:</h1>
      {/* Sizes */}
      <section className="flex items-center gap-4">
        <p>Test: Sizes</p>
        <Chip
          onClick={() => {
            alert("chip clicked");
          }}
          intent="primary"
          size="sm"
        >
          chip-sm
        </Chip>
        <Chip intent="primary" size="md">
          chip-md
        </Chip>
        <Chip
          intent="primary"
          size="lg"
          endIcon={<RiInformationLine size={18} />}
        >
          chip-lg
        </Chip>
      </section>

      {/* Dots */}
      <section className="flex items-center gap-4">
        <p>Test: Dot Variants</p>
        <Chip intent="primary" dot dotColor="bg-red-400">
          chip-primary-dot
        </Chip>
        <Chip dot intent="warning">
          chip-warning-dot
        </Chip>
        <Chip dot intent="success">
          chip-success-dot
        </Chip>
        <Chip dot intent="error">
          chip-error-dot
        </Chip>
        <Chip dot intent="default">
          chip-default-dot
        </Chip>
      </section>

      {/* Without dots */}
      <section className="flex flex-wrap items-center gap-4">
        <p>Test: Without Dots</p>
        <Chip intent="primary">chip-primary</Chip>
        <Chip intent="warning" endIcon={<RiInformationLine size={18} />}>
          chip-warning
        </Chip>
        <Chip intent="success">chip-success</Chip>
        <Chip intent="error">chip-error</Chip>
        <Chip intent="default">chip-default</Chip>
        <Chip intent="bluegray">chip-bluegray</Chip>
        <Chip intent="bluelight" endIcon={<RiInformationLine size={18} />}>
          chip-bluelight
        </Chip>
        <Chip intent="violet" startIcon={<RiInformationLine size={18} />}>
          chip-violet
        </Chip>
        <Chip intent="indigo">chip-indigo</Chip>
        <Chip intent="purple">chip-purple</Chip>
        <Chip intent="pink">chip-pink</Chip>
        <Chip intent="rose">chip-rose</Chip>
        <Chip intent="orange">chip-orange</Chip>
      </section>
    </div>
  );
};

export default ChipTest;

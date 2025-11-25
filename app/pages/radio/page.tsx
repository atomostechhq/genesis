import { HelperText, Label, Radio } from "@/app/components";
import React from "react";

const RadioTest = () => {
  return (
    <div className="flex flex-col gap-1 m-5">
      <h1 className="text-display-sm text-primary-600">Radio:</h1>
      <section className="flex items-center gap-4">
        <h1>Size with Text:</h1>
        <div role="radiogroup" aria-label="Options">
          <Label htmlFor="option1" className="flex items-center gap-2">
            <Radio id="option1" name="options" />
            Option 1
          </Label>
          <Label htmlFor="option2" className="flex items-center gap-2">
            <Radio id="option2" name="options" />
            Option 2
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="radioTextLarge" size="lg" />
          <Label htmlFor="radioTextLarge" required>
            Large
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="radioTextSmall" size="sm" />
          <Label htmlFor="radioTextSmall">Small</Label>
        </div>
      </section>
      <section className="flex items-center gap-4">
        <h1>States:</h1>
        <div className="flex items-center gap-2">
          <Radio id="disable" size="lg" disabled />
          <Label disabled htmlFor="disable">
            Disabled
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Radio id="check" size="lg" readOnly checked />
          <Label htmlFor="check">Checked</Label>
        </div>
      </section>
      <section className="flex items-center gap-4">
        <h1>Radio with Text and Subtext: </h1>
        <div className="flex items-start gap-2">
          <Radio name="radioWithText" id="smallRadio" size="sm" />
          <div className="flex flex-col -mt-1">
            <Label htmlFor="smallRadio">Text with small radio button</Label>
            <HelperText size="sm">This is a helper text</HelperText>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Radio name="radioWithText" id="largeRadio" size="lg" />
          <div className="flex flex-col -mt-1">
            <Label htmlFor="largeRadio">Text with large radio button</Label>
            <HelperText size="lg">This is a helper text</HelperText>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RadioTest;

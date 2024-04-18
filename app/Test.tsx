"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "./context";
import Button from "./components/Button";
import Toggle from "./components/Toggle";
import Chip from "./components/Chip";
import TabContext, { Tab, TabList, TabPanel } from "./components/Tabs";
import AlertFillIcon from "remixicon-react/AlertFillIcon";
import ListCheckIcon from "remixicon-react/ListCheckIcon";
import { Tooltip } from "./components/Tooltip";
import ProgressBar from "./components/Progress";
import Label from "./components/Label";
import { Notice } from "./components/Notice";
import StepperContext, {
  StepperList,
  Step,
  StepContent,
  NextButton,
} from "./components/Stepper";
import Sidebar from "./components/sidebar";
import Skeleton from "./components/Skeleton";
import Checkbox from "./components/Checkbox";
import HelperText from "./components/HelperText";
import Radio from "./components/Radio";

const Test = () => {
  const { color, colors, setColor } = useAppContext();
  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  };

  // tabs
  const [activeTab, setActiveTab] = useState("tab1");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // stepper
  const [activeStep, setActiveStep] = useState(1);

  const handleStepChange = (value: any) => {
    setActiveStep(value);
  };

  // notice
  const [open, setOpen] = useState(false);

  // skeleton
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(true);
    }, 2000);
  });

  // skeleton data
  const cardBlockData = () => {
    if (loadingState) {
      return [...Array(4)].map((item, index) => {
        return (
          <div>
            <div>
              <h2>What is Lorem ?</h2>
            </div>
            <div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letra
              </p>
            </div>
          </div>
        );
      });
    } else {
      return [...Array(4)].map((index, item) => {
        return (
          <div className="cardSkeleton">
            <div className="cardSkeletonImage">
              <Skeleton width="80px" height="80px" variant="circle" />
              <Skeleton width="100%" height="20px" />
            </div>
            <div className="cardSkeletonTitle">
              <Skeleton width="100%" height="30px" />
            </div>
            <div className="cardSkeletonBody">
              <Skeleton width="250px" height="300px" />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className={["m-5", color && `theme-${color}`].join(" ")}>
      {/* select a color  */}
      <div>
        <label className="block mt-5">Select a color:</label>
        <div className="flex justify-between space-x-8 mt-2">
          {colors?.map((c: any) => (
            <label
              key={c}
              className={`${
                color === c ? "bg-primary-100 text-primary-700 ring-4" : ""
              } h-20 w-full justify-center items-center flex-wrap font-bold uppercase cursor-pointer text-[12px]`}
            >
              <input
                type="radio"
                value={c}
                checked={color === c}
                onChange={handleColorChange}
                className="hidden"
              />
              {c}
            </label>
          ))}
        </div>
      </div>
      <div
        className={[
          "flex gap-4 items-center mt-5",
          color && `theme-${color}`,
        ].join(" ")}
      >
        <span className="bg-primary-25">{color} Primary 25</span>
        <span className="bg-primary-50">{color} Primary 50</span>
        <span className="bg-primary-100">{color} Primary 100</span>
        <span className="bg-primary-200">{color} Primary 200</span>
        <span className="bg-primary-300">{color} Primary 300</span>
        <span className="bg-primary-400">{color} Primary 400</span>
        <span className="bg-primary-500">{color} Primary 500</span>
        <span className="bg-primary-600">{color} Primary 600</span>
        <span className="bg-primary-700">{color} Primary 700</span>
        <span className="bg-primary-800">{color} Primary 800</span>
        <span className="bg-primary-900">{color} Primary 900</span>
      </div>

      <Button variant="filled" onClick={() => setOpen(true)}>
        Show Notice
      </Button>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-display-sm text-primary-400">Notice:</h1>
        <Notice
          open={open}
          setOpen={setOpen}
          variant="success"
          noticeTitle="Notice Header"
          position="bottom"
        >
          This is a success Alert with an encouraging title and both icons.
        </Notice>
        {/* <Notice
          open={open}
          setOpen={setOpen}
          variant="success"
          noticeTitle="false"
          showIcon={false}
        >
          This is a success Alert with an encouraging title without icon.
        </Notice>
        <Notice
          open={open}
          setOpen={setOpen}
          variant="success"
          noticeTitle=""
          showIcon={true}
        >
          <div>
            <span>
              Lorem ipsum dolor sit amet consectetur. Imperdiet accumsan
              habitant mi mus. Morbi feugiat placerat eu aliquam aenean lobortis
              semper amet. Diam duis sit donec volutpat bibendum dolor nullam
              pharetra etiam. Aliquet lorem pulvinar egestas amet eu semper
              condimentum. Massa pharetra commodo adipiscing nulla in. Varius
              etiam adipiscing risus tempor risus velit consectetur sed mattis.
            </span>
            <Button
              variant="filled"
              startIcon={<AlertFillIcon size={16} />}
              endIcon={<ListCheckIcon size={16} />}
            >
              Filled
            </Button>
          </div>
        </Notice> */}
      </div>

      {/* Typography */}
      <div className="mt-10 flex gap-10">
        <section>
          <h1 className="text-primary-400 border-b border-primary-900 w-fit">
            Typography - Font Size
          </h1>
          <h1 className="text-display-2xl">Display 2xl</h1>
          <h1 className="text-display-xl">Display xl</h1>
          <h1 className="text-display-lg">Display lg</h1>
          <h1 className="text-display-md">Display md</h1>
          <h1 className="text-display-sm">Display sm</h1>
          <h1 className="text-display-xs">Display xs</h1>
          <h1 className="text-text-xl">Text Xl</h1>
        </section>
        <section>
          <h1 className="text-primary-400 border-b border-primary-900 w-fit">
            Typography - Font Weight
          </h1>
          <h1 className="font-regular">Regular</h1>
          <h1 className="font-medium">Medium</h1>
          <h1 className="font-semibold">Semi Bold</h1>
          <h1 className="font-bold">Bold</h1>
        </section>
      </div>
      {/* Chips  */}
      <div className="my-5 flex items-center gap-4">
        <Chip intent="primary">primary</Chip>
        <Chip intent="warning">warning</Chip>
        <Chip intent="success">success</Chip>
        <Chip intent="error">error</Chip>
        <Chip intent="default">default</Chip>
      </div>

      {/* Tooltip */}
      <div className="flex items-center gap-5 my-5">
        <h1 className="text-display-sm text-primary-400">Tooltip:</h1>
        <Tooltip
          position="top"
          content="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element."
        >
          Top
        </Tooltip>
        <Tooltip position="right" content="Right">
          Right
        </Tooltip>
        <Tooltip
          position="bottom"
          content="Tooltips are used to describe or identify an element. In most scenarios"
        >
          Bottom
        </Tooltip>
        <Tooltip position="left" content="Tooltips are used">
          Left
        </Tooltip>
      </div>
      {/* Tabs */}
      <div className="my-5">
        <h1 className="text-display-sm text-primary-400">Tabs:</h1>
        <TabContext value={activeTab} position="top" onChange={handleTabChange}>
          <TabList>
            <Tab value="tab1">
              <ListCheckIcon size={16} color="#1765dc" /> Tab 1
            </Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">
            <div className="m-4">Content for Tab 1</div>
          </TabPanel>
          <TabPanel value="tab2">
            <div className="m-4"> Content for Tab 2</div>{" "}
          </TabPanel>
          <TabPanel value="tab3">
            <div className="m-4"> Content for Tab 3 </div>
          </TabPanel>
        </TabContext>
      </div>
      {/* Buttons  */}
      <div className="flex flex-col gap-5">
        <h1 className="text-display-sm text-primary-400">Button:</h1>
        <section className="flex items-center gap-4 my-2">
          <h1>Variants:</h1>
          <Button variant="filled">Filled</Button>
          <Button variant="outlined">Outlined</Button>
        </section>
        <section className="flex items-center gap-4 my-2">
          <h1>Disabled:</h1>
          <Button variant="filled" disabled>
            Filled
          </Button>
          <Button variant="outlined" disabled>
            Outlined
          </Button>
        </section>
        <section className="flex items-center gap-4">
          <h1>Size:</h1>
          <Button variant="filled" intent={"default"} size="sm">
            Default
          </Button>
          <Button variant="filled" intent={"error"} size="md">
            Error
          </Button>
          <Button variant="filled" intent={"primary"} size="lg">
            Primary
          </Button>
        </section>
        <section className="flex items-center gap-4">
          <h1>States Filled:</h1>
          <Button variant="filled" intent={"default"}>
            Default
          </Button>
          <Button variant="filled" intent={"error"}>
            Error
          </Button>
          <Button variant="filled" intent={"primary"}>
            Primary
          </Button>
          <Button variant="filled" intent={"success"}>
            Success
          </Button>
          <Button variant="filled" intent={"warning"}>
            Warning
          </Button>
        </section>
        <section className="flex items-center gap-4">
          <h1>States Outlined:</h1>
          <Button variant="outlined" intent="default-outlined">
            Default
          </Button>
          <Button variant="outlined" intent="error-outlined">
            Error
          </Button>
          <Button variant="outlined" intent="primary-outlined">
            Primary
          </Button>
          <Button variant="outlined" intent="success-outlined">
            Success
          </Button>
          <Button variant="outlined" intent="warning-outlined">
            Warning
          </Button>
        </section>
        <section className="flex items-center gap-4">
          <Button
            variant="filled"
            startIcon={<AlertFillIcon size={16} />}
            endIcon={<ListCheckIcon size={16} />}
          >
            Filled
          </Button>
          <Button
            variant="outlined"
            startIcon={<AlertFillIcon size={16} />}
            endIcon={<ListCheckIcon size={16} />}
          >
            Outlined
          </Button>
        </section>
      </div>
      {/* progress */}
      <div className="my-5">
        <h1 className="text-display-sm text-primary-400">Progress:</h1>
        <ProgressBar
          progressColor="bg-primary-600"
          progress={30}
          progressText={`${30}%`}
        />
        <section className="w-[320px]">
          <ProgressBar
            progressColor="bg-success-300"
            progress={50}
            progressText={`${50}%`}
          />
        </section>
      </div>
      {/* toggle  */}
      <div className="flex flex-col gap-5">
        <h1 className="text-display-sm text-primary-400">Toggle:</h1>
        <section className="flex items-center gap-4">
          <h1>Size:</h1>
          <Toggle size="sm" />
          <Toggle size="md" />
          <Toggle size="lg" checked />
        </section>
        <section className="flex items-center gap-4">
          <h1>Variants:</h1>
          <Toggle size="md" intent={"primary"} />
          <Toggle size="md" intent={"success"} />
        </section>
        <section className="flex items-center gap-4">
          <h1>With Labels:</h1>
          <div className="flex items-center gap-2">
            <Label htmlFor="primary">Primary</Label>
            <Toggle size="md" id="primary" intent={"primary"} />
          </div>
          <div className="flex items-center gap-2">
            <Toggle size="md" id="success" intent={"success"} />
            <Label htmlFor="success">Success</Label>
          </div>
        </section>
      </div>
      <Button variant="filled" onClick={() => setOpen(true)}>
        Show Notice
      </Button>
      <div className="flex flex-col gap-5 my-5">
        <h1 className="text-display-sm text-primary-400">Notice:</h1>
        <Notice
          open={open}
          setOpen={setOpen}
          variant="success"
          noticeTitle="Notice Header"
          position="top"
        >
          This is a success Alert with an encouraging title and both icons.
        </Notice>
      </div>

      {/* stepper */}
      <div>
        <h1 className="text-display-sm text-primary-400">Stepper:</h1>
        <StepperContext
          value={activeStep}
          position="horizontal"
          onChange={handleStepChange}
        >
          <StepperList>
            <Step value={1}>Step 1</Step>
            <Step value={2}>Step 2</Step>
            <Step value={3}>Step 3</Step>
            <Step value={4}>Step 4</Step>
          </StepperList>
          <StepContent value={1}>content for step 1</StepContent>
          {/* <NextButton/> */}
        </StepperContext>
      </div>
      {/* <Sidebar /> */}

      {/* skeleton */}
      <div className="my-5">
      <Skeleton width="200px" height="38px" />
      <div>
        <h2>Card Skeleton</h2>
        <div className="cardBlock">{cardBlockData()}</div>
      </div>
      {/* checkbox */}
      <div className="flex flex-col gap-1">
        <h1 className="text-display-sm text-primary-400">Checkbox:</h1>
        <section className="flex items-center gap-4">
          <h1>Size with Text:</h1>
          <div className="flex items-center gap-2">
            <Checkbox id="large" size="lg" />
            <Label htmlFor="large">Large</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="small" size="sm" />
            <Label htmlFor="small">Small</Label>
          </div>
        </section>
        <section className="flex items-center gap-4">
          <h1>States:</h1>
          <div className="flex items-center gap-2">
            <Checkbox id="disable" size="lg" disabled />
            <Label htmlFor="disable">Disabled</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="check" size="lg" checked />
            <Label htmlFor="check">Checked</Label>
          </div>
        </section>
        <section className="flex items-center gap-4">
          <h1>Checkbox with Text and Subtext: </h1>
          <div className="flex items-start gap-2">
            <Checkbox  id="smallText" size="sm" />
            <div className="flex flex-col">
              <Label htmlFor="smallText">Text with small checkbox</Label>
              <HelperText size="sm">This is a helper text</HelperText>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox id="largeText" size="lg" />
            <div className="flex flex-col">
              <Label htmlFor="largeText">Text with large checkbox</Label>
              <HelperText size="lg">This is a helper text</HelperText>
            </div>
          </div>
        </section>
      </div>
      {/* Radio */}
      <div className="flex flex-col gap-1">
        <h1 className="text-display-sm text-primary-400">Radio:</h1>
        <section className="flex items-center gap-4">
          <h1>Size with Text:</h1>
          <div className="flex items-center gap-2">
            <Radio id="radioTextLarge" size="lg" />
            <Label htmlFor="radioTextLarge">Large</Label>
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
            <Label htmlFor="disable">Disabled</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="check" size="lg" checked />
            <Label htmlFor="check">Checked</Label>
          </div>
        </section>
        <section className="flex items-center gap-4">
          <h1>Radio with Text and Subtext: </h1>
          <div className="flex items-start gap-2">
            <Radio name="radioWithText"  id="smallRadio" size="sm" />
            <div className="flex flex-col">
              <Label htmlFor="smallRadio">Text with small radio button</Label>
              <HelperText size="sm">This is a helper text</HelperText>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Radio name="radioWithText" id="largeRadio" size="lg" />
            <div className="flex flex-col">
              <Label htmlFor="largeRadio">Text with large radio button</Label>
              <HelperText size="lg">This is a helper text</HelperText>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default Test;

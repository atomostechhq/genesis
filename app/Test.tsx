"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppContext } from "./context";
import Button from "./components/Button";
import Toggle from "./components/Toggle";
import Chip from "./components/Chip";
import MailLineIcon from "remixicon-react/MailLineIcon";
import TabContext, { Tab, TabList, TabPanel } from "./components/Tabs";
import AlertFillIcon from "remixicon-react/AlertFillIcon";
import ListCheckIcon from "remixicon-react/ListCheckIcon";
import Tooltip from "./components/Tooltip";
import ProgressBar from "./components/Progress";
import Label from "./components/Label";
import Notice from "./components/Notice";
import Skeleton from "./components/Skeleton";
import Checkbox from "./components/Checkbox";
import HelperText from "./components/HelperText";
import Radio from "./components/Radio";
import Stepper from "./components/Stepper";
import Input from "./components/Input";
import { cn } from "./utils/utils";
import FileUpload from "./components/FileUpload";
import Textarea from "./components/Textarea";
import Dropdown from "./components/Dropdown";
import Sidebar from "./components/Sidebar";
import LogoutBoxRLineIcon from "remixicon-react/LogoutBoxRLineIcon";
import CircleFillIcon from "remixicon-react/AddCircleFillIcon";
import BreadCrumb from "./components/Breadcrumbs";
import EmptyState, { Text, Desc, EmptyImageSVG } from "./components/EmptyState";
import Link from "next/link";
import Loading from "./components/Loading";
import Divider from "./components/Divider";
import Modal from "./components/Modal";

interface Option {
  label: string;
  value: string;
}

const Test = () => {
  const { color, colors, setColor } = useAppContext();
  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  };

  // tabs
  const [activeTab, setActiveTab] = useState("tab1");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  // label
  const handleChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
    // Validate the input value
    if (value.length < 5) {
      setError("Input must be at least 5 characters long");
    } else {
      setError("");
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // single file upload
  const [selectedFile, setSelectedFile] = useState<string[]>([]);
  const handleFileChangeSingle = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFiles([file.name]);
    }
  };

  // multiple file upload
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const handleFileChangeMultiple = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFileNames = Array.from(files).map((file) => file.name);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFileNames]);
    }
  };

  const handleDeleteFile = (fileName: string) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileName)
    );
  };

  // Stepper
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const stepsConfig = [
    {
      name: "Step One",
      helperName: "step1",
      Component: () => <div>Step 1 Component</div>,
    },
    {
      name: "Step Two",
      helperName: "step2",
      Component: () => <div>Step 2 Component</div>,
    },
    {
      name: "Step Three",
      helperName: "step3",
      Component: () => <div>Step 3 Component</div>,
    },
    {
      name: "Step Four",
      helperName: "step4",
      Component: () => <div>Step 4 Component</div>,
    },
  ];

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // dropdown

  const [multiSelect, setMultiSelect] = useState<Option[]>([]);

  const [singleSelect, setSingleSelect] = useState<Option[]>([]);

  const singleOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const multiOptions = [
    { label: "apple", value: "apple" },
    { label: "banana", value: "banana" },
    { label: "strawberry", value: "strawberry" },
    { label: "kiwi", value: "kiwi" },
    { label: "orange", value: "orange" },
    { label: "grapes", value: "grapes" },
    { label: "melon", value: "melon" },
    { label: "mango", value: "mango" },
  ];

  // notice
  const [open, setOpen] = useState(false);

  // skeleton
  const [loadingState, setLoadingState] = useState(false);

  // modal
  const [showModal, setShowModal] = useState(false);

  // sidebar
  const [collapsed, setCollapsed] = useState(false);

  // progress bar
  const [progress, setProgress] = useState(0);

  const navItems = [
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/",
          icon: <CircleFillIcon size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <AlertFillIcon size={18} />,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Setting 1",
          href: "/setting1",
          icon: <AlertFillIcon size={18} />,
        },
        {
          label: "Setting 2",
          href: "/setting2",
          icon: <CircleFillIcon size={18} />,
        },
      ],
    },
  ];

  const footerItems = [
    {
      label: "Footer Item 1",
      items: [
        {
          label: "Subitem 1",
          href: "/subitem1",
          icon: <AlertFillIcon size={18} />,
        },
        {
          label: "Subitem 2",
          href: "/subitem2",
          icon: <AlertFillIcon size={18} />,
        },
      ],
    },
    {
      label: "Footer Item 2",
      items: [
        {
          label: "Subitem 3",
          href: "/subitem3",
          icon: <AlertFillIcon size={18} />,
        },
        {
          label: "Subitem 4",
          href: "/subitem4",
          icon: <AlertFillIcon size={18} />,
        },
      ],
    },
  ];

  const info: any = ["one", "two"];

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(true);
    }, 2000);
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 2000);
    return () => clearTimeout(timer);
  }, [progress]);

  // skeleton data
  const cardBlockData = () => {
    if (loadingState) {
      return [...Array(4)].map((item, index) => {
        return (
          <div key={index}>
            <div>
              <h2>What is Lorem ?</h2>
            </div>
            <div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
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
          <div key={item} className="cardSkeleton">
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
    <div className="m-5">
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
      <div className={"flex gap-4 items-center mt-5"}>
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
          variant="default"
          noticeTitle="Notice Header"
          position="bottom"
        >
          This is a success Alert with an encouraging title and both icons.
          <section className="flex gap-2 items-center mt-3">
            <Button variant="outlined" intent="error-outlined">
              Cancel
            </Button>
            <Button>Apply</Button>
          </section>
        </Notice>
        {/* <Notice
          open={open}
          setOpen={setOpen}
          variant="success"
          noticeTitle="false"
          showIcon={false}
          position="bottom"
        >
          This is a success Alert with an encouraging title without icon.
        </Notice> */}
        {/* 
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
          <h1 className="text-text-lg">Text Lg</h1>
          <h1 className="text-text-md">Text Md</h1>
          <h1 className="text-text-sm">Text Sm</h1>
          <h1 className="text-text-xs">Text Xs</h1>
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
      {/* Dropdown  */}
      <h1 className="text-display-sm text-primary-400">Dropdown</h1>
      <div className="flex gap-10">
        <section>
          <h1 className="text-display-sm text-primary-400">
            Multiple Dropdown
          </h1>
          <Dropdown
            options={multiOptions}
            selected={multiSelect}
            setSelected={setMultiSelect}
            search={true}
            multiple={true}
            dropDownTooltip={true}
            tooltipContent="info"
            dropdownFooter={true}
            info={info?.map((i: any) => (
              <>{i}</>
            ))}
            addInfo="Awesome additional info"
            onApply={() => {
              console.log("Apply button clicked");
            }}
          />
        </section>
        <section>
          <h1 className="text-display-sm text-primary-400">Single Dropdown</h1>
          <Dropdown
            options={singleOptions}
            selected={singleSelect}
            setSelected={setSingleSelect}
            // search={true}
            multiple={false}
            info="info"
            dropDownTooltip={true}
            tooltipContent="info"
          />
        </section>
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
        <TabContext
          box={false}
          value={activeTab}
          position="top"
          onChange={handleTabChange}
        >
          <TabList>
            <Tab value="tab1">
              <ListCheckIcon size={16} /> Tab 1
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
            startIcon={<AlertFillIcon size={20} />}
            endIcon={<ListCheckIcon size={20} />}
          >
            Filled
          </Button>
          <Button
            variant="outlined"
            startIcon={<AlertFillIcon size={20} />}
            endIcon={<ListCheckIcon size={20} />}
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
          progress={progress}
          progressText={`${progress}%`}
        />
        <section className="w-[320px]">
          <ProgressBar
            progressColor="bg-success-600"
            progress={progress}
            progressText={`${progress}%`}
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
      {/* Notice  */}
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
        <div className="w-[50%] mx-auto">
          <Stepper
            stepsConfig={stepsConfig}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isComplete={isComplete}
            setIsComplete={setIsComplete}
            // position="vertical"
            position="horizontal"
          />
          <section className="my-5 flex justify-end items-center gap-4">
            <Button
              variant="outlined"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              Prev
            </Button>
            <Button variant="filled" onClick={handleNext}>
              {currentStep === stepsConfig.length ? "Finish" : "Next"}
            </Button>
          </section>
        </div>
      </div>
      {/* <Sidebar /> */}
      {/* skeleton */}
      <div className="my-5">
        <h1 className="text-display-sm text-primary-400">Skeleton:</h1>
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
              <Label disabled htmlFor="disable">
                Disabled
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="check" size="lg" checked />
              <Label htmlFor="check">Checked</Label>
            </div>
          </section>
          <section className="flex items-center gap-4">
            <h1>Checkbox with Text and Subtext: </h1>
            <div className="flex items-start gap-2">
              <Checkbox id="smallText" size="sm" />
              <div className="flex flex-col -mt-1">
                <Label htmlFor="smallText">Text with small checkbox</Label>
                <HelperText size="sm">This is a helper text</HelperText>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="largeText" size="lg" />
              <div className="flex flex-col -mt-1">
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
      </div>
      {/* <Input /> */}
      <div className="flex flex-col gap-1">
        <h1 className="text-display-sm text-primary-400">Input Field:</h1>
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
        <section className="flex items-center gap-4">
          <h1>States:</h1>
          <Input
            type="text"
            startIcon={<MailLineIcon size={16} />}
            size="lg"
            placeholder="olivia@untitledui.com"
          />
          <Input
            type="text"
            disabled
            size="lg"
            placeholder="olivia@untitledui.com"
          />
          <div>
            <Label required htmlFor="">
              Email
            </Label>
            <Input
              size="lg"
              value={inputValue}
              type="text"
              onChange={handleChange}
              endIcon={
                <ListCheckIcon
                  size={16}
                  className={cn(error && "text-error-500")}
                />
              }
              className={cn(error && "focus-within:border-error-500")}
              placeholder="olivia@untitledui.com"
            />
            {error && (
              <HelperText className="text-error-500">{error}</HelperText>
            )}
          </div>
        </section>
      </div>
      {/* File Upload */}
      <div className="flex flex-col gap-2">
        <h1 className="text-display-sm text-primary-400">File Upload</h1>
        <FileUpload
          onDelete={() => handleDeleteFile(selectedFiles[0])}
          multiple
          id="multipleFileUpload"
          selectedFile={selectedFiles}
          setSelectedFile={setSelectedFiles}
          onChange={handleFileChangeMultiple}
          title="SVG, PNG, JPG or GIF (max. 800x400px)"
        >
          <ProgressBar progressColor="bg-primary-600" progress={50} />
        </FileUpload>
      </div>
      {/* Textarea */}
      <div className="flex flex-col gap-1">
        <h1 className="text-display-sm text-primary-400">Textarea</h1>
        <section className="flex items-center gap-4">
          <h1>States</h1>
          <Textarea
            placeholder="This is a placeholder"
            rows={4}
            size="lg"
          ></Textarea>
          <Textarea
            placeholder="This is a placeholder"
            size="sm"
            disabled
          ></Textarea>
        </section>
      </div>

      <div className="my-5">
        <h1 className="text-display-sm text-primary-400">Breadcrumbs</h1>
        <BreadCrumb />
      </div>
      {/* sidebar */}
      <div className="">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
          <Sidebar.Header collapsed={collapsed} setCollapsed={setCollapsed}>
            <span>Logo</span>
          </Sidebar.Header>
          <Sidebar.Menu
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            navItems={navItems}
          />
          <Sidebar.Footer
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            navItems={footerItems}
          >
            <Divider className="my-3" />
            <Button
              className="w-full"
              variant="outlined"
              intent="default-outlined"
              startIcon={<LogoutBoxRLineIcon size={20} />}
            >
              {!collapsed ? "" : "Logout"}
            </Button>
          </Sidebar.Footer>
        </Sidebar>
      </div>
      <div className="my-5">
        <h1 className="text-display-sm text-primary-400">
          <Link href="/pages/tables">Go to Table component</Link>
        </h1>
      </div>
      <h1 className="text-display-sm text-primary-400">Divider</h1>
      <div className="w-[50%] border border-primary-600 p-5 flex justify-center gap-6 items-center">
        <Divider
          position="vertical"
          height="200px"
          className="my-4 border-primary-600"
        />
        <Divider position="horizontal" className="my-4" />
      </div>
      {/* Empty State */}
      <div>
        <EmptyState>
          <EmptyImageSVG />
          <Text>Something went wrong</Text>
          <Desc>
            We are aware of the issue and are working to fix it. Please try
            again later.
          </Desc>
          <Button intent="default-outlined" variant="outlined">
            Reload Page
          </Button>
        </EmptyState>
      </div>
      {/* Loading State */}
      <div className="flex flex-col items-center justify-center gap-2">
        <Loading width="50px" height="50px" />
        <span className="font-bold">Hold On ...</span>
        <p className="text-sm text-gray-500">
          We are running into some issues :&#40;
        </p>
        <Button>
          Loading{" "}
          <Loading
            width="15px"
            height="15px"
            variant="light"
            loaderColor="white"
          />
        </Button>
        <Button variant="outlined">
          Loading <Loading width="15px" height="15px" variant="light" />
        </Button>
      </div>
      <div className="my-5">
        <Button onClick={() => setShowModal(true)}>Show Modal</Button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={true}
        >
          <div className="w-[500px] h-[300px]">content</div>
        </Modal>
      </div>
    </div>
  );
};

export default Test;

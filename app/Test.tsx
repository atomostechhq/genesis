"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "./components/Button";
import Toggle from "./components/Toggle";
import Chip from "./components/Chip";
import {
  RiMailLine,
  RiAlertFill,
  RiListCheck,
  RiCircleFill,
  RiLogoutBoxRLine,
  RiSearch2Line,
  RiGlobalLine,
  RiInformation2Line,
  RiFilterLine,
  RiStackLine,
  RiExternalLinkLine,
  RiCheckLine,
  RiTimeFill,
  RiInformationLine,
  RiCloseLine,
  RiUpload2Line,
  RiFolderFill,
  RiFileLine,
  RiAddLine,
  RiEditLine,
  RiFolderOpenLine,
  RiFolderOpenFill,
} from "@remixicon/react";
import { TabsContainer, TabList, Tab, TabPanel } from "./components/Tabs";
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
import Link from "next/link";
import Loading from "./components/Loading";
import Divider from "./components/Divider";
import Modal from "./components/Modal";
import DropdownWithIcon from "./components/DropdownWithIcon";
import Breadcrumbs from "./components/Breadcrumb";
import CircularProgress from "./components/CircularProgress";
import Slider from "./components/Slider";
import GlobalNavigation from "./components/GlobalNavigation";
import Avatar from "./components/Avatar";
import AvatarGroup from "./components/AvatarGroup";
import Accordion, {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/Accordion";
import Callout from "./components/Callout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/MenuItem";
import Drawer from "./components/Drawer";
import FileSelector from "./components/FileSelector";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/Card";
import TreeView from "./components/TreeView";

interface Option {
  label: string | number;
  value: string | number;
}

interface DropdownOption {
  label: string | number;
  value: string | number;
  info?: string;
  addInfo?: string;
  tooltipContent?: string;
  disabledOption?: boolean;
  labelTextColor?: string;
}

const GlobalNavigationComponent = () => {
  return (
    <>
      <div>
        <p className="h-14 w-14 rounded-full text-lg border flex justify-center items-center">
          JD
        </p>
      </div>
      <div className="text-center text-gray-900">
        <p className="text-base font-semibold w-[250px] whitespace-nowrap text-ellipsis overflow-hidden block">
          John Doe
        </p>
        <HelperText
          size="sm"
          className="w-[250px] whitespace-nowrap text-ellipsis overflow-hidden block"
        >
          john.doe@email.com
        </HelperText>
      </div>
      <Divider />
      <Button
        className="w-full"
        variant="outlined"
        intent="default-outlined"
        size={"sm"}
        fullWidth
        startIcon={<RiLogoutBoxRLine size={20} />}
        onClick={() => {
          alert("Logout button clicked");
        }}
      >
        Logout
      </Button>
    </>
  );
};

const ImageSrc =
  "https://images.unsplash.com/photo-1732157582696-b5cb6c3d73bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ImageSrc2 =
  "https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Test = () => {
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

  // tabs
  const [value, setValue] = useState("1");

  const handleTabChange = (newValue: string) => {
    setValue(newValue);
  };

  // single file upload
  const [selectedSingleFiles, setSelectedSingleFiles] = useState<File[]>([]);

  const handleFileChangeSingle = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Add both file objects and file names to the state
      const newFiles = Array.from(files);
      setSelectedSingleFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDeleteFileSingle = (index: number) => {
    setSelectedSingleFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== index)
    );
  };

  // multiple file upload
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChangeMultiple = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Add both file objects and file names to the state
      const newFiles = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDeleteFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const fileMultiRef = useRef<HTMLInputElement>(null);

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      console.log("Selected file:", e.target.files[0]);
    }
  };

  const handleMultipleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("Selected files:", Array.from(e.target.files));
    }
  };

  // tabs

  // const router = useRouter();
  // const initialTab = router.query.tab;
  // const [value, setValue] = useState(initialTab || "1");

  // const handleTabChange = (newValue: string) => {
  //   setValue(newValue);
  //   router.push({ query: { tab: value } });
  // }
  // useEffect(() => {
  //   setValue(router.query.tab);
  // }, [router.query.tab]);

  // Stepper
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const stepsConfig = [
    {
      name: "Step Name One",
      helperName: "step1",
      Component: () => <div>Step 1 Component</div>,
    },
    {
      name: "Step Name Two",
      helperName: "step2",
      Component: () => <div>Step 2 Component</div>,
    },
    {
      name: "Step Name Three",
      helperName: "step3",
      Component: () => <div>Step 3 Component</div>,
    },
    {
      name: "Step Name Four",
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

  const [dropdownMenuOption, setDropdownMenuOption] = useState<
    DropdownOption[]
  >([]);

  const [dropdownMenuOptionTwo, setDropdownMenuOptionTwo] = useState<Option[]>(
    []
  );

  const singleOptions = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
  ];

  const multiOptions: DropdownOption[] = [
    {
      label: "appleeeee appleeeee",
      value: 1,
      tooltipContent: "hjsghjwg",
      disabledOption: true,
    },
    {
      label: "banana",
      value: 2,
      addInfo: "jdhjaldh",
      labelTextColor: "#1765dc",
    },
    {
      label: "strawberry",
      value: 3,
      labelTextColor: "oklch(49.6% 0.265 301.924)",
    },
    { label: "kiwi", value: 4, info: "info4" },
    {
      label: "orange",
      value: 5,
      tooltipContent: "lower-level components:",
      info: "info5",
    },
    { label: "grapes", value: 6 },
    { label: "melon", value: 7 },
    { label: "mango", value: "mango" },
  ];

  const handleReset = () => {
    setMultiSelect([]);
    setSingleSelect([]);
    alert("Reset button clicked");
  };

  // slider
  const [sliderValue, setSliderValue] = useState<number>(20);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  // global navigation
  const [isOpen, setIsOpen] = useState(false);

  // notice
  const [open, setOpen] = useState(false);

  // skeleton
  const [loadingState, setLoadingState] = useState(false);

  // modal
  const [showModal, setShowModal] = useState(false);

  // drawer
  type DrawerPosition = "top" | "right" | "bottom" | "left" | undefined;
  const [openPosition, setOpenPosition] = useState<DrawerPosition>(undefined);

  const positions: DrawerPosition[] = ["top", "right", "bottom", "left"];

  // sidebar
  const [collapsed, setCollapsed] = useState(true);

  // progress bar
  const [progress, setProgress] = useState(0);

  // tree view
  const [selected, setSelected] = useState<string | null>(null);

  const navItems = [
    {
      label: "Page",
      items: [
        {
          label: "Home",
          href: "/",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Page",
      items: [
        {
          label: "Dashboard",
          href: "/pages/dashboard",
          icon: <RiCircleFill size={18} />,
        },
        {
          label: "Team",
          href: "/pages/team",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Setting 1",
          href: "/setting1",
          icon: <RiAlertFill size={18} />,
        },
        {
          label: "Setting 2",
          href: "/setting2",
          icon: <RiCircleFill size={18} />,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Setting 1",
          href: "/setting1",
          icon: <RiAlertFill size={18} />,
        },
        {
          label: "Subitem 2",
          href: "/subitem2",
          icon: <RiAlertFill size={18} />,
        },
        {
          label: "Setting 2",
          href: "/setting2",
          icon: <RiCircleFill size={18} />,
        },
      ],
    },
  ];

  const footerItems = [
    {
      label: "Footer Item 1",
      items: [
        {
          label: "Subitem 3",
          href: "/subitem3",
          icon: <RiAlertFill size={18} />,
        },
      ],
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(true);
    }, 2000);
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 2000);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="m-5 space-y-5">
      <section className="flex gap-6 items-center">
        <h1 className="text-lg">Dropdown with icon</h1>
        <Dropdown
          options={multiOptions}
          selected={dropdownMenuOption}
          setSelected={setDropdownMenuOption}
          search={true}
          multiple={true}
          width="200px"
          id="dropdownMenuOptionOne"
          dropdownFooter={true}
          onApply={() => {
            alert("Apply button clicked");
          }}
          footerAction={
            <div className="flex justify-end items-center">
              <Button
                size="sm"
                className="h-[30px]"
                onClick={() => {
                  alert("Apply button clicked");
                }}
              >
                Custom Action
              </Button>
            </div>
          }
        />
        <DropdownWithIcon
          options={multiOptions}
          selected={dropdownMenuOptionTwo}
          setSelected={setDropdownMenuOptionTwo}
          search={true}
          multiple={true}
          width="200px"
          id="dropdownMenuOptionTwo"
          trigger={
            <RiFilterLine
              className="hover:bg-gray-200 rounded"
              cursor="pointer"
              size={14}
            />
          }
          dropdownFooter={true}
          onApply={() => {
            alert("Apply button clicked");
          }}
          footerAction={
            <div className="flex justify-end items-center">
              <Button
                size="sm"
                className="h-[30px]"
                onClick={() => {
                  alert("Apply button clicked");
                }}
              >
                Custom Action
              </Button>
            </div>
          }
        />
      </section>
      {/* Typography */}
      <div className="mt-10 flex gap-10">
        <section>
          <h1 className="text-primary-600 border-b border-primary-900 w-fit">
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
          <h1 className="text-primary-600 border-b border-primary-900 w-fit">
            Typography - Font Weight
          </h1>
          <h1 className="font-regular">Regular</h1>
          <h1 className="font-medium">Medium</h1>
          <h1 className="font-semibold">Semi Bold</h1>
          <h1 className="font-bold">Bold</h1>
        </section>
      </div>
      {/* Buttons  */}
      <div className="flex flex-col gap-5">
        <h1 className="text-display-sm text-primary-600">Button:</h1>
        <section className="my-2">
          <h1>Full width:</h1>
          <Button variant="filled" fullWidth>
            Full width
          </Button>
        </section>
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
            Size sm
          </Button>
          <Button variant="filled" intent={"error"} size="md">
            Size md
          </Button>
          <Button variant="filled" intent={"primary"} size="lg">
            Size lg
          </Button>
          <Button variant={"outlined"} intent={"success-outlined"}>
            Submit
          </Button>
        </section>
        <section className="flex items-center gap-2">
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
          <Button variant="filled" intent={"blue"}>
            Blue
          </Button>
          <Button variant="filled" intent={"bluegray"}>
            Bluegray
          </Button>
          <Button variant="filled" intent={"bluelight"}>
            Bluelight
          </Button>
          <Button variant="filled" intent={"indigo"}>
            Indigo
          </Button>
          <Button variant="filled" intent={"purple"}>
            Purple
          </Button>
          <Button variant="filled" intent={"violet"}>
            Violet
          </Button>
          <Button variant="filled" intent={"pink"}>
            Pink
          </Button>
          <Button variant="filled" intent={"rose"}>
            Rose
          </Button>
          <Button variant="filled" intent={"orange"}>
            Orange
          </Button>
        </section>
        <section className="flex items-center gap-2">
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
          <Button variant="outlined" intent={"blue-outlined"}>
            Blue
          </Button>
          <Button variant="outlined" intent={"bluegray-outlined"}>
            Bluegray
          </Button>
          <Button variant="outlined" intent={"bluelight-outlined"}>
            Bluelight
          </Button>
          <Button variant="outlined" intent={"indigo-outlined"}>
            Indigo
          </Button>
          <Button variant="outlined" intent={"purple-outlined"}>
            Purple
          </Button>
          <Button variant="outlined" intent={"violet-outlined"}>
            Violet
          </Button>
          <Button variant="outlined" intent={"pink-outlined"}>
            Pink
          </Button>
          <Button variant="outlined" intent={"rose-outlined"}>
            Rose
          </Button>
          <Button variant="outlined" intent={"orange-outlined"}>
            Orange
          </Button>
        </section>
        <section className="flex items-center gap-4">
          <Button
            variant="filled"
            startIcon={<RiAlertFill size={20} />}
            endIcon={<RiListCheck size={20} />}
          >
            Filled With Icons
          </Button>
          <Button
            variant="outlined"
            startIcon={<RiAlertFill size={20} />}
            endIcon={<RiListCheck size={20} />}
          >
            Outlined With Icons
          </Button>
          <Button
            variant={"outlined"}
            intent={"default-outlined"}
            className="border-none"
          >
            Custom Button
          </Button>
        </section>
      </div>
      {/* Chips  */}
      <div className="space-y-5">
        <h1 className="text-display-sm text-primary-600">Chip:</h1>
        <section className="flex items-center gap-4">
          <p>Chips with sizes</p>
          <Chip intent="primary" size={"sm"}>
            Size sm
          </Chip>
          <Chip intent="primary" size={"md"}>
            Size md
          </Chip>
          <Chip
            intent="primary"
            size={"lg"}
            endIcon={<RiInformationLine size={18} />}
          >
            Size lg
          </Chip>
        </section>
        <section className="flex items-center gap-4">
          <p>Chips with dot</p>
          <Chip intent="primary" dot dotColor="bg-red-400">
            primary
          </Chip>
          <Chip dot intent="warning">
            warning
          </Chip>
          <Chip dot intent="success">
            success
          </Chip>
          <Chip dot intent="error">
            error
          </Chip>
          <Chip dot intent="default">
            default
          </Chip>
        </section>
        <section className="flex flex-wrap items-center gap-4">
          <p>Chips without dot</p>
          <Chip intent="primary">primary</Chip>
          <Chip intent="warning" endIcon={<RiInformationLine size={18} />}>
            warning
          </Chip>
          <Chip intent="success">success</Chip>
          <Chip intent="error">error</Chip>
          <Chip intent="default">default</Chip>
          <Chip intent="bluegray">bluegray</Chip>
          <Chip intent="bluelight" endIcon={<RiInformationLine size={18} />}>
            bluelight
          </Chip>
          <Chip intent="violet" startIcon={<RiInformationLine size={18} />}>
            violet
          </Chip>
          <Chip intent="indigo">indigo</Chip>
          <Chip intent="purple">purple</Chip>
          <Chip intent="pink">pink</Chip>
          <Chip intent="rose">rose</Chip>
          <Chip intent="orange">orange</Chip>
        </section>
      </div>
      {/* cards */}
      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Button>Action Button</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div>
        <h1>Customised card</h1>
        <Card className="w-96 p-0 bg-yellow-50 text-green-600 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-red-600">Project Dashboard</CardTitle>
            <CardDescription>
              Manage your projects and tasks efficiently
            </CardDescription>
            <CardAction>
              <Button variant="outlined">Create New</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Active Projects: 12</p>
              <p>Completed Tasks: 45</p>
              <p>Pending Reviews: 3</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-gray-500">Last updated: Today</span>
              <Button size="sm">View All</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Toggle  */}
      <div className="flex flex-col gap-5">
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
      {/* checkbox */}
      <div className="flex flex-col gap-1">
        <h1 className="text-display-sm text-primary-600">Checkbox:</h1>
        <section className="flex items-center gap-4">
          <h1>Size with Text:</h1>
          <div className="flex items-center gap-2">
            <Checkbox id="xl" size="xl" />
            <Label htmlFor="xl">XL</Label>
          </div>
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
            <Checkbox id="check" size="lg" checked aria-readonly />
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
      {/* <Input /> */}
      <div className="flex flex-col gap-1">
        <h1 className="text-display-sm text-primary-600">Input Field:</h1>
        <section className="flex items-center gap-4">
          <h1>Size with Text:</h1>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              aria-describedby="email-hint"
              placeholder="Enter your email"
            />
            <p id="email-hint" className="text-sm text-gray-500">
              {"We'll never share your email."}
            </p>
          </div>
          <div className="w-[500px]">
            <Label required htmlFor="">
              Email
            </Label>
            <Input type="text" placeholder="olivia@untitledui.com" />
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
            startIcon={<RiMailLine size={16} />}
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
                <RiListCheck
                  size={16}
                  className={cn(error && "text-error-500")}
                />
              }
              className={cn(error && "focus-within:border-error-500")}
              placeholder="olivia@untitledui.com"
            />
            {error && <HelperText error>{error}</HelperText>}
          </div>
        </section>
      </div>
      {/* Textarea */}
      <section className="flex flex-col gap-1">
        <h1 className="text-display-sm text-primary-600">Textarea</h1>
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
      </section>
      {/* File Upload */}
      <section className="max-w-lg space-y-3">
        <h1 className="text-display-sm text-primary-600">File Upload</h1>
        <FileUpload
          id="single"
          selectedFile={selectedSingleFiles}
          setSelectedFile={setSelectedSingleFiles}
          onChange={handleFileChangeSingle}
          onDelete={handleDeleteFileSingle}
          title="SVG, PNG, JPG or GIF (max. 800x400px)"
        >
          <ProgressBar progressColor="bg-primary-600" progress={50} />
        </FileUpload>
        <FileUpload
          multiple
          id="multiple"
          selectedFile={selectedFiles}
          setSelectedFile={setSelectedFiles}
          onChange={handleFileChangeMultiple}
          onDelete={handleDeleteFile}
          title="SVG, PNG, JPG or GIF (max. 800x400px)"
          filePreviewClassName="grid grid-cols-2 gap-2"
        />
        <FileSelector
          ref={fileRef}
          id="singleselect"
          component={
            <Button
              size={"sm"}
              variant={"outlined"}
              endIcon={<RiUpload2Line size={18} />}
            >
              Upload Single File
            </Button>
          }
          onChange={handleSingleChange}
        />
        <br />
        <FileSelector
          ref={fileMultiRef}
          id="multiselect"
          component={<Button>Upload Multiple Files</Button>}
          multiple
          onChange={handleMultipleChange}
        />
      </section>
      {/* Slider */}
      <div className="space-y-6">
        <h1 className="text-display-sm text-primary-600">Slider:</h1>
        <Slider
          value={sliderValue}
          min={10}
          max={100}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
        />
        <Slider
          value={sliderValue}
          min={10}
          step={10}
          max={100}
          size="lg"
          onChange={(e) => handleSliderChange(Number(e.target.value))}
        />
      </div>
      {/* tree view */}
      <section className="my-5 w-1/2 border p-5">
        <h1 className="text-display-sm text-primary-600">Tree View:</h1>
        <TreeView aria-label="Project files" defaultExpandedIds={["frontend"]}>
          {/* FRONTEND SECTION */}
          <TreeView.Item
            id="frontend"
            onSelect={setSelected}
            selected={selected === "frontend"}
          >
            <TreeView.LeadingVisual>
              <RiAlertFill />{" "}
            </TreeView.LeadingVisual>{" "}
            Frontend
            <TreeView.SubTree>
              <TreeView.Item
                id="frontend-react"
                onSelect={setSelected}
                selected={selected === "frontend-react"}
              >
                React App
                <TreeView.SubTree>
                  <TreeView.Item
                    id="frontend-react-components"
                    onSelect={setSelected}
                    selected={selected === "frontend-react-components"}
                  >
                    <TreeView.LeadingVisual>
                      <RiAlertFill />{" "}
                    </TreeView.LeadingVisual>{" "}
                    Components
                    <TreeView.SubTree>
                      <TreeView.Item
                        id="frontend-react-components-button"
                        onSelect={setSelected}
                        selected={
                          selected === "frontend-react-components-button"
                        }
                      >
                        <Button
                          onClick={() => {
                            alert("clicked");
                          }}
                        >
                          Click
                        </Button>
                      </TreeView.Item>
                      <TreeView.Item
                        id="frontend-react-components-modal"
                        onSelect={setSelected}
                        selected={
                          selected === "frontend-react-components-modal"
                        }
                      >
                        Modal
                      </TreeView.Item>
                    </TreeView.SubTree>
                  </TreeView.Item>

                  <TreeView.Item
                    id="frontend-react-hooks"
                    onSelect={setSelected}
                    selected={selected === "frontend-react-hooks"}
                  >
                    Hooks
                  </TreeView.Item>
                  <TreeView.Item
                    id="frontend-react-context"
                    onSelect={setSelected}
                    selected={selected === "frontend-react-context"}
                  >
                    Context
                  </TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>

              <TreeView.Item
                id="frontend-next"
                onSelect={setSelected}
                selected={selected === "frontend-next"}
              >
                Next.js App
                <TreeView.SubTree>
                  <TreeView.Item
                    id="frontend-next-pages"
                    onSelect={setSelected}
                    selected={selected === "frontend-next-pages"}
                  >
                    Pages
                  </TreeView.Item>
                  <TreeView.Item
                    id="frontend-next-api"
                    onSelect={setSelected}
                    selected={selected === "frontend-next-api"}
                  >
                    API Routes
                  </TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>

          {/* BACKEND SECTION */}
          <TreeView.Item
            id="backend"
            onSelect={setSelected}
            selected={selected === "backend"}
          >
            Backend
            <TreeView.SubTree>
              <TreeView.Item
                id="backend-api"
                onSelect={setSelected}
                selected={selected === "backend-api"}
              >
                API Routes
                <TreeView.SubTree>
                  <TreeView.Item
                    id="backend-api-auth"
                    onSelect={setSelected}
                    selected={selected === "backend-api-auth"}
                  >
                    Auth
                  </TreeView.Item>
                  <TreeView.Item
                    id="backend-api-users"
                    onSelect={setSelected}
                    selected={selected === "backend-api-users"}
                  >
                    Users
                  </TreeView.Item>
                  <TreeView.Item
                    id="backend-api-products"
                    onSelect={setSelected}
                    selected={selected === "backend-api-products"}
                  >
                    Products
                  </TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>

              <TreeView.Item
                id="backend-database"
                onSelect={setSelected}
                selected={selected === "backend-database"}
              >
                Database
                <TreeView.SubTree>
                  <TreeView.Item
                    id="backend-database-models"
                    onSelect={setSelected}
                    selected={selected === "backend-database-models"}
                  >
                    Models
                  </TreeView.Item>
                  <TreeView.Item
                    id="backend-database-migrations"
                    onSelect={setSelected}
                    selected={selected === "backend-database-migrations"}
                  >
                    Migrations
                  </TreeView.Item>
                  <TreeView.Item
                    id="backend-database-seeds"
                    onSelect={setSelected}
                    selected={selected === "backend-database-seeds"}
                  >
                    Seeds
                  </TreeView.Item>
                </TreeView.SubTree>
              </TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>
        </TreeView>
      </section>
      <Divider />
      <section>
        <TreeView aria-label="Files changed" defaultExpandedIds={["src"]}>
          <TreeView.Item
            id="src"
            onSelect={setSelected}
            selected={selected === "src"}
          >
            <TreeView.LeadingVisual>
              <RiFolderOpenFill color="#1765dc" size={16} />
            </TreeView.LeadingVisual>
            src
            <TreeView.SubTree>
              <TreeView.Item
                id="src/Avatar.tsx"
                onSelect={setSelected}
                selected={selected === "src/Avatar.tsx"}
              >
                <TreeView.LeadingVisual>
                  <RiFileLine size={16} />
                </TreeView.LeadingVisual>
                Avatar.tsx
                <TreeView.TrailingVisual label="Added">
                  <RiAddLine size={16} />
                </TreeView.TrailingVisual>
              </TreeView.Item>

              <TreeView.Item
                id="src/Button.tsx"
                onSelect={setSelected}
                selected={selected === "src/Button.tsx"}
              >
                <TreeView.LeadingVisual>
                  <RiFileLine size={16} />
                </TreeView.LeadingVisual>
                Button.tsx
                <TreeView.TrailingVisual label="Modified">
                  <RiEditLine size={16} />
                </TreeView.TrailingVisual>
              </TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>

          <TreeView.Item
            id="package.json"
            onSelect={setSelected}
            selected={selected === "package.json"}
          >
            <TreeView.LeadingVisual>
              <RiFileLine size={16} />
            </TreeView.LeadingVisual>
            package.json
            <TreeView.TrailingVisual label="Modified">
              <RiEditLine size={16} />
            </TreeView.TrailingVisual>
          </TreeView.Item>
        </TreeView>
      </section>
      <section className="my-5">
        <h1>Allow multiple expanded (default)</h1>
        <TreeView aria-label="Example Tree" expandTopLevelByDefault>
          <TreeView.Item id="1">
            Parent 1
            <TreeView.SubTree>
              <TreeView.Item id="1.1">Child 1</TreeView.Item>
              <TreeView.Item id="1.2">Child 2</TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>

          <TreeView.Item id="2">
            Parent 2
            <TreeView.SubTree>
              <TreeView.Item id="2.1">Child A</TreeView.Item>
              <TreeView.Item id="2.2">Child B</TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>
        </TreeView>
      </section>
      <Divider />
      <section className="my-5">
        <h1>Accordion Mode (only one expanded)</h1>
        <TreeView aria-label="Accordion Tree" allowMultiple={false}>
          <TreeView.Item id="1">
            Section 1
            <TreeView.SubTree>
              <TreeView.Item id="1.1">Item A</TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>
          <TreeView.Item id="2">
            Section 2
            <TreeView.SubTree>
              <TreeView.Item id="2.1">Item B</TreeView.Item>
            </TreeView.SubTree>
          </TreeView.Item>
        </TreeView>
      </section>
      <Divider />

      {/* table */}
      <section className="my-5">
        <h1 className="text-display-sm text-primary-600">
          <Link href="/pages/tables" className="flex items-center gap-2">
            Go to Table component <RiExternalLinkLine />
          </Link>
        </h1>
      </section>
      {/* Modal */}
      <section className="my-5">
        <h1 className="text-display-sm text-primary-600">Modal:</h1>
        <Button onClick={() => setShowModal(true)}>Show Modal</Button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          closeModal={true}
          closeOnOutsideClick={true}
          width="60%"
        >
          <div className="max-w-[500px]">
            Content
            <Tooltip
              position="right"
              className="text-success-500 max-w-[900px]"
              content="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element."
            >
              Top
            </Tooltip>
          </div>
        </Modal>
      </section>
      {/* Drawer */}
      <section className="my-5 space-y-4">
        <h1 className="text-display-sm text-primary-600">Drawer:</h1>

        <div className="flex gap-3 flex-wrap">
          {positions.map((pos) => (
            <Button key={pos} onClick={() => setOpenPosition(pos)}>
              Show {pos} Drawer
            </Button>
          ))}
        </div>

        {positions.map((pos) => (
          <Drawer
            key={pos}
            isOpen={openPosition === pos}
            setIsOpen={(isOpen) => {
              if (!isOpen) setOpenPosition(undefined);
            }}
            closeOnOutsideClick={false}
            position={pos}
            width={pos === "left" || pos === "right" ? "w-[500px]" : undefined}
            height={pos === "top" || pos === "bottom" ? "h-[500px]" : undefined}
          >
            <p>This is a {pos} drawer.</p>
            <p>You can change its position, width, and height using props.</p>
          </Drawer>
        ))}
      </section>
      {/* Dropdown  */}
      <h1 className="text-display-sm text-primary-600">Dropdown</h1>

      <section className="flex items-start gap-10">
        <div>
          <h1 className="">Dropdown with icon</h1>
          <DropdownWithIcon
            options={multiOptions}
            selected={multiSelect}
            setSelected={setMultiSelect}
            search={true}
            multiple={true}
            dropdownText={`Selected ${multiSelect?.length} items`}
            width="200px"
            trigger={
              <RiFilterLine
                className="hover:bg-gray-200 rounded"
                cursor="pointer"
                size={14}
              />
            }
            // dropdownMenu={dropdownMenu}
            // setDropdownMenu={setDropdownMenu}
          />
        </div>
        <div>
          <h1>Dropdown with icon</h1>
          <DropdownWithIcon
            options={multiOptions}
            selected={multiSelect}
            setSelected={setMultiSelect}
            search={true}
            multiple={true}
            width="100px"
            trigger={<span>dropdown</span>}
            onReset={handleReset}
          />
        </div>
        <div>
          <h1 className="text-lg">Multiple Dropdown</h1>
          <Dropdown
            options={[
              { label: "High", value: "High", disabledOption: true },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" },
              { label: "High", value: "High" },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" },
              { label: "High", value: "High" },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" },
            ]}
            selected={multiSelect}
            setSelected={setMultiSelect}
            width="300px"
            icon={<RiGlobalLine size={16} />}
            dropdownText="Test Test"
            multiple
            search
            position="bottom"
            onApply={() => {
              alert("Apply button clicked");
            }}
            onReset={handleReset}
          />
        </div>
        <div>
          <h1 className="text-lg">Single Dropdown Language</h1>
          <Dropdown
            options={singleOptions}
            selected={singleSelect}
            icon={<RiGlobalLine size={16} />}
            setSelected={setSingleSelect}
            dropdownText="single text"
            info="info"
          />
        </div>
        <div>
          <h1 className="text-lg">Disabled Dropdown</h1>
          <Dropdown
            options={singleOptions}
            selected={singleSelect}
            setSelected={setSingleSelect}
            multiple={false}
            info="info"
            disabled={true}
          />
        </div>
        <div className="ml-10">
          <DropdownWithIcon
            options={multiOptions}
            selected={multiSelect}
            setSelected={setMultiSelect}
            search={true}
            multiple={true}
            width="100px"
            position="right"
            trigger={
              <RiFilterLine
                className="hover:bg-gray-200 rounded"
                cursor="pointer"
                size={14}
              />
            }
          />
        </div>
      </section>
      {/* Menu Items */}
      <section className="p-5">
        <h1 className="text-display-sm text-primary-600">MenuItems:</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outlined">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <div className="grid grid-cols-2 gap-4 p-8">
        {/* Top-Left */}
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outlined">Top</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              // align="start"
              // side="top"
              sideOffset={5}
            >
              <DropdownMenuLabel>Top Position</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">Bottom</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                side="bottom"
                sideOffset={5}
              >
                <DropdownMenuLabel>Bottom Position</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">Left</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                side="left"
                sideOffset={5}
              >
                <DropdownMenuLabel>Left Position</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">Right</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                side="right"
                sideOffset={5}
              >
                <DropdownMenuLabel>Right Position</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">Center</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="center"
                side="bottom"
                sideOffset={5}
              >
                <DropdownMenuLabel>Center Aligned</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">End</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="end"
                side="bottom"
                sideOffset={5}
              >
                <DropdownMenuLabel>End Aligned</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">Large Offset</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="start"
                side="bottom"
                sideOffset={20}
              >
                <DropdownMenuLabel>Large Offset (20px)</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outlined">Wide Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80"
                align="start"
                side="bottom"
                sideOffset={5}
              >
                <DropdownMenuLabel>Wide Menu (320px)</DropdownMenuLabel>
                <DropdownMenuItem>Profile with very long text</DropdownMenuItem>
                <DropdownMenuItem>Settings with extra content</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Invite users with long text
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email invitation</DropdownMenuItem>
                    <DropdownMenuItem>Message invitation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More options...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Invite users with long text
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email invitation</DropdownMenuItem>
                    <DropdownMenuItem>Message invitation</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More options...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div>
        <h1 className="text-display-sm text-primary-600">Tabs</h1>
        <section className="my-5">
          <h1 className="text-lg">Default Tabs</h1>
          <TabsContainer value={value}>
            <TabList
              onChange={handleTabChange}
              ariaLabel="lab API tabs example"
              box={false}
            >
              <Tab
                label="Item One"
                content="(12)"
                icon={<RiSearch2Line size={16} />}
                value="1"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
              <Tab
                label="Item Two"
                value="2"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
              <Tab
                label="Item Three"
                value="3"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
            </TabList>
            <TabPanel value="1" currentValue={value}>
              Item One Content
            </TabPanel>
            <TabPanel value="2" currentValue={value}>
              Item Two Content
            </TabPanel>
            <TabPanel value="3" currentValue={value}>
              Item Three Content
            </TabPanel>
          </TabsContainer>
        </section>

        <section>
          <TabsContainer
            value={value}
            position="vertical"
            className="flex gap-4"
          >
            <TabList
              onChange={handleTabChange}
              ariaLabel="Vertical tabs example"
              position="vertical"
              className="w-48"
            >
              <Tab
                label="Item One"
                value="1"
                onChange={handleTabChange}
                selectedTabValue={value}
                position="vertical"
              />
              <Tab
                label="Item Two"
                value="2"
                onChange={handleTabChange}
                selectedTabValue={value}
                position="vertical"
              />
            </TabList>
            <div className="flex-1">
              <TabPanel value="1" currentValue={value}>
                Item One Content
              </TabPanel>
              <TabPanel value="2" currentValue={value}>
                Item Two Content
              </TabPanel>
            </div>
          </TabsContainer>
        </section>
        <section className="my-5">
          <h1 className="text-lg">Tab with box variant</h1>
          <TabsContainer value={value}>
            <TabList
              onChange={handleTabChange}
              ariaLabel="lab API tabs example"
              box={true}
            >
              <Tab
                label="Item One"
                value="1"
                content="(12)"
                icon={<RiSearch2Line size={16} />}
                onChange={handleTabChange}
                selectedTabValue={value}
              />
              <Tab
                label="Item Two"
                value="2"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
              <Tab
                label="Item Three"
                value="3"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
            </TabList>
            <TabPanel value="1" currentValue={value}>
              Item One Content
            </TabPanel>
            <TabPanel value="2" currentValue={value}>
              Item Two Content
            </TabPanel>
            <TabPanel value="3" currentValue={value}>
              Item Three Content
            </TabPanel>
          </TabsContainer>
        </section>
        <section className="my-5">
          <h1 className="text-lg">Tab with pill variant</h1>
          <TabsContainer value={value}>
            <TabList
              onChange={handleTabChange}
              ariaLabel="lab API tabs example"
              pill={true}
            >
              <Tab
                label="Item One"
                value="1"
                content="(12)"
                icon={<RiSearch2Line size={16} />}
                onChange={handleTabChange}
                selectedTabValue={value}
              />
              <Tab
                label="Item Two"
                value="2"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
              <Tab
                label="Item Three"
                value="3"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
            </TabList>
            <TabPanel value="1" currentValue={value}>
              Item One Content
            </TabPanel>
            <TabPanel value="2" currentValue={value}>
              Item Two Content
            </TabPanel>
            <TabPanel value="3" currentValue={value}>
              Item Three Content
            </TabPanel>
          </TabsContainer>
        </section>
        <section className="my-5">
          <h1 className="text-lg">Custom styling for Tabs:</h1>
          <TabsContainer value={value}>
            <TabList
              onChange={handleTabChange}
              ariaLabel="lab API tabs example"
              className="border-none"
            >
              <Tab
                label="Item One"
                value="1"
                // icon={<RiSearch2Line size={16} />}
                onChange={handleTabChange}
                selectedTabValue={value}
                className="bg-primary-600 text-white rounded-2xl hover:bg-primary-100 hover:text-black border-b-0 hover:rounded-2xl"
              />
              <Tab
                label="Item Two"
                value="2"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
              <Tab
                label="Item Three"
                value="3"
                onChange={handleTabChange}
                selectedTabValue={value}
              />
            </TabList>
            <TabPanel value="1" currentValue={value}>
              Item One Content
            </TabPanel>
            <TabPanel value="2" currentValue={value}>
              Item Two Content
            </TabPanel>
            <TabPanel value="3" currentValue={value}>
              Item Three Content
            </TabPanel>
          </TabsContainer>
        </section>
      </div>
      {/* notice */}
      <section className="flex flex-col w-fit">
        <h1 className="text-display-sm text-primary-600">Notice:</h1>
        <Button variant="filled" onClick={() => setOpen(true)}>
          Show Notice
        </Button>
        <Notice
          open={open}
          setOpen={setOpen}
          variant="warning"
          noticeTitle="Notice Header"
          position="center"
        >
          This is a success Alert with an encouraging title and both icons.
          <section className="flex gap-2 items-center mt-3">
            <Button variant="outlined" intent="error-outlined">
              Cancel
            </Button>
            <Button>Apply</Button>
          </section>
        </Notice>
        <Notice
          open={open}
          setOpen={setOpen}
          variant="warning"
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
        <Notice
          open={open}
          setOpen={setOpen}
          variant="success"
          noticeTitle="Notice Header"
          position="top"
        >
          This is a success Alert with an encouraging title and both icons.
        </Notice>
      </section>
      {/* progress */}
      <section className="my-5 w-[500px]">
        <h1 className="text-display-sm text-primary-600">Progress:</h1>
        <ProgressBar
          progressColor="bg-success-600"
          progress={progress}
          progressText={"Progress text on top"}
          progressTextPosition="top"
        />
        <ProgressBar
          progressColor="bg-primary-600"
          progress={progress}
          progressText={"Progress text on right"}
          progressTextPosition="right"
        />
        <ProgressBar
          progressColor="bg-success-600"
          progress={20}
          progressText={"Progress text on left"}
          progressTextPosition="left"
        />
        <ProgressBar
          progressColor="bg-success-600"
          progress={progress}
          progressText={"Progress text on bottom"}
          progressTextPosition="bottom"
        />
      </section>
      {/* Circular Progress */}
      <section className="my-5">
        <h1 className="text-display-sm text-primary-600">Circular Progress:</h1>
        <div className="flex items-center gap-5 py-10">
          <CircularProgress size={50} strokeWidth={4} percentage={50} />
          <CircularProgress size={90} strokeWidth={10} percentage={70} />
          <CircularProgress
            size={120}
            strokeWidth={8}
            percentage={60}
            text="60%"
            textClassName="text-primary-600 font-semibold"
          />
        </div>
      </section>
      {/* Callout */}
      <section className="my-5 space-y-4">
        <h1 className="text-display-sm text-primary-600">Callout:</h1>
        <div className="space-y-3">
          <h1 className="text-display-xs text-primary-600">Filled:</h1>
          <Callout
            size={"xs"}
            startIcon={<RiInformationLine size={18} />}
            endIcon={<RiCloseLine size={18} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"sm"}
            intent={"warning"}
            startIcon={<RiInformationLine size={18} />}
            endIcon={<RiCloseLine size={18} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"md"}
            intent={"error"}
            startIcon={<RiInformationLine size={20} />}
            endIcon={<RiCloseLine size={20} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"lg"}
            intent={"success"}
            startIcon={<RiInformationLine size={20} />}
            endIcon={<RiCloseLine size={20} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"lg"}
            intent={"default"}
            startIcon={<RiInformationLine size={20} />}
            endIcon={<RiCloseLine size={20} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <h1 className="text-display-xs text-primary-600">Outlined:</h1>
          <Callout
            size={"xs"}
            variant={"outlined"}
            startIcon={<RiInformationLine size={18} />}
            endIcon={<RiCloseLine size={18} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"sm"}
            variant={"outlined"}
            intent={"warning"}
            startIcon={<RiInformationLine size={18} />}
            endIcon={<RiCloseLine size={18} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"md"}
            variant={"outlined"}
            intent={"error"}
            startIcon={<RiInformationLine size={20} />}
            endIcon={<RiCloseLine size={20} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"lg"}
            variant={"outlined"}
            intent={"success"}
            startIcon={<RiInformationLine size={20} />}
            endIcon={
              <Button
                size={"sm"}
                intent={"success"}
                className="whitespace-nowrap"
              >
                Contact Admin
              </Button>
            }
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
          <Callout
            size={"lg"}
            variant={"outlined"}
            intent={"default"}
            startIcon={<RiInformationLine size={20} />}
            endIcon={<RiCloseLine size={20} />}
          >
            Access denied. Please contact the network administrator to view this
            page.
          </Callout>
        </div>
      </section>
      {/* Tooltip */}
      <section className="flex items-center gap-5 my-5">
        <h1 className="text-display-sm text-primary-600">Tooltip:</h1>
        <Tooltip
          position="top"
          className="text-success-500 max-w-[900px]"
          content="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element."
        >
          Top
        </Tooltip>
        <Tooltip
          position="right"
          content=" Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Laborum incidunt perferendis
          sapiente eos? Error aut accusamus odio officiis eaque
          consectetur obcaecati doloribus, inventore ut reiciendis maiores
          facere veritatis, corrupti autem illo deleniti eveniet
          repudiandae iste harum. Voluptate minima ab tenetur veritatis
          neque dolorem voluptates, praesentium a, velit doloremque
          impedit facilis vel exercitationem assumenda. Esse labore
          mollitia enim beatae officia? Delectus exercitationem voluptatem
          consectetur quae veniam odit ut explicabo voluptas. Doloremque
          nesciunt deleniti aliquam quibusdam nulla ipsa repudiandae
          aspernatur placeat fuga officia. Natus itaque inventore eligendi
          eveniet, nemo saepe voluptatum et ducimus provident suscipit
          dolore, incidunt esse est iusto consequatur reprehenderit."
        >
          Right
        </Tooltip>
        <Tooltip
          position="right"
          content={
            <div>
              <h1 className="font-semibold text-xs">This is a tooltip</h1>
              <p className="font-normal text-xs">
                Tooltips are used to describe or identify an element. In most
                scenarios, tooltips help the user understand the meaning,
                function or alt-text of an element.
              </p>
            </div>
          }
        >
          <RiInformation2Line size={15} />
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
      </section>
      {/* Avatar */}
      <section className="my-10 space-y-2">
        <h1 className="text-display-sm text-primary-600">Avatar:</h1>
        <div className="flex items-center gap-5">
          <Avatar
            type="text"
            size="sm"
            className="border border-gray-300 rounded-full"
            text="RV"
          />
          <Avatar
            border
            borderColor="var(--primary-500)"
            className="bg-primary-50"
            borderWidth="2px"
            rounded
            type="text"
            size="md"
            disabled
            text="Riya Vishwakarma"
          />
          <Avatar border rounded type="text" size="lg" text="RV" />
          <Avatar
            border
            rounded
            type="icon"
            size="sm"
            className="text-gray-600"
            icon={<RiLogoutBoxRLine size={14} />}
          />
          <Avatar
            type="image"
            size="sm"
            src={ImageSrc}
            alt="avatar"
            rounded
            statusIcon={
              <RiTimeFill
                size={14}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            type="image"
            size="md"
            border
            rounded
            onClick={() => alert("clicked")}
            borderWidth="2px"
            src={ImageSrc}
            className="cursor-pointer"
            borderColor="var(--success-500)"
            alt="avatar"
            statusIcon={
              <RiCheckLine
                size={16}
                className="bg-success-500 rounded-full text-white"
              />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="lg"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={18} className="text-error-500 rounded-full" />
            }
            statusPosition="bottom-right"
          />
        </div>
        <h1 className="text-display-sm text-primary-600">
          Avatar Positions/Size:
        </h1>
        <div className="flex items-center gap-5">
          <h2 className="text-display-sm text-primary-600">Avatar Small:</h2>
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="sm"
            rounded
            statusIcon={
              <RiTimeFill
                size={14}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            type="icon"
            size="sm"
            icon={<RiCheckLine />}
            border
            rounded
            onClick={() => alert("clicked")}
            borderWidth="2px"
            className="cursor-pointer"
            borderColor="var(--success-500)"
            statusIcon={
              <RiCheckLine
                size={14}
                className="bg-success-500 rounded-full text-white"
              />
            }
            statusPosition="top-right"
          />
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="sm"
            rounded
            statusIcon={
              <RiTimeFill
                size={14}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="bottom-left"
          />
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="sm"
            rounded
            statusIcon={
              <RiTimeFill
                size={14}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="top-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="sm"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={14} className="text-error-500 rounded-full" />
            }
            statusPosition="bottom-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="sm"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={14} className="text-error-500 rounded-full" />
            }
            statusPosition="top-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="sm"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={14} className="text-error-500 rounded-full" />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="sm"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={14} className="text-error-500 rounded-full" />
            }
            statusPosition="top-right"
          />
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-display-sm text-primary-600">Avatar Medium:</h2>
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="md"
            rounded
            statusIcon={
              <RiTimeFill
                size={16}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            type="icon"
            size="md"
            icon={<RiCheckLine />}
            border
            rounded
            onClick={() => alert("clicked")}
            borderWidth="2px"
            className="cursor-pointer"
            borderColor="var(--success-500)"
            statusIcon={
              <RiCheckLine
                size={16}
                className="bg-success-500 rounded-full text-white"
              />
            }
            statusPosition="top-right"
          />
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="md"
            rounded
            statusIcon={
              <RiTimeFill
                size={16}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="bottom-left"
          />
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="md"
            rounded
            statusIcon={
              <RiTimeFill
                size={16}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="top-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="md"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={16} className="text-error-500 rounded-full" />
            }
            statusPosition="bottom-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="md"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={16} className="text-error-500 rounded-full" />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="md"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={16} className="text-error-500 rounded-full" />
            }
            statusPosition="top-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="md"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={16} className="text-error-500 rounded-full" />
            }
            statusPosition="top-right"
          />
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-display-sm text-primary-600">Avatar Large:</h2>
          <Avatar
            type="icon"
            size="lg"
            icon={<RiCheckLine />}
            border
            rounded
            onClick={() => alert("clicked")}
            borderWidth="2px"
            className="cursor-pointer"
            borderColor="var(--success-500)"
            statusIcon={
              <RiCheckLine
                size={18}
                className="bg-success-500 rounded-full text-white"
              />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            type="icon"
            size="lg"
            icon={<RiCheckLine />}
            border
            rounded
            onClick={() => alert("clicked")}
            borderWidth="2px"
            className="cursor-pointer"
            borderColor="var(--success-500)"
            statusIcon={
              <RiCheckLine
                size={18}
                className="bg-success-500 rounded-full text-white"
              />
            }
            statusPosition="top-right"
          />
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="lg"
            rounded
            statusIcon={
              <RiTimeFill
                size={18}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="bottom-left"
          />
          <Avatar
            type="text"
            text="AV"
            border
            borderColor="var(--primary-500)"
            borderWidth="2px"
            size="lg"
            rounded
            statusIcon={
              <RiTimeFill
                size={18}
                className="text-warning-400 bg-white rounded-full"
              />
            }
            statusPosition="top-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="lg"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={18} className="text-error-500 rounded-full" />
            }
            statusPosition="bottom-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="lg"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={18} className="text-error-500 rounded-full" />
            }
            statusPosition="bottom-right"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="lg"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={18} className="text-error-500 rounded-full" />
            }
            statusPosition="top-left"
          />
          <Avatar
            src={ImageSrc}
            type="image"
            size="lg"
            rounded
            border
            borderColor="var(--error-300)"
            borderWidth="2px"
            alt="avatar"
            statusIcon={
              <RiCircleFill size={18} className="text-error-500 rounded-full" />
            }
            statusPosition="top-right"
          />
        </div>
        <AvatarGroup
          avatars={[
            {
              type: "image",
              src: ImageSrc2,
              rounded: true,
              border: true,
              borderWidth: "2px",
              borderColor: "var(--primary-500)",
            },
            {
              type: "image",
              src: ImageSrc2,
              rounded: true,
              border: true,
              borderWidth: "2px",
              borderColor: "var(--primary-500)",
            },
            {
              type: "image",
              src: ImageSrc2,
              rounded: true,
              border: true,
              borderWidth: "2px",
              borderColor: "var(--primary-500)",
            },
            {
              type: "image",
              src: ImageSrc2,
              rounded: true,
              border: true,
              borderWidth: "2px",
              borderColor: "var(--primary-500)",
            },
            {
              type: "image",
              src: ImageSrc2,
              rounded: true,
              border: true,
              borderWidth: "2px",
              borderColor: "var(--primary-500)",
            },
            {
              type: "image",
              src: ImageSrc2,
              rounded: true,
              border: true,
              borderWidth: "2px",
              borderColor: "var(--primary-500)",
            },
          ]}
          size="md"
          max={4}
        />
      </section>
      {/* Accordion */}
      <section className="space-y-5">
        <h1 className="text-display-sm text-primary-600">Accordion:</h1>
        <div className="space-y-2">
          <h2>Accordion Single</h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1">
              <AccordionTrigger defaultOpen={true}>
                <p className="">
                  {" "}
                  What is your favorite template from BRIX Templates?
                </p>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-6 border">
                  {` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.`}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger defaultOpen={true}>
                Is it styled?
              </AccordionTrigger>
              <AccordionContent>
                {` Yes. It comes with default styles that match the other components'
              aesthetic.`}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger defaultOpen={true}>
                Is it animated?
              </AccordionTrigger>
              <AccordionContent>
                {` Yes. It's animated by default, but you can disable it if you
              prefer.`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="space-y-2">
          <h2>Accordion Multiple</h2>
          <Accordion type="multiple" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1">
              <AccordionTrigger
                className="text-yellow-500"
                triggerIcon={<RiAlertFill />}
              >
                What is your favorite template from BRIX Templates?
              </AccordionTrigger>
              <AccordionContent>
                {` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.`}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                {` Yes. It comes with default styles that match the other components'
              aesthetic.`}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger defaultOpen={true}>
                Is it animated?
              </AccordionTrigger>
              <AccordionContent>
                {` Yes. It's animated by default, but you can disable it if you
              prefer.`}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      {/* Global Navigation */}
      <section className="my-5">
        <h1 className="text-display-sm text-primary-600">Global Navigation:</h1>
        <div className="flex items-center w-full justify-evenly">
          <GlobalNavigation
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            postion="bottom-left"
            trigger={
              <p className="h-14 w-14 rounded-full text-lg border flex justify-center items-center">
                JD
              </p>
            }
            className="max-w-[270px] p-4 flex flex-col gap-4 justify-center items-center"
          >
            <GlobalNavigationComponent />
          </GlobalNavigation>
          {/* <GlobalNavigation
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            postion="top-left"
            trigger={<Avatar type="text" border rounded text="John Doe" />}
            className="max-w-[270px] p-4 flex flex-col gap-4 justify-center items-center"
          >
            <GlobalNavigationComponent />
          </GlobalNavigation>
          <GlobalNavigation
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            postion="bottom-right"
            trigger={<Avatar type="text" border rounded text="John Doe" />}
            className="max-w-[270px] p-4 flex flex-col gap-4 justify-center items-center"
          >
            <GlobalNavigationComponent />
          </GlobalNavigation>
          <GlobalNavigation
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            postion="top-right"
            trigger={<Avatar type="text" border rounded text="John Doe" />}
            className="max-w-[270px] p-4 flex flex-col gap-4 justify-center items-center"
          >
            <GlobalNavigationComponent />
          </GlobalNavigation> */}
        </div>
      </section>
      {/* skeleton */}
      <section className="my-5">
        <h1 className="text-display-sm text-primary-600">Skeleton:</h1>
        <div className="flex flex-col gap-2">
          {/* Fluid rectangle skeleton */}
          <div className="w-full h-auto aspect-[2/1]">
            <Skeleton animation="pulse" width="100%" height="100%" />
          </div>

          {/* Fluid circle skeleton */}
          <div className="sm:w-[100px] sm:h-[100px] xl:w-[500px] xl:h-[500px]">
            <Skeleton width="100%" height="100%" circle />
          </div>

          {/* Fluid text line skeletons */}
          <div className="w-[20%] min-w-[120px] max-w-[167px] h-[14px]">
            <Skeleton width="100%" height="100%" />
          </div>

          <div className="w-[15%] min-w-[100px] max-w-[138px] h-[42px]">
            <Skeleton width="100%" height="100%" />
          </div>
        </div>
      </section>
      {/* stepper */}
      <section>
        <h1 className="text-display-sm text-primary-600">Stepper:</h1>
        <div className="mx-auto w-full">
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
        <div className="w-[50%] mx-auto">
          <Stepper
            stepsConfig={stepsConfig}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isComplete={isComplete}
            setIsComplete={setIsComplete}
            position="vertical"
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
      </section>
      {/* Breadcrumbs */}
      <section className="my-5">
        <h1 className="text-display-sm text-primary-600">Breadcrumbs</h1>
        {/* <Breadcrumb
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
        /> */}
        <Breadcrumbs aria-label="breadcrumb" separator="/">
          <Link href="/">
            <RiStackLine size={18} />
          </Link>
          <Link
            href="/pages/dashboard"
            // style={{ textDecoration: "none", color: "inherit" }}
          >
            Dashboard
          </Link>
          <Link
            href="/pages/team"
            // className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
          >
            Team
          </Link>
        </Breadcrumbs>
      </section>
      {/* Sidebar */}
      <div className="relative flex gap-3 bg-white">
        <section className=" bg-white">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}>
            <Sidebar.Header collapsed={collapsed} setCollapsed={setCollapsed}>
              <span onClick={() => setCollapsed((prev) => !prev)}>Logo</span>
            </Sidebar.Header>
            <Sidebar.Menu
              scroll
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              navItems={navItems}
            />
            <Sidebar.Footer
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              navItems={footerItems}
            >
              <Divider className="mb-3" />
              <Button
                className="w-full"
                variant="outlined"
                intent="default-outlined"
                startIcon={<RiLogoutBoxRLine size={20} />}
              >
                {!collapsed ? "" : "Logout"}
              </Button>
            </Sidebar.Footer>
          </Sidebar>
        </section>
        <section className="flex-grow ml-[80px] transition-all duration-300 ease-in-out">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, fugiat.
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur nesciunt adipisci modi culpa voluptas accusamus
            corporis.
          </p>
        </section>
      </div>
      {/* Divider */}
      <section>
        <h1 className="text-display-sm text-primary-600">Divider</h1>
        <div className="w-[50%] border border-primary-600 p-5 flex justify-center gap-6 items-center">
          <Divider
            position="vertical"
            height="200px"
            className="my-4 border-red-600"
          />
          <Divider position="horizontal" className="my-4" />
        </div>
      </section>
      {/* Loading State */}
      <section className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-display-sm text-primary-600">Loading</h1>
        <Loading width="50px" height="50px" loaderColor="green" />
        <span className="font-bold">Hold On ...</span>
        <p className="text-sm text-gray-500">
          We are running into some issues :&#40;
        </p>
        <Button>
          Loading <Loading width="15px" height="15px" variant="light" />
        </Button>
        <Button variant="outlined">
          Loading <Loading width="15px" height="15px" variant="heavy" />
        </Button>
      </section>
    </div>
  );
};

export default Test;

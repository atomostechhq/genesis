import { RiCloseCircleLine } from "@remixicon/react";
import React, { InputHTMLAttributes } from "react";
import Input from "./Input";
import Chip from "./Chip";

interface TextInputWithLabelProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  intent?:
    | "error"
    | "default"
    | "success"
    | "warning"
    | "blue"
    | "primary"
    | "bluegray"
    | "bluelight"
    | "violet"
    | "indigo"
    | "purple"
    | "pink"
    | "rose"
    | "orange";
  placeholder?: string;
  size?: "sm" | "lg";
  type?:
    | "number"
    | "search"
    | "text"
    | "url"
    | "email"
    | "password"
    | "tel"
    | "time";
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TextInputWithLabel: React.FC<TextInputWithLabelProps> = ({
  intent = "primary",
  placeholder = "Enter tags",
  type = "text",
  size,
  tags,
  setTags,
  ...props
}) => {
  const handleAddTags = (inputValue: string) => {
    const values = inputValue
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v && !tags.includes(v));
    if (values.length === 0) return;
    setTags([...tags, ...values]);
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      handleAddTags(target.value);
      target.value = "";
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    handleAddTags(pasteData);
  };

  return (
    <div>
      <Input
        type={type}
        size={size}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        className={"w-full"}
        {...props}
      />
      <div className="flex flex-wrap items-center gap-2 mt-2 transition-all duration-300">
        {tags?.map((tag, idx) => (
          <Chip
            size="md"
            intent={intent}
            key={`${tag}-${idx}`}
            endIcon={
              <RiCloseCircleLine
                size={14}
                className="cursor-pointer hover:text-red-500"
                onClick={() => handleRemoveTag(tag)}
              />
            }
          >
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default TextInputWithLabel;

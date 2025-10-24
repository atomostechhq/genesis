"use client";
import React, { forwardRef, useState, DragEvent } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { RiUpload2Line } from "@remixicon/react";
import { cn } from "../utils/utils";
import Label from "./Label";
import FileUploadPreview from "./FileUploadPreview";

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  selectedFile?: File[];
  setSelectedFile?: (files: File[]) => void;
  children?: ReactNode;
  onDelete?: (index: number) => void;
  title?: string;
  disabled?: boolean;
  filePreviewClassName?: string;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      selectedFile,
      setSelectedFile,
      onChange,
      multiple,
      onDelete,
      children,
      disabled,
      title,
      filePreviewClassName,
      id,
      className,
      accept,
      ...props
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      if (multiple) {
        setSelectedFile && setSelectedFile([...(selectedFile || []), ...files]);
      } else {
        setSelectedFile && setSelectedFile([files[0]]);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <input
          type="file"
          {...props}
          accept={accept}
          id={id}
          onChange={onChange}
          multiple={multiple}
          disabled={disabled}
          hidden
          ref={ref}
        />
        <Label
          htmlFor={id}
          disabled={disabled}
          role="button"
          aria-label={`Upload ${multiple ? "files" : "file"}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "w-full h-[126px] border-2 border-dashed border-gray-200 hover:bg-gray-200 cursor-pointer rounded-lg px-6 py-4 flex items-center justify-center transition-all",
            isDragging && "border-primary-500 bg-primary-50",
            disabled && "pointer-events-none",
            className
          )}
        >
          <div className={cn("grid grid-cols-1 place-items-center gap-2")}>
            <div className="w-10 h-10 border-[6px] border-gray-50 bg-gray-200 rounded-full p-1 flex justify-center items-center">
              <RiUpload2Line className="w-5 h-5" />
            </div>
            <div>
              <p className="text-center text-sm text-gray-600">
                <span className="text-primary-600 font-semibold">
                  Click to upload or drag and drop
                </span>{" "}
                <br /> {title}
              </p>
            </div>
          </div>
        </Label>
        <section className={cn(`grid gap-2`, filePreviewClassName)}>
          {selectedFile?.map((file, index) => (
            <FileUploadPreview
              key={file.name || index}
              file={file}
              index={index}
              onDelete={onDelete}
            >
              {children}
            </FileUploadPreview>
          ))}
        </section>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;

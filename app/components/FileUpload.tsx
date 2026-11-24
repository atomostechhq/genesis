"use client";
import React, { forwardRef, useState, DragEvent } from "react";
import type { InputHTMLAttributes, JSX, ReactNode } from "react";
import {
  RiFileLine,
  RiUpload2Line,
  RiDeleteBinLine,
  RiMusic2Line,
  RiVideoLine,
  RiImageLine,
  RiFileExcel2Line,
  RiFileWord2Line,
  RiFilePpt2Line,
  RiFileZipLine,
  RiFilePdf2Line,
} from "@remixicon/react";
import { cn } from "../utils/utils";
import Label from "./Label";
import Button from "./Button";
import FileUploadPreview from "./FileUploadPreview";

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  selectedFile?: File[];
  setSelectedFile?: (files: File[]) => void;
  children?: ReactNode;
  onDelete?: (index: number) => void;
  isDeleteDisabled?: boolean;
  title?: string;
  disabled?: boolean;
  filePreviewClassName?: string;
  existingFileUrls?: string[];
  showPreview?: boolean; // default true
}

const getIconForMimeType = (file: File) => {
  const fileName = typeof file === "string" ? file : file.name;
  const extension = fileName.split(".").pop()?.toLowerCase();

  let iconComponent: JSX.Element;
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "webp":
      iconComponent = <RiImageLine className="text-primary-600 w-12 h-12" />;
      break;
    case "mp3":
    case "wav":
    case "ogg":
      iconComponent = <RiMusic2Line className="text-primary-600 w-12 h-12" />;
      break;
    case "mp4":
    case "avi":
    case "mkv":
      iconComponent = <RiVideoLine className="text-primary-600 w-12 h-12" />;
      break;
    case "xls":
    case "xlsx":
    case "csv":
    case "txt":
    case "ods":
      iconComponent = (
        <RiFileExcel2Line className="text-primary-600 w-12 h-12" />
      );
      break;
    case "doc":
    case "docx":
    case "odt":
    case "xml":
      iconComponent = (
        <RiFileWord2Line className="text-primary-600 w-12 h-12" />
      );
      break;
    case "pptx":
    case "pptm":
    case "xps":
    case "ppsx":
      iconComponent = <RiFilePpt2Line className="text-primary-600 w-12 h-12" />;
      break;
    case "rar":
    case "zip":
      iconComponent = <RiFileZipLine className="text-primary-600 w-12 h-12" />;
      break;
    case "pdf":
      iconComponent = <RiFilePdf2Line className="text-primary-600 w-12 h-12" />;
      break;
    default:
      // Return generic file icon
      iconComponent = <RiFileLine className="text-primary-600 w-12 h-12" />;
      break;
  }
  return iconComponent;
};

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
      isDeleteDisabled,
      existingFileUrls,
      showPreview = true,
      ...props
    },
    ref,
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
            className,
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
        <section
          className={cn(
            "grid gap-3",
            showPreview
              ? "grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
              : "grid-cols-1",
            filePreviewClassName,
          )}
        >
          {selectedFile?.map((file, index) => {
            // Compact row preview (no thumbnails / object URLs)
            if (!showPreview) {
              return (
                <FileUploadPreview
                  key={`${file.name}-${index}`}
                  file={file}
                  index={index}
                  onDelete={onDelete}
                >
                  {children}
                </FileUploadPreview>
              );
            }

            // Card preview (default)
            const isExisting = !!existingFileUrls?.[index];
            const previewUrl = isExisting
              ? existingFileUrls[index]
              : file.size > 0
                ? URL.createObjectURL(file)
                : null;

            const isImage = /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file.name);

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden w-full flex flex-col"
              >
                {isImage && previewUrl ? (
                  <div className="w-full aspect-square p-1 flex items-center justify-center">
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-[calc(100%-8px)] aspect-square bg-primary-100 rounded-md flex items-center justify-center m-1">
                    {getIconForMimeType(file)}
                  </div>
                )}

                <div className="flex justify-between items-center gap-2 p-4 bg-gray-25 border-t border-gray-200 w-full mt-auto">
                  {previewUrl ? (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-0 text-xs !break-all text-primary-600 whitespace-normal line-clamp-2"
                    >
                      {file.name}
                    </a>
                  ) : (
                    <p className="min-w-0 text-sm line-clamp-2 break-all text-primary-600 whitespace-normal">
                      {file.name}
                    </p>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="outlined"
                    intent="error-outlined"
                    className="p-1 border-none shrink-0"
                    onClick={() => onDelete?.(index)}
                    disabled={isDeleteDisabled}
                    startIcon={<RiDeleteBinLine className="w-5 h-5" />}
                  />
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export default FileUpload;

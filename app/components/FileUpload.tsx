import React, { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
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

export interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  selectedFile?: File[];
  setSelectedFile?: (files: File[]) => void;
  children?: ReactNode;
  onDelete?: () => void;
  title?: string;
  disabled?: boolean;
  filePreviewClassName?: string;
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
      iconComponent = (
        <RiImageLine className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "mp3":
    case "wav":
    case "ogg":
      iconComponent = (
        <RiMusic2Line className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "mp4":
    case "avi":
    case "mkv":
      iconComponent = (
        <RiVideoLine className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "xls":
    case "xlsx":
    case "csv":
    case "txt":
    case "ods":
      iconComponent = (
        <RiFileExcel2Line className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "doc":
    case "docx":
    case "odt":
    case "xml":
      iconComponent = (
        <RiFileWord2Line className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "pptx":
    case "pptm":
    case "xps":
    case "ppsx":
      iconComponent = (
        <RiFilePpt2Line className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "rar":
    case "zip":
      iconComponent = (
        <RiFileZipLine className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "pdf":
      iconComponent = (
        <RiFilePdf2Line className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    default:
      // Return generic file icon
      iconComponent = (
        <RiFileLine className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
  }
  return iconComponent;
};

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      selectedFile,
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
          className={cn(
            "w-full h-[126px] border-2 border-dashed border-gray-200 hover:bg-gray-200 cursor-pointer rounded-lg px-6 py-4 flex flex-col items-center gap-2",
            disabled && "pointer-events-none",
            className
          )}
        >
          <div className="w-10 h-10 border-[6px] border-gray-50 bg-gray-200 rounded-full p-1 flex justify-center items-center">
            <RiUpload2Line className="w-5 h-5" />
          </div>
          <p className="text-center text-sm text-gray-600">
            <span className="text-primary-600 font-semibold">
              Click to upload
            </span>{" "}
            <br /> {title}
          </p>
        </Label>
        {/* <section className={cn(`grid gap-2`, filePreviewClassName)}>
          {selectedFile?.map((file, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg flex items-center justify-between gap-5"
            >
              <div className="flex items-center gap-2 w-full">
                {getIconForMimeType(file)}
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-sm line-clamp-2 break-all">
                    {typeof file === "string" ? file : file.name}{" "}
                  </p>
                  <div className="w-full">{children}</div>
                </div>
              </div>
              <RiDeleteBinLine
                onClick={onDelete}
                className="text-gray-500 w-5 h-5 cursor-pointer"
              />
            </div>
          ))}
        </section> */}
        {selectedFile && selectedFile?.length > 0 && (
          <section
            className={cn(`grid gap-2`, filePreviewClassName)}
            role="list"
            aria-label="Uploaded files"
          >
            {selectedFile?.map((file, index) => (
              <div
                key={index}
                role="listitem"
                className="p-4 border border-gray-200 rounded-lg flex items-center justify-between gap-5"
              >
                <div className="flex items-center gap-2 w-full">
                  {getIconForMimeType(file)}
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm line-clamp-2 break-all">
                      {typeof file === "string" ? file : file.name}
                    </p>
                    <div className="w-full">{children}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onDelete}
                  aria-label={`Delete ${
                    typeof file === "string" ? file : file.name
                  }`}
                  className="text-gray-500 p-2 hover:bg-gray-100 rounded-full"
                >
                  <RiDeleteBinLine className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;

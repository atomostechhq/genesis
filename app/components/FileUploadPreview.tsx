import {
  RiDeleteBinLine,
  RiFileExcel2Line,
  RiFileLine,
  RiFilePdf2Line,
  RiFilePpt2Line,
  RiFileWord2Line,
  RiFileZipLine,
  RiImageLine,
  RiMusic2Line,
  RiVideoLine,
} from "@remixicon/react";
import React, { ReactNode } from "react";

interface FileUploadPreviewProps {
  index: number;
  file: File;
  children?: ReactNode;
  onDelete?: (index: number) => void;
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

const FileUploadPreview = ({
  index,
  file,
  children,
  onDelete,
}: FileUploadPreviewProps) => {
  return (
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
          {children && <div className="w-full">{children}</div>}
        </div>
      </div>
      <button type="button" onClick={() => onDelete?.(index)}>
        <RiDeleteBinLine className="text-gray-500 w-5 h-5 cursor-pointer" />
      </button>
    </div>
  );
};

export default FileUploadPreview;

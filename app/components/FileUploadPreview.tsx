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

type UploadedFile = {
  name: string;
  url: string;
  index?: number;
};

interface FileUploadPreviewProps {
  index: number;
  file: File;
  children?: ReactNode;
  onDelete?: (index: number) => void;
}

type FileUploadViewProps = {
  files: UploadedFile[];
};

const getIconForMimeType = (fileName: string) => {
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
      iconComponent = <RiFileLine className="text-primary-600 w-12 h-12" />;
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
    <div className="px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-between gap-5">
      <div className="flex items-center gap-2 w-full">
        {getIconForMimeType(file.name)}
        <div className="flex flex-col gap-1 w-full">
          <p className="text-sm line-clamp-2 break-all text-gray-900 font-medium">{file.name}</p>
          {children && <div className="w-full">{children}</div>}
        </div>
      </div>
      <button type="button" onClick={() => onDelete?.(index)}>
        <RiDeleteBinLine className="text-error-500 w-5 h-5 cursor-pointer" />
      </button>
    </div>
  );
};

export default FileUploadPreview;

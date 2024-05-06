import React, { InputHTMLAttributes, ReactNode } from "react";
import FileLineIcon from "remixicon-react/FileLineIcon";
import Upload2LineIcon from "remixicon-react/Upload2LineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import Music2LineIcon from "remixicon-react/Music2LineIcon";
import VideoLineIcon from "remixicon-react/VideoLineIcon";
import ImageLineIcon from "remixicon-react/ImageLineIcon";
import FileExcel2LineIcon from "remixicon-react/FileExcel2LineIcon";
import FileWord2LineIcon from "remixicon-react/FileWord2LineIcon";
import FilePpt2LineIcon from "remixicon-react/FilePpt2LineIcon";
import FileZipLineIcon from "remixicon-react/FileZipLineIcon";
import { cn } from "../utils/utils";

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  selectedFile?: string[];
  setSelectedFile?: (files: string[]) => void;
  children?: ReactNode;
  onDelete?: (value: any) => void;
  title?: string;
}

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
      iconComponent = (
        <ImageLineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "mp3":
    case "wav":
    case "ogg":
      iconComponent = (
        <Music2LineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "mp4":
    case "avi":
    case "mkv":
      iconComponent = (
        <VideoLineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "xls":
    case "xlsx":
    case "csv":
    case "txt":
    case "ods":
      iconComponent = (
        <FileExcel2LineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "doc":
    case "docx":
    case "odt":
    case "xml":
      iconComponent = (
        <FileWord2LineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "pptx":
    case "pptm":
    case "xps":
    case "ppsx":
      iconComponent = (
        <FilePpt2LineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    case "rar":
    case "zip":
      iconComponent = (
        <FileZipLineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
    default:
      // Return generic file icon
      iconComponent = (
        <FileLineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
      );
      break;
  }
  return iconComponent;
};

const FileUpload = ({
  selectedFile,
  onChange,
  multiple,
  setSelectedFile,
  onDelete,
  children,
  title,
  className,
  accept,
  ...props
}: FileUploadProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        {...props}
        accept={accept}
        id="custom-input"
        onChange={onChange}
        multiple={multiple}
        hidden
      />
      <label
        htmlFor="custom-input"
        className={cn(
          "max-w-lg w-full h-[126px] border-2 border-dashed border-gray-200 hover:bg-gray-200 cursor-pointer rounded-lg px-6 py-4 flex flex-col items-center gap-2",
          className
        )}
      >
        <div className="w-10 h-10 border-[6px] border-gray-50 bg-gray-200 rounded-full p-1 flex justify-center items-center">
          <Upload2LineIcon className="w-5 h-5" />
        </div>
        <p className="text-center text-sm text-gray-600">
          <span className="text-primary-600 font-semibold">
            Click to upload
          </span>{" "}
          or drag and drop <br /> {title}
        </p>
      </label>
      <div className="flex flex-col gap-2">
        {selectedFile?.map((file, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg w-[512px] flex items-center justify-between gap-5"
          >
            <div className="flex items-center gap-2 w-full">
              {getIconForMimeType(file)}
              <div className="flex flex-col gap-1 w-full">
                <p className="text-sm">{file}</p>
                <div className="w-full">{children}</div>
              </div>
            </div>
            <DeleteBinLineIcon
              onClick={onDelete}
              className="text-gray-500 w-5 h-5 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

import React, { InputHTMLAttributes, ReactNode } from "react";
import File3LineIcon from "remixicon-react/File3LineIcon";
import Upload2LineIcon from "remixicon-react/Upload2LineIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import { cn } from "../utils/utils";

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  selectedFile: string[];
  setSelectedFile: (files: string[]) => void;
  children?: ReactNode;
  onDelete?: (value: any) => void;
}

const FileUpload = ({
  selectedFile,
  onChange,
  multiple,
  setSelectedFile,
  onDelete,
  children,
  className,
  ...props
}: FileUploadProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        {...props}
        id="custom-input"
        onChange={onChange}
        multiple={multiple}
        hidden
      />
      <label
        htmlFor="custom-input"
        className={cn(
          "max-w-lg w-full h-[126px] border border-dashed border-gray-200 hover:bg-gray-200 cursor-pointer rounded-lg px-6 py-4 flex flex-col items-center gap-2",
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
          or drag and drop <br /> SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </label>
      <div className="flex flex-col gap-3">
        {selectedFile?.map((file, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg w-[512px] h-[72px] flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <File3LineIcon className="text-primary-600 bg-primary-100 border-4 border-primary-50 w-8 h-8 p-1 rounded-full" />
              <div className="flex flex-col gap-2">
                <p className="text-sm">{file}</p>
              </div>
            </div>
            <DeleteBinLineIcon
              onClick={onDelete}
              className="text-error-600 w-5 h-5"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

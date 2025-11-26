"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  RiUpload2Line,
  RiDeleteBin6Line,
  RiRefreshLine,
  RiEyeLine,
  RiFileTextLine,
  RiFilePdfLine,
  RiFileWordLine,
  RiFileExcelLine,
  RiFileMusicLine,
  RiFileLine,
  RiImageLine,
  RiVideoLine,
  RiFileZipLine,
  RiCheckLine,
  RiCloseLine,
} from "@remixicon/react";
import Spinner from "./Spinner";

// Types
export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadItem {
  id: string;
  file?: File;
  name?: string;
  size?: number;
  progress?: number;
  status?: UploadStatus;
  previewUrl?: string;
}

export interface ImageUploadControlledProps {
  items: UploadItem[];
  onAddFiles: (files: File[]) => void;
  onDelete: (id: string) => void;
  onRetry: (id: string) => void;
  onPreview?: (id: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  hintText?: React.ReactNode;
  showSizeText?: boolean;
  getFileIcon?: (fileName: string, fileType: string) => React.ReactNode;
}

// Default file icon function
const defaultGetFileIcon = (fileName: string, fileType: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  // Image files
  if (
    fileType.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(extension)
  ) {
    return <RiImageLine className="w-6 h-6 text-blue-500" />;
  }

  // PDF files
  if (fileType === "application/pdf" || extension === "pdf") {
    return <RiFilePdfLine className="w-6 h-6 text-red-500" />;
  }

  // Word documents
  if (fileType.includes("word") || ["doc", "docx"].includes(extension)) {
    return <RiFileWordLine className="w-6 h-6 text-blue-600" />;
  }

  // Excel files
  if (
    fileType.includes("excel") ||
    ["xls", "xlsx", "csv"].includes(extension)
  ) {
    return <RiFileExcelLine className="w-6 h-6 text-green-600" />;
  }

  // Audio files
  if (
    fileType.startsWith("audio/") ||
    ["mp3", "wav", "ogg", "m4a"].includes(extension)
  ) {
    return <RiFileMusicLine className="w-6 h-6 text-purple-500" />;
  }

  // Video files
  if (
    fileType.startsWith("video/") ||
    ["mp4", "avi", "mov", "wmv"].includes(extension)
  ) {
    return <RiVideoLine className="w-6 h-6 text-purple-600" />;
  }

  // Archive files
  if (
    fileType.includes("zip") ||
    ["zip", "rar", "7z", "tar", "gz"].includes(extension)
  ) {
    return <RiFileZipLine className="w-6 h-6 text-yellow-600" />;
  }

  // Text files
  if (
    fileType.startsWith("text/") ||
    ["txt", "rtf", "md"].includes(extension)
  ) {
    return <RiFileTextLine className="w-6 h-6 text-gray-600" />;
  }

  // Default file icon
  return <RiFileLine className="w-6 h-6 text-gray-400" />;
};

export default function ImageUploadControlled({
  items,
  onAddFiles,
  onDelete,
  onRetry,
  onPreview,
  multiple = true,
  accept = "image/*",
  maxSizeMB = 15,
  className = "",
  hintText,
  showSizeText = true,
  getFileIcon = defaultGetFileIcon,
}: ImageUploadControlledProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const localPreviews = useRef<Map<string, string>>(new Map()); // Changed to useRef

  const formatSize = (bytes?: number) => {
    if (!bytes) return "0 KB";
    return `${Math.round(bytes / 1024)} KB`;
  };

  const getPreviewUrl = (item: UploadItem) => {
    if (item.previewUrl) return item.previewUrl;
    if (item.file && !localPreviews.current.has(item.id)) {
      const url = URL.createObjectURL(item.file);
      localPreviews.current.set(item.id, url);
    }
    return localPreviews.current.get(item.id);
  };

  const getStatusDisplay = (status?: UploadStatus) => {
    switch (status) {
      case "uploading":
        return {
          text: "Uploading",
          color: "text-blue-600",
          showSpinner: true,
          icon: <Spinner size="sm" />,
          canPreview: false,
        };
      case "success":
        return {
          text: "Completed",
          color: "text-green-600",
          showSpinner: false,
          icon: <RiCheckLine className="w-3 h-3 text-white" />,
          canPreview: true,
        };
      case "error":
        return {
          text: "Failed",
          color: "text-red-600",
          showSpinner: false,
          icon: <RiCloseLine className="w-3 h-3 text-white" />,
          canPreview: false,
        };
      default:
        return {
          text: "",
          color: "",
          showSpinner: false,
          icon: null,
          canPreview: false,
        };
    }
  };

  const getProgressColor = (status?: UploadStatus) => {
    switch (status) {
      case "uploading":
        return "bg-blue-500";
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  // Get file icon for an item
  const getItemFileIcon = (item: UploadItem) => {
    const fileName = item.name || item.file?.name || "";
    const fileType = item.file?.type || "";
    return getFileIcon(fileName, fileType);
  };

  // Event handlers - Using the same approach as reference component
  const triggerInput = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );
    if (validFiles.length === 0) return;

    onAddFiles(multiple ? validFiles : [validFiles[0]]);
    e.target.value = "";
  };

  // Simple drag handlers like the reference component
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const validFiles = files.filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    );
    if (validFiles.length > 0) {
      onAddFiles(multiple ? validFiles : [validFiles[0]]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerInput();
    }
  };

  // Cleanup object URLs on unmount - now with proper dependencies
  React.useEffect(() => {
    return () => {
      localPreviews.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={handleInputChange}
      />
      <label
        htmlFor={inputRef.current?.id}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerInput}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Upload ${multiple ? "images" : "an image"}`}
        className={`
         w-[500px] bg-white py-2 flex items-center justify-center rounded-lg border cursor-pointer transition-all
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white hover:bg-gray-50"
          }
        `}
      >
        <div className="flex items-center gap-3 text-center">
          {/* <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDragging ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <RiUpload2Line
              className={`w-5 h-5 ${
                isDragging ? "text-blue-600" : "text-gray-600"
              }`}
            />
          </div> */}
          <div>
            <p className="text-sm text-gray-600">
              Drag files here or
              <span className="text-primary-600 font-semibold ml-1">
                Upload
              </span>{" "}
              <br />
            </p>
          </div>
        </div>
      </label>
      <span className="text-xs">
        {hintText ?? `Only PNG, JPG, GIF. Max file size ${maxSizeMB}MB`}
      </span>

      {/* Upload Items */}
      <div className="flex flex-col gap-4 mt-4">
        {items.map((item) => {
          const previewUrl = getPreviewUrl(item);
          const progress =
            item.progress ?? (item.status === "success" ? 100 : 0);
          const statusInfo = getStatusDisplay(item.status);
          const progressColor = getProgressColor(item.status);
          const fileIcon = getItemFileIcon(item);

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              {/* File Icon */}
              <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-gray-50 border flex items-center justify-center">
                {fileIcon}
              </div>

              {/* File Info & Progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {item.name || item.file?.name || "Unnamed file"}
                    </div>
                    {showSizeText && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        {formatSize(item.size || item.file?.size)}
                        {statusInfo.text && (
                          <div className="ml-2 font-medium flex items-center gap-1">
                            {statusInfo.showSpinner ? (
                              // For uploading - just show spinner without circle
                              <>
                                {statusInfo.icon}
                                <span className={statusInfo.color}>
                                  {statusInfo.text}
                                </span>
                              </>
                            ) : (
                              // For completed/failed - show circle with icon
                              <>
                                <div
                                  className={`w-4 h-4 rounded-full flex justify-center items-center ${statusInfo.color.replace(
                                    "text-",
                                    "bg-"
                                  )}`}
                                >
                                  {statusInfo.icon}
                                </div>
                                <span className={statusInfo.color}>
                                  {statusInfo.text}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {onPreview && (
                        <button
                          type="button"
                          onClick={() => onPreview(item.id)}
                          disabled={!statusInfo.canPreview}
                          className={`p-2 rounded-md transition-colors ${
                            statusInfo.canPreview
                              ? "hover:bg-gray-100 text-gray-600"
                              : "text-gray-300 cursor-not-allowed"
                          }`}
                          title={
                            statusInfo.canPreview
                              ? "Preview"
                              : "Preview not available"
                          }
                        >
                          <RiEyeLine className="w-5 h-5" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onDelete(item.id)}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                        title="Delete"
                      >
                        <RiDeleteBin6Line className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Try Again Button - Show separately when failed */}
                    {item.status === "error" && (
                      <button
                        type="button"
                        onClick={() => onRetry(item.id)}
                        className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <RiRefreshLine className="w-4 h-4" />
                        Try Again
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${progressColor}`}
                      style={{
                        width: `${Math.max(0, Math.min(100, progress))}%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 w-12 text-right">
                    {item.status === "error"
                      ? "--%"
                      : `${Math.round(progress)}%`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Export the default file icon function for reuse
export { defaultGetFileIcon };

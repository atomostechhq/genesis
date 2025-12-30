"use client";
import React, { useRef, useState } from "react";
import {
  RiDeleteBin6Line,
  RiRefreshLine,
  RiFileLine,
  RiImageLine,
  RiVideoLine,
  RiFileZipLine,
  RiCheckLine,
  RiCloseLine,
  RiFilePdf2Line,
  RiFilePpt2Line,
  RiFileWord2Line,
  RiFileExcel2Line,
  RiMusic2Line,
  RiEyeLine,
} from "@remixicon/react";
import Spinner from "./Spinner";
import { cn } from "../utils/utils";
import Label from "./Label";
import Button from "./Button";

const fileSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="55"
      viewBox="0 0 36 47"
      fill="none"
    >
      <path
        d="M0 8.72494C0 5.48487 2.6266 2.85828 5.86667 2.85828H20.5333L33 15.8583V40.9916C33 44.2317 30.3734 46.8583 27.1333 46.8583H5.86667C2.6266 46.8583 0 44.2317 0 40.9916V8.72494Z"
        fill="var(--primary-600)"
      />
      <g filter="url(#filter0_d_5101_541)">
        <path
          d="M20.5334 13.4052V2.85828L33 15.8582L22.974 15.8482C21.6257 15.8469 20.5334 14.7535 20.5334 13.4052Z"
          fill="var(--primary-300)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_5101_541"
          x="14.7435"
          y="-2.98023e-05"
          width="21.1148"
          height="21.6482"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-1.4658" dy="1.4658" />
          <feGaussianBlur stdDeviation="2.16205" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0417487 0 0 0 0 0.107741 0 0 0 0 0.401705 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5101_541"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5101_541"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

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

export interface FileUploadControlProps {
  items: UploadItem[];
  onAddFiles: (files: File[]) => void;
  onUpdateItem?: (id: string, updates: Partial<UploadItem>) => void;
  onDelete?: (id: string) => void;
  onRetry?: (id: string) => void;
  onPreview?: (id: string) => void;
  onUpload?: (
    file: File,
    onProgress: (progress: number) => void
  ) => Promise<string>;
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  hintText?: React.ReactNode;
  showSizeText?: boolean;
  getFileIcon?: (fileName: string, fileType: string) => React.ReactNode;
  autoUpload?: boolean;
  disabled?: boolean;
}

// Default file icon function (MATCHED with getIconForMimeType)
const defaultGetFileIcon = (fileName: string, fileType: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  // IMAGE FILES
  if (
    fileType.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"].includes(extension)
  ) {
    return <RiImageLine className="w-5 h-5 text-white" />;
  }

  // AUDIO FILES
  if (
    fileType.startsWith("audio/") ||
    ["mp3", "wav", "ogg", "m4a"].includes(extension)
  ) {
    return <RiMusic2Line className="w-5 h-5 text-white" />;
  }

  // VIDEO FILES
  if (
    fileType.startsWith("video/") ||
    ["mp4", "avi", "mkv", "mov", "wmv"].includes(extension)
  ) {
    return <RiVideoLine className="w-5 h-5 text-white" />;
  }

  // EXCEL / SPREADSHEET FILES
  if (
    fileType.includes("excel") ||
    ["xls", "xlsx", "csv", "txt", "ods"].includes(extension)
  ) {
    return <RiFileExcel2Line className="w-5 h-5 text-white" />;
  }

  // WORD DOCUMENTS
  if (
    fileType.includes("word") ||
    ["doc", "docx", "odt", "xml"].includes(extension)
  ) {
    return <RiFileWord2Line className="w-5 h-5 text-white" />;
  }

  // POWERPOINT FILES
  if (["pptx", "pptm", "xps", "ppsx"].includes(extension)) {
    return <RiFilePpt2Line className="w-5 h-5 text-white" />;
  }

  // ZIP / ARCHIVE FILES
  if (
    fileType.includes("zip") ||
    ["zip", "rar", "7z", "tar", "gz"].includes(extension)
  ) {
    return <RiFileZipLine className="w-5 h-5 text-white" />;
  }

  // PDF FILES
  if (fileType === "application/pdf" || extension === "pdf") {
    return <RiFilePdf2Line className="w-5 h-5 text-white" />;
  }

  // DEFAULT ICON
  return <RiFileLine className="w-5 h-5 text-white" />;
};

export default function FileUploadControl({
  items,
  onAddFiles,
  onUpdateItem,
  onDelete,
  onRetry,
  onPreview,
  onUpload,
  multiple = true,
  accept = "image/*",
  maxSizeMB = 15,
  className = "",
  hintText,
  showSizeText = true,
  getFileIcon = defaultGetFileIcon,
  autoUpload = true,
  disabled,
}: FileUploadControlProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const localPreviews = useRef<Map<string, string>>(new Map());
  const uploadProgress = useRef<Map<string, number>>(new Map());

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
          icon: <Spinner size="xs" color="gray" />,
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

  // Handle upload with progress
  const handleUpload = React.useCallback(
    async (item: UploadItem) => {
      if (
        !item.file ||
        !onUpload ||
        item.status === "success" ||
        item.status === "uploading"
      ) {
        return;
      }

      try {
        // Start with 0% progress
        if (onUpdateItem) {
          onUpdateItem(item.id, { status: "uploading", progress: 0 });
        }

        // Clear any existing progress
        uploadProgress.current.delete(item.id);

        // Call upload function
        const previewUrl = await onUpload(item.file, (progress: number) => {
          // Ensure progress doesn't exceed 100
          const clampedProgress = Math.min(100, Math.max(0, progress));
          uploadProgress.current.set(item.id, clampedProgress);

          if (onUpdateItem) {
            onUpdateItem(item.id, {
              progress: clampedProgress,
              status: "uploading",
            });
          }
        });

        // Ensure 100% progress before marking as success
        if (onUpdateItem) {
          onUpdateItem(item.id, {
            progress: 100,
            status: "success",
            previewUrl,
          });
        }

        // Clear progress tracking
        uploadProgress.current.delete(item.id);
      } catch (error) {
        console.error("Upload error:", error);
        if (onUpdateItem) {
          onUpdateItem(item.id, {
            progress: 0,
            status: "error",
          });
        }
        uploadProgress.current.delete(item.id);
      }
    },
    [onUpload, onUpdateItem]
  );

  // Get current progress for an item
  const getCurrentProgress = (item: UploadItem) => {
    // If status is success, always show 100%
    if (item.status === "success") return 100;

    // If status is error, show 0%
    if (item.status === "error") return 0;

    // Use local progress if available, otherwise use item progress
    return uploadProgress.current.get(item.id) ?? item.progress ?? 0;
  };

  // Internal retry handler
  const handleRetry = (id: string) => {
    const item = items.find((item: UploadItem) => item.id === id);
    if (item && onUpload) {
      handleUpload(item);
    } else if (onRetry) {
      onRetry(id);
    }
  };

  // Handle delete internally
  const handleDelete = (id: string) => {
    // Clean up local preview URL if it exists
    if (localPreviews.current.has(id)) {
      const url = localPreviews.current.get(id);
      if (url) URL.revokeObjectURL(url);
      localPreviews.current.delete(id);
    }

    // Clean up progress tracking
    uploadProgress.current.delete(id);

    // Call external onDelete handler if provided
    if (onDelete) {
      onDelete(id);
    }
  };

  // Event handlers
  const triggerInput = () => inputRef.current?.click();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(
      (file: File) => file.size <= maxSizeMB * 1024 * 1024
    );
    if (validFiles.length === 0) return;

    onAddFiles(multiple ? validFiles : [validFiles[0]]);
    e.target.value = "";
  };

  // Simple drag handlers
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const validFiles = files.filter(
      (file: File) => file.size <= maxSizeMB * 1024 * 1024
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

  // Auto-upload files when they're added
  React.useEffect(() => {
    if (autoUpload && onUpload) {
      items.forEach((item: UploadItem) => {
        if (item.status === "idle" && item.file) {
          handleUpload(item);
        }
      });
    }
  }, [items, autoUpload, onUpload, handleUpload]);

  // Cleanup object URLs on unmount
  React.useEffect(() => {
    const previews = localPreviews?.current;
    return () => {
      previews?.forEach((url: string) => URL?.revokeObjectURL(url));
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
        disabled={disabled}
      />
      <Label
        htmlFor={inputRef?.current?.id}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerInput}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        disabled={disabled}
        aria-label={`Upload ${multiple ? "images" : "an image"}`}
        className={cn(
          "max-w-[564px] w-full bg-white py-4 flex items-center justify-center rounded-lg border cursor-pointer transition-all",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white hover:bg-gray-50",
          disabled && "pointer-events-none cursor-not-allowed"
        )}
      >
        <div className="flex items-center gap-3 text-center">
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
      </Label>
      <span className="text-xs">
        {hintText ?? `Only PNG, JPG, GIF. Max file size ${maxSizeMB}MB`}
      </span>

      {/* Upload Items */}
      <div className="flex flex-col gap-4 mt-4">
        {items?.map((item: UploadItem) => {
          const progress = getCurrentProgress(item);
          const statusInfo = getStatusDisplay(item.status);
          const progressColor = getProgressColor(item?.status);
          const fileIcon = getItemFileIcon(item);
          return (
            <div
              key={item?.id}
              className="flex items-center gap-4 bg-white max-w-[564px] w-full p-4 rounded-lg border border-gray-200"
            >
              <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full object-contain">
                  {fileSvg()}
                </div>
                <div className="relative z-10 top-2 -left-2.5  flex items-center justify-center w-full h-full text-white">
                  {fileIcon}
                </div>
              </div>
              {/* File Info & Progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item?.name || item.file?.name || "Unnamed file"}
                    </h4>
                    {showSizeText && (
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        {formatSize(item?.size || item.file?.size)}
                        {statusInfo.text && (
                          <div className="ml-2 font-medium flex items-center gap-1">
                            {statusInfo?.showSpinner ? (
                              <>
                                {statusInfo.icon}
                                <span className={statusInfo.color}>
                                  {statusInfo.text}
                                </span>
                              </>
                            ) : (
                              <>
                                <div
                                  className={`w-4 h-4 rounded-full flex justify-center items-center ${
                                    statusInfo?.color === "text-red-600"
                                      ? "bg-red-600"
                                      : statusInfo?.color === "text-green-600"
                                      ? "bg-green-600"
                                      : "bg-gray-400"
                                  }`}
                                >
                                  {statusInfo?.icon}
                                </div>
                                <span className={statusInfo.color}>
                                  {statusInfo?.text}
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
                      {/* Preview Button - Show when upload is successful */}
                      {onPreview && item?.status === "success" && (
                        <button
                          type="button"
                          onClick={() => onPreview(item.id)}
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                          title="Preview"
                        >
                          <RiEyeLine size={16} />
                        </button>
                      )}
                      {item?.status === "error" && (
                        <>
                          {/* Desktop: full button */}
                          <span className="hidden sm:inline-block">
                            <Button
                              variant="outlined"
                              intent="primary-outlined"
                              type="button"
                              size="sm"
                              onClick={() => handleRetry(item?.id)}
                              className="whitespace-nowrap h-[30px]"
                            >
                              <RiRefreshLine size={16} />
                              Try Again
                            </Button>
                          </span>

                          {/* Mobile: icon only */}
                          <span className="sm:hidden">
                            <Button
                              variant="outlined"
                              intent="primary-outlined"
                              type="button"
                              size="sm"
                              onClick={() => handleRetry(item?.id)}
                              className="h-[30px] px-1 py-1"
                            >
                              <RiRefreshLine size={16} />
                            </Button>
                          </span>
                        </>
                      )}

                      {/* Delete button - always shown */}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
                        title="Delete"
                      >
                        <RiDeleteBin6Line size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Custom Progress Bar */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ease-out ${progressColor}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 w-12 text-right">
                    {item.status === "error"
                      ? "--%"
                      : item.status === "success"
                      ? "100%"
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

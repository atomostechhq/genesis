import React from "react";
import {
  RiFileLine,
  RiImageLine,
  RiVideoLine,
  RiFileZipLine,
  RiFilePdf2Line,
  RiFilePpt2Line,
  RiFileWord2Line,
  RiFileExcel2Line,
  RiMusic2Line,
} from "@remixicon/react";

export const defaultGetFileIcon = (
  fileName: string,
  fileType: string
): React.ReactNode => {
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

// Optional: Export other icon-related utilities
export const getIconForMimeType = defaultGetFileIcon;

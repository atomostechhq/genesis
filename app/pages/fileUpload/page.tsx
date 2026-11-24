"use client";
import {
  Button,
  FileSelector,
  FileUpload,
  FileUploadPreview,
  ProgressBar,
} from "@/app/components";
import { RiUpload2Line } from "@remixicon/react";
import React, { useRef, useState } from "react";

const FileUploadTest = () => {
  const [singleFile, setSingleFile] = useState<File[]>([]);
  const [multiFiles, setMultiFiles] = useState<File[]>([]);
  const [cardSingle, setCardSingle] = useState<File[]>([]);
  const [cardMulti, setCardMulti] = useState<File[]>([]);
  const [compactSingle, setCompactSingle] = useState<File[]>([]);
  const [compactMulti, setCompactMulti] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<File[]>([
    new File([], "sample-image.jpg"),
    new File([], "report.pdf"),
    new File([], "data.xlsx"),
  ]);
  const existingUrls = [
    "https://picsum.photos/400/300",
    "https://example.com/report.pdf",
    "https://example.com/data.xlsx",
  ];
  const fileRef = useRef<HTMLInputElement>(null);
  const fileMultiRef = useRef<HTMLInputElement>(null);

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSingleFile([file]);
    e.target.value = "";
  };

  const handleMultipleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length) setMultiFiles((prev) => [...prev, ...picked]);
    e.target.value = "";
  };

  const handleChange =
    (files: File[], setFiles: (f: File[]) => void, multiple = false) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const picked = Array.from(e.target.files ?? []);
      if (picked.length === 0) return;
      setFiles(multiple ? [...files, ...picked] : [picked[0]]);
      e.target.value = "";
    };

  const handleRemove =
    (files: File[], setFiles: (f: File[]) => void) => (index: number) =>
      setFiles(files.filter((_, i) => i !== index));

  return (
    <section className="max-w-3xl space-y-8 m-5">
      <h1 className="text-display-sm text-primary-600">File Upload</h1>

      {/* 1. Card preview, single (default) */}
      <div className="space-y-2">
        <h2 className="font-semibold">1. Card preview, single</h2>
        <FileUpload
          id="card-single"
          selectedFile={cardSingle}
          setSelectedFile={setCardSingle}
          onChange={handleChange(cardSingle, setCardSingle)}
          onDelete={handleRemove(cardSingle, setCardSingle)}
          title="SVG, PNG, JPG or GIF (max. 800x400px)"
        />
      </div>

      {/* 2. Card preview, multiple */}
      <div className="space-y-2">
        <h2 className="font-semibold">2. Card preview, multiple</h2>
        <FileUpload
          multiple
          id="card-multi"
          selectedFile={cardMulti}
          setSelectedFile={setCardMulti}
          onChange={handleChange(cardMulti, setCardMulti, true)}
          onDelete={handleRemove(cardMulti, setCardMulti)}
          title="Any file type"
          filePreviewClassName="grid grid-cols-3 gap-2 w-full"
        />
      </div>

      {/* 3. Compact row, single, with children */}
      <div className="space-y-2">
        <h2 className="font-semibold">3. Compact, single, with ProgressBar</h2>
        <FileUpload
          id="compact-single"
          showPreview={false}
          selectedFile={compactSingle}
          setSelectedFile={setCompactSingle}
          onChange={handleChange(compactSingle, setCompactSingle)}
          onDelete={handleRemove(compactSingle, setCompactSingle)}
          title="SVG, PNG, JPG or GIF (max. 800x400px)"
        >
          <ProgressBar progressColor="bg-primary-600" progress={50} />
        </FileUpload>
      </div>

      {/* 4. Compact row, multiple */}
      <div className="space-y-2">
        <h2 className="font-semibold">4. Compact, multiple</h2>
        <FileUpload
          multiple
          id="compact-multi"
          showPreview={false}
          selectedFile={compactMulti}
          setSelectedFile={setCompactMulti}
          onChange={handleChange(compactMulti, setCompactMulti, true)}
          onDelete={handleRemove(compactMulti, setCompactMulti)}
          title="Any file type"
        />
      </div>

      {/* 5. Existing files + delete disabled */}
      <div className="space-y-2">
        <h2 className="font-semibold">5. Existing files, delete disabled</h2>
        <FileUpload
          multiple
          id="existing"
          selectedFile={existingFiles}
          setSelectedFile={setExistingFiles}
          existingFileUrls={existingUrls}
          isDeleteDisabled
          onChange={handleChange(existingFiles, setExistingFiles, true)}
          onDelete={handleRemove(existingFiles, setExistingFiles)}
          title="Existing files come from URLs"
          filePreviewClassName="grid grid-cols-3 gap-2"
        />
      </div>

      {/* 6. Disabled */}
      <div className="space-y-2">
        <h2 className="font-semibold">6. Disabled</h2>
        <FileUpload id="disabled" disabled title="Upload is disabled" />
      </div>

      {/* 7. accept filter */}
      <div className="space-y-2">
        <h2 className="font-semibold">{`7. accept="image/png" only`}</h2>
        <FileUpload
          id="accept-png"
          accept="image/png"
          selectedFile={cardSingle}
          setSelectedFile={setCardSingle}
          onChange={handleChange(cardSingle, setCardSingle)}
          onDelete={handleRemove(cardSingle, setCardSingle)}
          title="PNG only"
        />
      </div>

      <FileSelector
        ref={fileRef}
        id="singleselect"
        component={
          <Button
            size="sm"
            variant="outlined"
            endIcon={<RiUpload2Line size={18} />}
          >
            Upload Single File
          </Button>
        }
        onChange={handleSingleChange}
      />
      {singleFile?.map((file, i) => (
        <FileUploadPreview
          key={`${file.name}-${i}`}
          file={file}
          index={i}
          onDelete={() => setSingleFile([])}
        />
      ))}

      <FileSelector
        ref={fileMultiRef}
        id="multiselect"
        component={<Button>Upload Multiple Files</Button>}
        multiple
        onChange={handleMultipleChange}
      />
      <section className="grid grid-cols-3 gap-4">
      {multiFiles?.map((file, i) => (
        <FileUploadPreview
          key={`${file.name}-${i}`}
          file={file}
          index={i}
          onDelete={(idx) =>
            setMultiFiles((prev) => prev.filter((_, j) => j !== idx))
          }
        />
      ))}
      </section>
    </section>
  );
};

export default FileUploadTest;

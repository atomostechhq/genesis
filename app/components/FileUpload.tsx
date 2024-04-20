import React,{ InputHTMLAttributes, useRef }  from "react";
import Upload2LineIcon from "remixicon-react/Upload2LineIcon";


interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, ""> {
  onFileSelect?: (files: File[]) => void;
}
const FileUpload = ({ onFileSelect }:FileUploadProps) => {
   
  const fileInputRef = useRef<HTMLInputElement>(null);
    const fileNameDisplayRef = useRef<HTMLParagraphElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click(); // Safely call click() if the ref is not null
    };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    let fileNames = '';
    if (files && files.length > 0) {
        const fileList = Array.from(files); // Convert FileList to array
        fileList.forEach((file, index) => {
            fileNames += `${file.name}${index < fileList.length - 1 ? ', ' : ''}`; // Concatenate file names
        });
        if (fileNameDisplayRef.current) {
            fileNameDisplayRef.current.textContent = `Selected files: ${fileNames}`;
        }
        if (onFileSelect) {
            onFileSelect(fileList);
        }
    } else {
        if (fileNameDisplayRef.current) {
            fileNameDisplayRef.current.textContent = 'No files selected'; // Clear text if no files are chosen
        }
    }
};

  return (
    <div className="max-w-lg h-[126px] border border-dashed border-gray-200 rounded-lg px-6 py-4 flex flex-col items-center gap-2">
       
       <input
                type="file"
                ref={fileInputRef}
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button onClick={handleUploadClick} className="flex items-center gap-2">
                <Upload2LineIcon />Upload Files
            </button>
            <p ref={fileNameDisplayRef}>No files selected</p>

      {/* {file && <p>File name: {file.name}</p>} */}
    
    </div>
  );
};

export default FileUpload;

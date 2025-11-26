"use client";

import ImageUploadControlled, { UploadItem } from "@/app/components/RazorPayFileUpload";
import React, { useState } from "react";

export default function SingleFileApiExample() {
  const [items, setItems] = useState<UploadItem[]>([]);

  const handleAddFiles = (files: File[]) => {
    // For single file upload, only take the first file
    const file = files[0];
    
    const newItem: UploadItem = {
      id: Math.random().toString(36).slice(2),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "idle",
    };

    // Replace existing file with new one for single upload
    setItems([newItem]);
    
    // Start API upload
    uploadToApi(newItem);
  };

  const uploadToApi = async (item: UploadItem) => {
    try {
      setItems(prev => prev.map(p => 
        p.id === item.id ? { ...p, status: "uploading", progress: 10 } : p
      ));

      const formData = new FormData();
      if (item.file) {
        formData.append('file', item.file);
      }

      // Single file upload API
      const response = await fetch('/api/upload/single', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();

      setItems(prev => prev.map(p => 
        p.id === item.id 
          ? { 
              ...p, 
              progress: 100, 
              status: "success",
              previewUrl: result.fileUrl,
            } 
          : p
      ));

    } catch (error) {
      setItems(prev => prev.map(p => 
        p.id === item.id 
          ? { ...p, progress: 0, status: "error" } 
          : p
      ));
      console.error('Upload failed:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const item = items.find(item => item.id === id);
    
    if (item?.status === "success" && item.previewUrl) {
      try {
        await fetch('/api/delete', {
          method: 'DELETE',
          body: JSON.stringify({ fileUrl: item.previewUrl }),
        });
      } catch (error) {
        console.error('Delete API call failed:', error);
      }
    }

    setItems([]); // Clear all items for single file
  };

  const handleRetry = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item) uploadToApi(item);
  };

  const handlePreview = (id: string) => {
    const item = items.find(item => item.id === id);
    if (item && item.status === "success") {
      console.log("Previewing item:", item);
      // Open preview modal or navigate to preview page
      window.open(item.previewUrl, '_blank');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Single File Upload</h1>
      <ImageUploadControlled
        items={items}
        onAddFiles={handleAddFiles}
        onDelete={handleDelete}
        onRetry={handleRetry}
        onPreview={handlePreview}
        multiple={false} // Single file mode
        accept="image/*, .pdf"
        maxSizeMB={15}
        hintText="Upload a single file - new file will replace existing one"
      />
    </div>
  );
}



// "use client";

// import ImageUploadControlled, { UploadItem } from "@/app/components/RazorPayFileUpload";
// import React, { useState } from "react";

// export default function MultipleFilesApiExample() {
//   const [items, setItems] = useState<UploadItem[]>([]);

//   const handleAddFiles = (files: File[]) => {
//     const newItems: UploadItem[] = files.map(file => ({
//       id: Math.random().toString(36).slice(2),
//       file,
//       name: file.name,
//       size: file.size,
//       progress: 0,
//       status: "idle",
//     }));

//     // Add new files to existing ones
//     setItems(prev => [...prev, ...newItems]);
    
//     // Start API upload for each new file
//     newItems.forEach(item => {
//       uploadToApi(item);
//     });
//   };

//   const uploadToApi = async (item: UploadItem) => {
//     try {
//       setItems(prev => prev.map(p => 
//         p.id === item.id ? { ...p, status: "uploading", progress: 10 } : p
//       ));

//       const formData = new FormData();
//       if (item.file) {
//         formData.append('files', item.file); // Note: 'files' for multiple
//       }

//       // Multiple files upload API (you might want to batch these)
//       const response = await fetch('/api/upload/multiple', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Upload failed');
//       }

//       const result = await response.json();
      
//       // Find the specific file result if API returns array
//       const fileResult = Array.isArray(result) 
//         ? result.find(r => r.originalName === item.name)
//         : result;

//       setItems(prev => prev.map(p => 
//         p.id === item.id 
//           ? { 
//               ...p, 
//               progress: 100, 
//               status: "success",
//               previewUrl: fileResult?.fileUrl,
//               name: fileResult?.fileName || p.name
//             } 
//           : p
//       ));

//     } catch (error) {
//       setItems(prev => prev.map(p => 
//         p.id === item.id 
//           ? { ...p, progress: 0, status: "error" } 
//           : p
//       ));
//       console.error('Upload failed for file:', item.name, error);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     const item = items.find(item => item.id === id);
    
//     if (item?.status === "success" && item.previewUrl) {
//       try {
//         await fetch('/api/delete', {
//           method: 'DELETE',
//           body: JSON.stringify({ fileUrl: item.previewUrl }),
//         });
//       } catch (error) {
//         console.error('Delete API call failed:', error);
//       }
//     }

//     setItems(prev => prev.filter(item => item.id !== id));
//   };

//   const handleRetry = (id: string) => {
//     const item = items.find(item => item.id === id);
//     if (item) uploadToApi(item);
//   };

//   const handlePreview = (id: string) => {
//     const item = items.find(item => item.id === id);
//     if (item && item.status === "success") {
//       console.log("Previewing item:", item);
//       window.open(item.previewUrl, '_blank');
//     }
//   };

//   // Batch delete all completed files
//   const handleDeleteAllCompleted = async () => {
//     const completedItems = items.filter(item => item.status === "success");
    
//     // Delete from server
//     for (const item of completedItems) {
//       if (item.previewUrl) {
//         try {
//           await fetch('/api/delete', {
//             method: 'DELETE',
//             body: JSON.stringify({ fileUrl: item.previewUrl }),
//           });
//         } catch (error) {
//           console.error('Delete failed for:', item.name, error);
//         }
//       }
//     }
    
//     // Remove from local state
//     setItems(prev => prev.filter(item => item.status !== "success"));
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Multiple Files Upload</h1>
      
//       {/* Batch actions for multiple files */}
//       {items.length > 0 && (
//         <div className="mb-4 flex gap-2">
//           <button
//             onClick={handleDeleteAllCompleted}
//             className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Delete All Completed
//           </button>
//           <div className="text-sm text-gray-600">
//             {items.filter(i => i.status === "success").length} / {items.length} completed
//           </div>
//         </div>
//       )}
      
//       <ImageUploadControlled
//         items={items}
//         onAddFiles={handleAddFiles}
//         onDelete={handleDelete}
//         onRetry={handleRetry}
//         onPreview={handlePreview}
//         multiple={true} // Multiple files mode
//         accept="image/*, .pdf, .doc, .docx"
//         maxSizeMB={15}
//         hintText="Upload multiple files - drag and drop or select multiple files"
//       />
//     </div>
//   );
// }
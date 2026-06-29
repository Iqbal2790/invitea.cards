"use client";

import { useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import imageCompression from 'browser-image-compression';

export default function PhotoUpload({ label, multiple = true, onChange }) {
  const [files, setFiles] = useState([]);

  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      // Filter for valid files
      const validFiles = selectedFiles.filter(file => {
        const isImage = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/webp";
        if (!isImage) alert(`${file.name} bukan format gambar yang didukung.`);
        return isImage;
      });

      if (validFiles.length === 0) return;

      setIsCompressing(true);

      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedPromises = validFiles.map(file => imageCompression(file, options));
        const compressedFiles = await Promise.all(compressedPromises);

        let newFiles = multiple ? [...files, ...compressedFiles] : compressedFiles;
        
        // Max 10 files
        if (multiple && newFiles.length > 10) {
          alert("Maksimal hanya diperbolehkan 10 foto.");
          newFiles = newFiles.slice(0, 10);
        }
        
        setFiles(newFiles);
        if (onChange) onChange(newFiles);
      } catch (error) {
        console.error("Error compressing images:", error);
        alert("Gagal mengompres gambar. Coba gunakan foto lain.");
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const removeFile = (indexToRemove) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    if (onChange) onChange(newFiles);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-center">
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileChange}
          disabled={isCompressing}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
            {isCompressing ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {isCompressing ? (
              <span className="font-semibold text-blue-600 dark:text-blue-400">Sedang mengompres gambar...</span>
            ) : (
              <><span className="font-semibold text-blue-600 dark:text-blue-400">Klik untuk upload</span> atau seret dan lepas foto di sini</>
            )}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Bebas ukuran, otomatis dicompress menjadi super ringan (Max. resolusi HD)
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 aspect-square bg-gray-100 dark:bg-gray-800">
              <img 
                src={URL.createObjectURL(file)} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

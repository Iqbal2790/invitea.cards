"use client";

import { useState } from "react";
import PhotoUpload from "./PhotoUpload";
import { Loader2 } from "lucide-react";

export default function DynamicForm({ fields = [], onSubmit, isLoading }) {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Helper to determine if a field is currently required.
  // For 'acara2', if 'acara2_nama' is filled, we make the other 'acara2_' fields required.
  const isFieldRequired = (field) => {
    if (field.name.startsWith("acara2_") && field.name !== "acara2_nama") {
      const hasAcara2Name = formData["acara2_nama"] && formData["acara2_nama"].trim().length > 0;
      return hasAcara2Name;
    }
    return field.required;
  };

  const renderField = (field) => {
    const required = isFieldRequired(field);
    const commonClasses = 
      "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none";

    switch (field.type) {
      case "photo":
        return (
          <PhotoUpload
            label={
              <span>
                {field.label} {required && <span className="text-red-500">*</span>}
              </span>
            }
            multiple={field.multiple}
            onChange={(files) => handleChange(field.name, files)}
          />
        );
      
      case "textarea":
        return (
          <textarea
            name={field.name}
            placeholder={field.placeholder || ""}
            required={required}
            rows={4}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={`${commonClasses} resize-none`}
          />
        );

      case "date":
      case "time":
      case "url":
      case "text":
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder || ""}
            required={required}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            className={commonClasses}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col space-y-2">
          {field.type !== "photo" && (
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label} {isFieldRequired(field) && <span className="text-red-500">*</span>}
            </label>
          )}
          {renderField(field)}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Memproses...
          </>
        ) : (
          "Lanjutkan"
        )}
      </button>
    </form>
  );
}

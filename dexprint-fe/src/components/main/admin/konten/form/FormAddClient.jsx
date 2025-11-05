/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../../../../../services/axios.service";
import { useAlert } from "../../../../../store/AlertContext";

// ✅ Validasi pakai Yup
const schema = yup.object().shape({
  clientName: yup
    .string()
    .required("Client name is required")
    .min(2, "Too short")
    .max(50, "Too long"),
  logo: yup
    .mixed()
    .required("Logo is required")
    .test("fileSize", "Max file size is 2MB", (value) => {
      if (!value?.length) return false;
      return value[0].size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Only image files allowed", (value) => {
      if (!value?.length) return false;
      return ["image/jpeg", "image/png", "image/webp"].includes(value[0].type);
    }),
});

export function FormAddClient({ onSuccess, onClose }) {
  const [preview, setPreview] = useState(null);
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const logoFile = watch("logo");

  // 🖼️ preview logo
  useEffect(() => {
    if (logoFile?.[0]) {
      const url = URL.createObjectURL(logoFile[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [logoFile]);

  // 🚀 Submit data
  const onSubmit = async (data) => {
    try {
      //   console.log("🧾 data.logo:", data.logo?.[0]);

      const formData = new FormData();
      formData.append("name", data.clientName);
      formData.append("logo", data.logo?.[0]);

      //   for (let [key, val] of formData.entries()) console.log(key, val);

      await api.post("/master/client", formData);

      showAlert("success", "Insert Client Successfully!");
      reset();
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(error);
      showAlert("error", "Insert Client failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Client Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Name
        </label>
        <input
          type="text"
          {...register("clientName")}
          placeholder="Enter client name"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${
            errors.clientName ? "border-red-400" : "border-gray-300"
          }`}
        />
        {errors.clientName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.clientName.message}
          </p>
        )}
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Logo
        </label>
        <div
          onClick={() => document.getElementById("logo").click()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-orange-50 transition-all ${
            errors.logo
              ? "border-red-400 bg-red-50"
              : "border-gray-300 hover:border-orange-400"
          }`}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-contain mb-2"
            />
          ) : (
            <>
              <FiUploadCloud size={36} className="text-gray-400 mb-2" />
              <p className="text-gray-500 text-sm">Click to upload logo</p>
            </>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          id="logo"
          className="hidden"
          {...register("logo", {
            onChange: (e) => {
              const file = e.target.files[0];
              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            },
          })}
        />

        {errors.logo && (
          <p className="text-red-500 text-xs mt-1">{errors.logo.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";
import api from "../../../../../services/axios.service";
import { useAlert } from "../../../../../store/AlertContext";
import { baseApi } from "../../../../../services/api.service";

export function FormAddReview({ onClose, defaultValue, mode = "add" }) {
  const { showAlert } = useAlert();

  const [form, setForm] = useState({
    name: "",
    feedback: "",
    tenant: "",
    fileIMG: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Prefill data ketika edit
  useEffect(() => {
    if (defaultValue) {
      setForm({
        name: defaultValue.name,
        feedback: defaultValue.feedback,
        tenant: defaultValue.tenant,
        fileIMG: null,
      });
      if (defaultValue.fileIMG)
        setPreview(`${baseApi}master/file/${defaultValue.fileIMG}`);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, fileIMG: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, fileIMG: null }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("feedback", form.feedback);
      formData.append("tenant", form.tenant);
      if (form.fileIMG) formData.append("fileIMG", form.fileIMG);

      if (mode === "edit" && defaultValue?.reviewId) {
        await api.put(`/master/review/${defaultValue.reviewId}`, formData);
        showAlert("success", "Review updated successfully!");
      } else {
        await api.post("/master/review", formData);
        showAlert("success", "Review added successfully!");
      }

      onClose();
    } catch (error) {
      showAlert("error", "Failed to save review!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tenant
        </label>
        <input
          type="text"
          name="tenant"
          value={form.tenant}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Feedback
        </label>
        <textarea
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          rows="3"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>

        {preview ? (
          <div className="relative w-28 h-28">
            <img
              src={preview}
              alt="Preview"
              className="w-28 h-28 object-cover rounded-full border border-gray-200 shadow-sm"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <FiX size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <FiUpload className="text-gray-400 mb-1" size={20} />
            <span className="text-xs text-gray-500">Click to upload photo</span>
            <input
              type="file"
              name="fileIMG"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading
            ? "Saving..."
            : mode === "edit"
            ? "Update Review"
            : "Save Review"}
        </button>
      </div>
    </form>
  );
}

/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiSave,
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiCalendar,
  FiTarget,
  FiFlag,
} from "react-icons/fi";
import api from "../../../../services/axios.service";
import { useAlert } from "../../../../store/AlertContext";

export default function CompanyProfileInfo({ profile = {} }) {
  const [editField, setEditField] = useState(null);
  const { showAlert } = useAlert();
  const [field, setField] = useState({
    companyName: "",
    phone: "",
    email: "",
    established: "",
    websiteName: "",
    employees: 0,
    address: "",
    description: "",
    vision: "",
    mission: "",
  });

  // ⏳ Load data dari props profile
  useEffect(() => {
    if (profile) {
      setField({
        companyName: profile.companyName || "",
        phone: profile.phone || "",
        email: profile.email || "",
        established: profile.established || "",
        websiteName: profile.websiteName || "",
        employees: profile.employees || 0,
        address: profile.address || "",
        description: profile.description || "",
        vision: profile.vision || "",
        mission: profile.mission || "",
      });
    }
  }, [profile]);

  const handleEdit = (name) => setEditField(name);

  const onChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/master/profile/${profile.profileId}`, field);
      showAlert("success", "Update Profile successfully!");
      setEditField(null);
    } catch (error) {
      console.error(error);
      showAlert("error", "Update Profile Failed!");
    }
  };

  const handleCancel = () => {
    setField({
      companyName: profile.companyName || "",
      phone: profile.phone || "",
      email: profile.email || "",
      established: profile.established || "",
      websiteName: profile.websiteName || "",
      employees: profile.employees || 0,
      address: profile.address || "",
      description: profile.description || "",
      vision: profile.vision || "",
      mission: profile.mission || "",
    });
    setEditField(null);
  };

  const renderEditableField = (label, name, icon, type = "text") => (
    <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-2 text-gray-500">
        <div className="text-orange-500">{icon}</div>
        <span className="uppercase text-xs font-semibold tracking-wide">
          {label}
        </span>
      </div>
      {editField === name ? (
        <div className="flex items-center gap-2">
          <input
            type={type}
            name={name}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
            value={
              type === "month" && field[name]
                ? moment(field[name]).format("YYYY-MM")
                : field[name]
            }
            onChange={onChange}
          />
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
          >
            <FiSave size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-600 p-2 rounded-lg hover:bg-gray-300 transition"
          >
            <FiX size={16} />
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <p className="text-gray-800 text-sm leading-relaxed break-words">
            {name === "established"
              ? field[name]
                ? moment(field[name]).format("MMMM YYYY")
                : "-"
              : field[name] || "-"}
          </p>
          <button
            onClick={() => handleEdit(name)}
            className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
          >
            <FiEdit2 size={16} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full bg-linear-to-br from-orange-50 via-white to-orange-100 px-6 py-5">
      {/* Header */}
      <div className="max-w-full mx-auto mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Company Profile
            </h1>
            <p className="text-gray-500 text-sm">
              Manage your business details easily
            </p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {renderEditableField(
          "Company Name",
          "companyName",
          <FiGlobe size={18} />
        )}
        {renderEditableField("Email", "email", <FiMail size={18} />, "email")}
        {renderEditableField("Phone", "phone", <FiPhone size={18} />)}
        {renderEditableField("Website", "websiteName", <FiGlobe size={18} />)}
        {renderEditableField(
          "Established",
          "established",
          <FiCalendar size={18} />,
          "month"
        )}
        {renderEditableField(
          "Employees",
          "employees",
          <FiUsers size={18} />,
          "number"
        )}
      </div>

      {/* Address */}
      <div className="max-w-full mx-auto mt-5">
        {renderEditableField("Address", "address", <FiMapPin size={18} />)}
      </div>

      {/* Description */}
      <div className="max-w-full mx-auto mt-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase text-gray-500 font-semibold tracking-wide">
            Company Description
          </span>
          {editField !== "description" && (
            <button
              onClick={() => handleEdit("description")}
              className="text-gray-400 hover:text-orange-500 transition"
            >
              <FiEdit2 size={16} />
            </button>
          )}
        </div>

        {editField === "description" ? (
          <div className="flex flex-col gap-3">
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none min-h-[100px]"
              value={field.description}
              onChange={onChange}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {field.description || "-"}
          </p>
        )}
      </div>

      {/* Vision */}
      <div className="max-w-full mx-auto mt-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase text-gray-500 font-semibold tracking-wide flex items-center gap-1">
            <FiTarget className="text-orange-500" /> Vision
          </span>
          {editField !== "vision" && (
            <button
              onClick={() => handleEdit("vision")}
              className="text-gray-400 hover:text-orange-500 transition"
            >
              <FiEdit2 size={16} />
            </button>
          )}
        </div>

        {editField === "vision" ? (
          <div className="flex flex-col gap-3">
            <textarea
              name="vision"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none min-h-[80px]"
              value={field.vision}
              onChange={onChange}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {field.vision || "-"}
          </p>
        )}
      </div>

      {/* Mission */}
      <div className="max-w-full mx-auto mt-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs uppercase text-gray-500 font-semibold tracking-wide flex items-center gap-1">
            <FiFlag className="text-orange-500" /> Mission
          </span>
          {editField !== "mission" && (
            <button
              onClick={() => handleEdit("mission")}
              className="text-gray-400 hover:text-orange-500 transition"
            >
              <FiEdit2 size={16} />
            </button>
          )}
        </div>

        {editField === "mission" ? (
          <div className="flex flex-col gap-3">
            <textarea
              name="mission"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none min-h-[80px]"
              value={field.mission}
              onChange={onChange}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {field.mission || "-"}
          </p>
        )}
      </div>
    </div>
  );
}

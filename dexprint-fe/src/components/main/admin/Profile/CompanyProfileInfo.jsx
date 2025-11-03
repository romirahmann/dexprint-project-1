/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiSave,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiCalendar,
} from "react-icons/fi";

export default function CompanyProfileInfo({ profile = {} }) {
  const [editField, setEditField] = useState(null);

  const [field, setField] = useState({
    companyName: "",
    phone: "",
    email: "",
    established: "",
    websiteName: "",
    employees: 0,
    address: "",
    description: "",
  });

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
      });
    }
  }, [profile]);

  const handleEdit = (name) => {
    setEditField(name);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("✅ Saving:", field);
    setEditField(null);
  };

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
        {/* Company Name */}
        <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-orange-500">
              <FiGlobe size={18} />
            </div>
            <span className="uppercase text-xs font-semibold tracking-wide">
              Company Name
            </span>
          </div>
          {editField === "companyName" ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="companyName"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={field.companyName}
                onChange={onChange}
              />
              <button
                onClick={() => handleSave("companyName")}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FiSave size={16} />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
                {field.companyName || "-"}
              </p>
              <button
                onClick={() => handleEdit("companyName")}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Email */}
        <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-orange-500">
              <FiMail size={18} />
            </div>
            <span className="uppercase text-xs font-semibold tracking-wide">
              Email
            </span>
          </div>
          {editField === "email" ? (
            <div className="flex items-center gap-2">
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={field.email}
                onChange={onChange}
              />
              <button
                onClick={() => handleSave("email")}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FiSave size={16} />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
                {field.email || "-"}
              </p>
              <button
                onClick={() => handleEdit("email")}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Phone */}
        <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-orange-500">
              <FiPhone size={18} />
            </div>
            <span className="uppercase text-xs font-semibold tracking-wide">
              Phone
            </span>
          </div>
          {editField === "phone" ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="phone"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={field.phone}
                onChange={onChange}
              />
              <button
                onClick={() => handleSave("phone")}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FiSave size={16} />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
                {field.phone || "-"}
              </p>
              <button
                onClick={() => handleEdit("phone")}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Website */}
        <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-orange-500">
              <FiGlobe size={18} />
            </div>
            <span className="uppercase text-xs font-semibold tracking-wide">
              Website
            </span>
          </div>
          {editField === "websiteName" ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="websiteName"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={field.websiteName}
                onChange={onChange}
              />
              <button
                onClick={() => handleSave("websiteName")}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FiSave size={16} />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
                {field.websiteName || "-"}
              </p>
              <button
                onClick={() => handleEdit("websiteName")}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Established */}
        <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-orange-500">
              <FiCalendar size={18} />
            </div>
            <span className="uppercase text-xs font-semibold tracking-wide">
              Established
            </span>
          </div>
          {editField === "established" ? (
            <div className="flex items-center gap-2">
              <input
                type="month"
                name="established"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={
                  field.established
                    ? moment(field.established).format("YYYY-MM")
                    : ""
                }
                onChange={onChange}
              />
              <button
                onClick={() => handleSave("established")}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FiSave size={16} />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
                {field.established
                  ? moment(field.established).format("MMMM YYYY")
                  : "-"}
              </p>
              <button
                onClick={() => handleEdit("established")}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Employees */}
        <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-orange-500">
              <FiUsers size={18} />
            </div>
            <span className="uppercase text-xs font-semibold tracking-wide">
              Employees
            </span>
          </div>
          {editField === "employees" ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="employees"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={field.employees}
                onChange={onChange}
              />
              <button
                onClick={() => handleSave("employees")}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FiSave size={16} />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
                {field.employees || 0}
              </p>
              <button
                onClick={() => handleEdit("employees")}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="max-w-full mx-auto mt-5">
        <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <div className="text-orange-500">
              <FiMapPin size={18} />
            </div>
            <span className="uppercase text-xs font-semibold tracking-wide">
              Address
            </span>
          </div>
          {editField === "address" ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                value={field.address}
                onChange={onChange}
              />
              <button
                onClick={() => handleSave("address")}
                className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
              >
                <FiSave size={16} />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
                {field.address || "-"}
              </p>
              <button
                onClick={() => handleEdit("address")}
                className="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
            </div>
          )}
        </div>
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
            <div className="flex justify-end">
              <button
                onClick={() => handleSave("description")}
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
    </div>
  );
}

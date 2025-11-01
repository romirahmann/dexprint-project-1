import { useState } from "react";
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

export default function CompanyProfileInfo() {
  const [profile, setProfile] = useState({
    companyName: "Dexprint",
    email: "contact@dexprint.co.id",
    phone: "+62 812 3456 7890",
    address: "Jl. Raya Karawang No.88, Karawang Barat, Jawa Barat",
    website: "www.dexprint.co.id",
    established: "2008",
    employees: "120",
    description:
      "Dexprint adalah percetakan besar di Karawang yang melayani kebutuhan cetak berkualitas tinggi untuk perusahaan, UMKM, dan instansi.",
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (field) => {
    setEditField(field);
    setTempValue(profile[field]);
  };

  const handleSave = (field) => {
    setProfile({ ...profile, [field]: tempValue });
    setEditField(null);
  };

  const renderField = (label, field, icon) => (
    <div className="group relative p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3 mb-2 text-gray-500">
        <div className="text-orange-500">{icon}</div>
        <span className="uppercase text-xs font-semibold tracking-wide">
          {label}
        </span>
      </div>

      {editField === field ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
          <button
            onClick={() => handleSave(field)}
            className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition"
          >
            <FiSave size={16} />
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <p className="text-gray-800 text-sm leading-relaxed warp-break-words">
            {profile[field]}
          </p>
          <button
            onClick={() => handleEdit(field)}
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
        {renderField("Company Name", "companyName", <FiGlobe size={18} />)}
        {renderField("Email", "email", <FiMail size={18} />)}
        {renderField("Phone", "phone", <FiPhone size={18} />)}
        {renderField("Website", "website", <FiGlobe size={18} />)}
        {renderField("Established", "established", <FiCalendar size={18} />)}
        {renderField("Employees", "employees", <FiUsers size={18} />)}
      </div>

      {/* Address */}
      <div className="max-w-full mx-auto mt-5">
        {renderField("Address", "address", <FiMapPin size={18} />)}
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
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none min-h-[100px]"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
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
            {profile.description}
          </p>
        )}
      </div>
    </div>
  );
}

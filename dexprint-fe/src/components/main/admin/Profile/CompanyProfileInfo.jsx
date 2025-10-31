import { useState } from "react";
import {
  FiEdit2,
  FiSave,
  FiPhone,
  FiMail,
  FiMapPin,
  FiGlobe,
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
      "Dexprint adalah percetakan besar di Karawang yang melayani kebutuhan cetak berkualitas tinggi untuk perusahaan, UMKM, dan instansi. Kami mengutamakan kecepatan, presisi, dan hasil terbaik.",
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

  const renderEditableField = (label, field, icon) => (
    <div className="flex items-start gap-4 py-3 px-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="text-orange-500 mt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">
          {label}
        </p>

        {editField === field ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:border-orange-400 outline-none"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <button
              onClick={() => handleSave(field)}
              className="text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
            >
              <FiSave size={16} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-700 text-sm">{profile[field]}</p>
            <button
              onClick={() => handleEdit(field)}
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <FiEdit2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {renderEditableField(
        "Company Name",
        "companyName",
        <FiGlobe size={18} />
      )}
      {renderEditableField("Email", "email", <FiMail size={18} />)}
      {renderEditableField("Phone Number", "phone", <FiPhone size={18} />)}
      {renderEditableField("Address", "address", <FiMapPin size={18} />)}
      {renderEditableField("Website", "website", <FiGlobe size={18} />)}
      {renderEditableField("Established", "established", <FiGlobe size={18} />)}
      {renderEditableField("Employees", "employees", <FiGlobe size={18} />)}

      {/* Description */}
      <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
        <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wide">
          Company Description
        </p>

        {editField === "description" ? (
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none min-h-[100px]"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleSave("description")}
                className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-start">
            <p className="text-gray-700 text-sm leading-relaxed">
              {profile.description}
            </p>
            <button
              onClick={() => handleEdit("description")}
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <FiEdit2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

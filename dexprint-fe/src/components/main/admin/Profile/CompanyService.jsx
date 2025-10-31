import { useState } from "react";
import { FiEdit2, FiSave, FiPlus, FiTrash2 } from "react-icons/fi";

export default function CompanyServices() {
  const [services, setServices] = useState([
    "Digital Printing & Offset",
    "Packaging Design & Print",
    "Banner & Large Format Print",
    "Label & Sticker Printing",
    "Merchandise Custom (Mug, T-shirt, Notebook)",
  ]);

  const [newService, setNewService] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleAdd = () => {
    if (!newService.trim()) return;
    setServices([...services, newService.trim()]);
    setNewService("");
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempValue(services[index]);
  };

  const handleSave = (index) => {
    const updated = [...services];
    updated[index] = tempValue;
    setServices(updated);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Our Services</h2>
      </div>

      <ul className="space-y-3">
        {services.map((service, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-2 text-sm"
          >
            {editingIndex === index ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:border-orange-400 outline-none"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                />
                <button
                  onClick={() => handleSave(index)}
                  className="text-white bg-orange-500 hover:bg-orange-600 p-1.5 rounded-lg"
                >
                  <FiSave size={14} />
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-700">{service}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-gray-400 hover:text-orange-500 transition"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add new service */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Add new service..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-orange-400 outline-none"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          <FiPlus size={16} />
        </button>
      </div>
    </div>
  );
}

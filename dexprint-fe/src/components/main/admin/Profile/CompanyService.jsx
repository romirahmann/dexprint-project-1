import { useState } from "react";
import { FiEdit2, FiSave, FiPlus, FiTrash2, FiImage } from "react-icons/fi";

export default function CompanyService() {
  const [services, setServices] = useState([
    {
      name: "Digital Printing & Offset",
      image:
        "https://images.unsplash.com/photo-1611078489935-0cb964de46c6?auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Packaging Design & Print",
      image:
        "https://images.unsplash.com/photo-1606220838310-d247b8b63d8b?auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Banner & Large Format Print",
      image:
        "https://images.unsplash.com/photo-1607419726999-48e446b84c35?auto=format&fit=crop&w=400&q=60",
    },
  ]);

  const [newService, setNewService] = useState({ name: "", image: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempValue, setTempValue] = useState({ name: "", image: "" });

  const handleAdd = () => {
    if (!newService.name.trim() || !newService.image.trim()) return;
    setServices([...services, newService]);
    setNewService({ name: "", image: "" });
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
    <div className="bg-white/90 backdrop-blur border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Our Services</h2>
        <p className="text-gray-500 text-sm mt-1 sm:mt-0">
          Manage your company offerings
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-white to-orange-50 border border-orange-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-36 w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
            </div>

            {/* Content */}
            <div className="p-4">
              {editingIndex === index ? (
                <div className="flex flex-col gap-2">
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                    value={tempValue.name}
                    onChange={(e) =>
                      setTempValue({ ...tempValue, name: e.target.value })
                    }
                  />
                  <input
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                    value={tempValue.image}
                    placeholder="Image URL"
                    onChange={(e) =>
                      setTempValue({ ...tempValue, image: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleSave(index)}
                    className="self-end bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600 transition"
                  >
                    <FiSave size={14} className="inline mr-1" /> Save
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-gray-800 font-semibold text-base mb-2">
                    {service.name}
                  </h3>
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-gray-300 hover:text-orange-500"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-gray-300 hover:text-red-500"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-orange-200 rounded-2xl p-6 hover:border-orange-400 hover:bg-orange-50/50 transition">
          <FiImage size={28} className="text-orange-400 mb-3" />
          <input
            type="text"
            placeholder="Service name..."
            className="w-full text-center border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0 mb-2 placeholder:text-gray-400"
            value={newService.name}
            onChange={(e) =>
              setNewService({ ...newService, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL..."
            className="w-full text-center border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0 mb-3 placeholder:text-gray-400"
            value={newService.image}
            onChange={(e) =>
              setNewService({ ...newService, image: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button
            onClick={handleAdd}
            className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
          >
            <FiPlus size={16} /> Add Service
          </button>
        </div>
      </div>
    </div>
  );
}

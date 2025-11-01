import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function BrandPartnerSection() {
  const [brands, setBrands] = useState([
    { name: "Tokopedia", logo: "/assets/tokopedia.png" },
    { name: "Grab", logo: "/assets/grab.png" },
    { name: "Pertamina", logo: "/assets/pertamina.png" },
  ]);

  const addBrand = () =>
    setBrands([...brands, { name: "New Brand", logo: "/assets/default.png" }]);
  const removeBrand = (i) => setBrands(brands.filter((_, idx) => idx !== i));

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Partnered Brands
        </h2>
        <button
          onClick={addBrand}
          className="flex items-center gap-2 text-sm bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
        >
          <FiPlus /> Add
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {brands.map((b, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-gray-50 rounded-xl p-3 border border-gray-100 hover:shadow-sm transition-all"
          >
            <img
              src={b.logo}
              alt={b.name}
              className="w-16 h-16 object-contain mb-2"
            />
            <p className="text-sm font-medium text-gray-700">{b.name}</p>
            <button
              onClick={() => removeBrand(i)}
              className="mt-2 text-gray-400 hover:text-red-500"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

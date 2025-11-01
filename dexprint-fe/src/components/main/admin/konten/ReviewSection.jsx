import { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([
    { name: "Andi", comment: "Hasil cetaknya cepat dan berkualitas!" },
    { name: "Rina", comment: "Pelayanan ramah dan profesional." },
  ]);

  const addReview = () =>
    setReviews([...reviews, { name: "New Customer", comment: "..." }]);
  const deleteReview = (i) => setReviews(reviews.filter((_, idx) => idx !== i));

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Customer Reviews
        </h2>
        <button
          onClick={addReview}
          className="flex items-center gap-2 text-sm bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
        >
          <FiPlus /> Add
        </button>
      </div>

      <div className="space-y-3">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="flex justify-between items-start border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-all"
          >
            <div>
              <p className="font-medium text-gray-800">{r.name}</p>
              <p className="text-gray-600 text-sm">{r.comment}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-orange-500">
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => deleteReview(i)}
                className="text-gray-400 hover:text-red-500"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

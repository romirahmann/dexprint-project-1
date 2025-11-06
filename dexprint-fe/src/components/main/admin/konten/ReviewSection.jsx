/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { Modal } from "../../../../shared/Modal";
import { useAlert } from "../../../../store/AlertContext";
import api from "../../../../services/axios.service";
import { baseApi } from "../../../../services/api.service";
import { listenToUpdate } from "../../../../services/socket.service";
import { FormAddReview } from "./form/FormAddReview";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(null); // ✅ new state
  const { showAlert } = useAlert();

  // 🔁 Fetch data dari backend
  const fetchReview = useCallback(async () => {
    try {
      const res = await api.get("/master/reviews");
      setReviews(res.data.data);
    } catch (error) {
      console.log("❌ Error fetching reviews:", error);
    }
  }, []);

  useEffect(() => {
    fetchReview();

    const events = ["review:create", "review:update", "review:delete"];
    events.forEach((event) => listenToUpdate(event, fetchReview));
  }, [fetchReview]);

  // 🗑️ Hapus review
  const removeReview = async (val) => {
    try {
      await api.delete(`/master/review/${val.review.reviewId}`);
      showAlert("success", "Deleted Review Successfully!");
      setReviews(reviews.filter((_, idx) => idx !== val.i));
    } catch (error) {
      showAlert("error", "Delete Review Failed!");
      console.log("❌ Delete Review Error:", error);
    }
  };

  // ✏️ Edit review handler
  const handleEdit = (review) => {
    setEditData(review);
    setModal(true);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Customer Reviews
        </h2>
        <button
          onClick={() => {
            setEditData(null); // reset
            setModal(true);
          }}
          className="flex items-center gap-2 text-sm bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
        >
          <FiPlus /> Add
        </button>
      </div>

      {/* Daftar Review */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="flex flex-col bg-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={
                  review.fileIMG
                    ? `${baseApi}master/file/${review.fileIMG}`
                    : "/assets/default-avatar.png"
                }
                alt={review.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-xs text-gray-500">{review.tenant}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm italic mb-3">
              “{review.feedback}”
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => handleEdit(review)}
                className="text-gray-400 hover:text-orange-500"
              >
                <FiEdit2 size={16} />
              </button>
              <button
                onClick={() => removeReview({ review, i })}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah/Edit Review */}
      {modal && (
        <Modal
          isOpen={modal}
          onClose={() => setModal(false)}
          title={editData ? "Edit Review" : "Add Review"}
        >
          <FormAddReview
            onClose={() => setModal(false)}
            defaultValue={editData}
            mode={editData ? "edit" : "add"}
          />
        </Modal>
      )}
    </div>
  );
}

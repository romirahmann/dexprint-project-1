/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { Modal } from "../../../../shared/Modal";
import { FormAddClient } from "./form/FormAddClient";
import api from "../../../../services/axios.service";
import { ApiUrl, baseApi } from "../../../../services/api.service";
import { useAlert } from "../../../../store/AlertContext";
import { listenToUpdate } from "../../../../services/socket.service";

export default function ClientSection() {
  const [brands, setBrands] = useState([]);
  const [modal, setModal] = useState(false);
  const { showAlert } = useAlert();

  const fetchClient = useCallback(async () => {
    try {
      let res = await api.get("/master/clients");
      setBrands(res.data.data);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchClient();

    const events = ["client:create", "client:update", "client:delete"];
    events.forEach((event) => listenToUpdate(event, fetchClient));
  }, [fetchClient]);

  const addBrand = () =>
    setBrands([...brands, { name: "New Brand", logo: "/assets/default.png" }]);

  const removeBrand = async (val) => {
    try {
      await api.delete(`/master/client/${val.client.clientId}`);
      showAlert("success", "Deleted Client Successfully!");
      setBrands(brands.filter((_, idx) => idx !== val.i));
    } catch (error) {
      showAlert("error", "Deleted Client failed!");
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Clients</h2>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 text-sm bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
        >
          <FiPlus /> Add
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {brands.map((client, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-gray-50 rounded-xl p-3 border border-gray-100 hover:shadow-sm transition-all"
          >
            <img
              src={`${baseApi}master/file/${client.clientLogo}`}
              alt={client.clientName}
              className="w-16 h-16 object-contain mb-2"
            />
            <p className="text-sm font-medium text-gray-700">
              {client.clientName}
            </p>
            <button
              onClick={() => removeBrand({ client, i })}
              className="mt-2 text-gray-400 hover:text-red-500"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          onClose={() => setModal(false)}
          title="Add Client"
        >
          <FormAddClient onClose={() => setModal(false)} />
        </Modal>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getAllDlc,
  addDlc,
  updateDlc,
  deleteDlc,
} from "../services/DlcService";
import { IoCloseCircle } from "react-icons/io5";

const DlcAdmin = () => {
  const [dlcs, setDlcs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    gameId: "",
    title: "",
    cardImg: "",
    baseGameTitle: "",
    dlcCategory: "",
    price: "",
    discount: "",
    releaseDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchDlcs();
  }, []);

  const fetchDlcs = async () => {
    const data = await getAllDlc();
    setDlcs(data);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateDlc(formData.id, formData);
      } else {
        const newItem = { ...formData, id: uuidv4() };
        await addDlc(newItem);
      }
      await fetchDlcs();
      resetForm();
      setShowModal(false);
    } catch (err) {
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteDlc(id);
      await fetchDlcs();
    } catch (err) {
      alert("Silinmə zamanı xəta baş verdi.");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      gameId: "",
      title: "",
      cardImg: "",
      baseGameTitle: "",
      dlcCategory: "",
      price: "",
      discount: "",
      releaseDate: "",
    });
    setIsEditing(false);
  };

  return (
    <div className=" text-white min-h-screen p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">DLC Management</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          + Add DLC
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Base Game</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Discount</th>
              <th className="px-4 py-2">Release Date</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dlcs.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.baseGameTitle}</td>
                <td className="px-4 py-2">{item.dlcCategory}</td>
                <td className="px-4 py-2">${item.price}</td>
                <td className="px-4 py-2">{item.discount}%</td>
                <td className="px-4 py-2">{item.releaseDate}</td>
                <td className="px-4 py-2">
                  <img src={item.cardImg} alt={item.title} className="w-20 h-auto rounded" />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#101014] p-6 rounded-xl max-w-2xl w-full relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit DLC" : "Add DLC"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <IoCloseCircle size={30} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "title", label: "Title" },
                { name: "baseGameTitle", label: "Base Game Title" },
                { name: "dlcCategory", label: "DLC Category" },
                { name: "price", label: "Price", type: "number" },
                { name: "discount", label: "Discount (%)", type: "number" },
                { name: "releaseDate", label: "Release Date", type: "date" },
                { name: "cardImg", label: "Card Image URL" },
              ].map(({ name, label, type = "text" }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="mb-1 text-sm">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={label}
                    className="bg-[#202024] p-2 rounded text-sm text-white placeholder-gray-400"
                    required
                  />
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  {isEditing ? "Save Changes" : "Add DLC"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DlcAdmin;

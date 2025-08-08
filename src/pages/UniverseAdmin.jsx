import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getAllUniverse,
  addUniverse,
  updateUniverse,
  deleteUniverse,
} from "../services/UniverseService";
import { IoCloseCircle } from "react-icons/io5";

const UniverseAdmin = () => {
  const [universes, setUniverses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    cardImg: "",
    sectionImg: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUniverses();
  }, []);

  const fetchUniverses = async () => {
    const data = await getAllUniverse();
    setUniverses(data);
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
        await updateUniverse(formData.id, formData);
      } else {
        const newItem = { ...formData, id: uuidv4() };
        await addUniverse(newItem);
      }
      await fetchUniverses();
      resetForm();
      setShowModal(false);
    } catch (err) {
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteUniverse(id);
      await fetchUniverses();
    } catch (err) {
      alert("Silinmə zamanı xəta baş verdi.");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      cardImg: "",
      sectionImg: "",
    });
    setIsEditing(false);
  };

  return (
    <div className=" text-white min-h-screen p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Universe Management</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          + Add Universe
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Card Image</th>
              <th className="px-4 py-2">Section Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {universes.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">
                  <img src={item.cardImg} className="w-24 h-auto rounded" />
                </td>
                <td className="px-4 py-2">
                  <img src={item.sectionImg} className="w-24 h-auto rounded" />
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
                {isEditing ? "Edit Universe" : "Add Universe"}
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
                { name: "cardImg", label: "Card Image URL" },
                { name: "sectionImg", label: "Section Image URL" },
              ].map(({ name, label }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="mb-1 text-sm">
                    {label}
                  </label>
                  <input
                    type="text"
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
                  {isEditing ? "Save Changes" : "Add Universe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniverseAdmin;

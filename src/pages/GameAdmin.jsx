import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllGame, addGame, updateGame, deleteGame } from "../services/GameadminService";
import { IoCloseCircle } from "react-icons/io5";

const GameAdmin = () => {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    type: "",
    logo: "",
    cardImg: "",
    releaseDate: "",
    shortDescription: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const data = await getAllGame();
    setGames(data);
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
        await updateGame(formData.id, formData);
      } else {
        const newItem = { ...formData, id: uuidv4() };
        await addGame(newItem);
      }
      await fetchGames();
      resetForm();
      setShowModal(false);
    } catch (err) {
      alert("Əməliyyat zamanı xəta baş verdi");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteGame(id);
      await fetchGames();
    } catch (err) {
      alert("Silinmə zamanı xəta baş verdi");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      price: "",
      type: "",
      logo: "",
      cardImg: "",
      releaseDate: "",
      shortDescription: "",
    });
    setIsEditing(false);
  };

  return (
    <div className=" text-white min-h-screen p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Game Management</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          + Add Game
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Card Img</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{game.title}</td>
                <td className="px-4 py-2">{game.type}</td>
                <td className="px-4 py-2">${game.price}</td>
                <td className="px-4 py-2">
                  <img src={game.cardImg} className="w-16 h-auto rounded" />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openEditModal(game)}
                    className="text-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(game.id)}
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
          <div className="bg-[#101014] p-6 rounded-xl max-w-3xl w-full relative">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? "Edit Game" : "Add Game"}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }}>
                <IoCloseCircle size={30} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "title", label: "Title" },
                { name: "type", label: "Type" },
                { name: "price", label: "Price", type: "number" },
                { name: "logo", label: "Logo URL" },
                { name: "cardImg", label: "Card Image URL" },
                { name: "releaseDate", label: "Release Date" },
              ].map(({ name, label, type = "text" }) => (
                <div key={name} className="flex flex-col">
                  <label htmlFor={name} className="mb-1 text-sm">{label}</label>
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

              <div className="col-span-1 md:col-span-2">
                <label htmlFor="shortDescription" className="mb-1 text-sm">Short Description</label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Short Description"
                  className="bg-[#202024] p-2 w-full rounded text-sm text-white placeholder-gray-400"
                  rows={3}
                  required
                />
              </div>

              <div className="col-span-2 flex justify-end mt-4">
                <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
                  {isEditing ? "Save Changes" : "Add Game"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameAdmin;


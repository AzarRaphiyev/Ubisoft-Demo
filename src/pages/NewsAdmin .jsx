import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getAllNews,
  addNew,
  updateNew,
  deleteNew,
} from "../services/NewsService";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

const NewsAdmin = () => {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    gameBrand: "",
    description: "",
    category: "",
    sectionImg: "",
    link: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const data = await getAllNews();
    setNewsList(data);
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
        await updateNew(formData.id, formData);
      } else {
        const newItem = {
          ...formData,
          id: uuidv4(),
          releaseDate: new Date().toISOString(),
        };
        await addNew(newItem);
      }
      await fetchNews();
      resetForm();
      setShowModal(false);
    } catch {
      alert("Əməliyyat zamanı xəta baş verdi.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteNew(id);
      await fetchNews();
    } catch {
      alert("Silinmə zamanı xəta baş verdi.");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      gameBrand: "",
      description: "",
      category: "",
      sectionImg: "",
      link: "",
    });
    setIsEditing(false);
  };

  const filteredNews = newsList.filter((item) =>
    item.gameBrand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-white min-h-screen p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">News Management</h2>

        <div className="flex items-center space-x-4">
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Game Brand"
              className="bg-[#202024] text-white placeholder-gray-400 rounded pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <IoSearch />
            </span>
          </div>

          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            + Add News
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Game Brand</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Release Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.map((item) => (
              <tr key={item.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.gameBrand}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.sectionImg}
                    alt={item.title}
                    className="w-24 h-auto rounded"
                  />
                </td>
                <td className="px-4 py-2">{item.releaseDate}</td>
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
                {isEditing ? "Edit News" : "Add News"}
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
                { name: "gameBrand", label: "Game Brand" },
                { name: "category", label: "Category" },
                { name: "sectionImg", label: "Image URL" },
                { name: "link", label: "News Link" },
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

              <div className="flex flex-col">
                <label htmlFor="description" className="mb-1 text-sm">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  rows="4"
                  className="bg-[#202024] p-2 rounded text-sm text-white placeholder-gray-400"
                  required
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  {isEditing ? "Save Changes" : "Add News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;

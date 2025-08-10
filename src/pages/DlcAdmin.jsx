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
    typeDlc: "",
    type: "DLC",
    logo: "",
    bannerImg: "",
    cardImg: "",
    screenshots: [],
    videos: [],
    price: "",
    discount: "",
    isFree: false,
    saleCount: 0,
    viewCount: 0,
    releaseDate: "",
    shortDescription: "",
    genre: [],
    platforms: [],
    ageRating: { rating: "", reasons: [] },
    requiresBaseGame: false,
    baseGameTitle: "",
    baseGameUrl: "",
    brand: "",
    features: [],
    dlcCategory: "",
    languages: [],
    region: "",
    availability: true,
    tags: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  const allGenres = [
    "Fighting",
    "Action",
    "Adventure",
    "RPG",
    "Shooter",
    "Strategy",
    "Sports",
    "Puzzle",
    "Simulation",
  ]; // nümunə üçün
  const allPlatforms = [
    "PC",
    "PS4",
    "PS5",
    "Xbox One",
    "Xbox Series X|S",
    "Nintendo Switch",
    "Mobile",
  ];
  const allLanguages = ["English", "French", "German", "Spanish", "Russian"];
  const allRegions = ["Global", "NA", "EU", "ASIA", "SA"];

  useEffect(() => {
    fetchDlcs();
  }, []);

  const fetchDlcs = async () => {
    const data = await getAllDlc();
    setDlcs(data);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      gameId: "",
      title: "",
      typeDlc: "",
      type: "DLC",
      logo: "",
      bannerImg: "",
      cardImg: "",
      screenshots: [],
      videos: [],
      price: "",
      discount: "",
      isFree: false,
      saleCount: 0,
      viewCount: 0,
      releaseDate: "",
      shortDescription: "",
      genre: [],
      platforms: [],
      ageRating: { rating: "", reasons: [] },
      requiresBaseGame: false,
      baseGameTitle: "",
      baseGameUrl: "",
      brand: "",
      features: [],
      dlcCategory: "",
      languages: [],
      region: "",
      availability: true,
      tags: [],
    });
    setIsEditing(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item) => {
    // AgeRating və array-ləri dərin klonla eynilə götürürük
    setFormData({
      ...item,
      price: item.price.toString(),
      discount: item.discount.toString(),
      isFree: item.isFree,
      saleCount: item.saleCount || 0,
      viewCount: item.viewCount || 0,
      genre: item.genre || [],
      platforms: item.platforms || [],
      languages: item.languages || [],
      features: item.features || [],
      tags: item.tags || [],
      ageRating: item.ageRating || { rating: "", reasons: [] },
      requiresBaseGame: !!item.requiresBaseGame,
      screenshots: item.screenshots || [],
      videos: item.videos || [],
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle input changes (string, number, checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "isFree" || name === "requiresBaseGame" || name === "availability") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
      if (name === "isFree" && checked) {
        // Əgər pulsuzdursa price və discount 0 olsun
        setFormData((prev) => ({
          ...prev,
          price: "0",
          discount: "0",
          isFree: true,
        }));
      }
      return;
    }

    if (name === "price" || name === "discount") {
      if (formData.isFree && name !== "discount") return; // pulsuzdursa price dəyişmir
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      return;
    }

    if (name === "ageRating.rating") {
      setFormData((prev) => ({
        ...prev,
        ageRating: {
          ...prev.ageRating,
          rating: value,
        },
      }));
      return;
    }

    if (name.startsWith("ageRating.reason")) {
      const index = parseInt(name.split(".")[2]);
      const newReasons = [...formData.ageRating.reasons];
      newReasons[index] = value;
      setFormData((prev) => ({
        ...prev,
        ageRating: {
          ...prev.ageRating,
          reasons: newReasons,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Multi-select checkboxes handler for genre, platforms, languages, features, tags
  const handleMultiSelectChange = (category, value) => {
    setFormData((prev) => {
      const arr = prev[category];
      if (arr.includes(value)) {
        return {
          ...prev,
          [category]: arr.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...arr, value],
        };
      }
    });
  };

  // Handle dynamic addition/removal of ageRating reasons, features, tags, screenshots, videos
  const addArrayItem = (category) => {
    setFormData((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  const removeArrayItem = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  const handleArrayItemChange = (category, index, value) => {
    setFormData((prev) => {
      const newArr = [...prev[category]];
      newArr[index] = value;
      return {
        ...prev,
        [category]: newArr,
      };
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        discount: Number(formData.discount),
        saleCount: Number(formData.saleCount),
        viewCount: Number(formData.viewCount),
        genre: formData.genre,
        platforms: formData.platforms,
        languages: formData.languages,
        features: formData.features,
        tags: formData.tags,
        ageRating: {
          rating: formData.ageRating.rating,
          reasons: formData.ageRating.reasons.filter(Boolean),
        },
        screenshots: formData.screenshots.filter(Boolean),
        videos: formData.videos.filter(Boolean),
        requiresBaseGame: formData.requiresBaseGame,
        availability: formData.availability,
      };

      if (isEditing) {
        await updateDlc(formData.id, payload);
      } else {
        const newItem = { ...payload, id: uuidv4() };
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

  return (
    <div className="text-white min-h-screen p-6 max-w-7xl mx-auto">
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
            {dlcs.length > 0 ? (
              dlcs.map((item) => (
                <tr key={item.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.baseGameTitle}</td>
                  <td className="px-4 py-2">{item.dlcCategory}</td>
                  <td className="px-4 py-2">${item.price}</td>
                  <td className="px-4 py-2">{item.discount}%</td>
                  <td className="px-4 py-2">{item.releaseDate}</td>
                  <td className="px-4 py-2">
                    <img
                      src={item.cardImg}
                      alt={item.title}
                      className="w-20 h-auto rounded"
                    />
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
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-400">
                  No DLCs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-100 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#101014] rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-6 py-3 border-b border-gray-700">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit DLC" : "Add DLC"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                aria-label="Close modal"
                className="text-gray-400 hover:text-white transition"
              >
                <IoCloseCircle size={28} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 overflow-y-auto"
              style={{ flexGrow: 1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Text inputs */}
                {[
                  { name: "title", label: "Title" },
                  { name: "baseGameTitle", label: "Base Game Title" },
                  { name: "brand", label: "Brand" },
                  { name: "typeDlc", label: "DLC Type" },
                  { name: "dlcCategory", label: "DLC Category" },
                  { name: "price", label: "Price", type: "number" },
                  { name: "discount", label: "Discount (%)", type: "number" },
                  { name: "releaseDate", label: "Release Date", type: "date" },
                  { name: "logo", label: "Logo URL" },
                  { name: "bannerImg", label: "Banner Image URL" },
                  { name: "cardImg", label: "Card Image URL" },
                  { name: "baseGameUrl", label: "Base Game URL" },
                  { name: "region", label: "Region" },
                ].map(({ name, label, type = "text" }) => (
                  <div key={name} className="flex flex-col">
                    <label htmlFor={name} className="mb-1 text-sm">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      placeholder={label}
                      className="bg-[#202024] p-2 rounded text-sm text-white placeholder-gray-400"
                      required={
                        ["title", "baseGameTitle", "price", "releaseDate"].includes(
                          name
                        )
                      }
                      min={name === "price" || name === "discount" ? 0 : undefined}
                      max={name === "discount" ? 100 : undefined}
                      disabled={formData.isFree && (name === "price" || name === "discount")}
                    />
                  </div>
                ))}

                {/* Checkboxes */}
                <div className="col-span-2 flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="isFree"
                      checked={formData.isFree}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border border-gray-600 cursor-pointer checked:bg-green-600 checked:border-green-600"
                    />
                    <span>Is Free</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="requiresBaseGame"
                      checked={formData.requiresBaseGame}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border border-gray-600 cursor-pointer checked:bg-green-600 checked:border-green-600"
                    />
                    <span>Requires Base Game</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="availability"
                      checked={formData.availability}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border border-gray-600 cursor-pointer checked:bg-green-600 checked:border-green-600"
                    />
                    <span>Available</span>
                  </label>
                </div>

                {/* Multi-select checkbox groups */}
                <div className="col-span-2 max-h-36 overflow-y-auto border border-gray-600 rounded p-2 bg-[#202024]">
                  <p className="mb-1 font-semibold">Genres</p>
                  <div className="flex flex-wrap gap-3">
                    {allGenres.map((genre) => (
                      <label
                        key={genre}
                        className="flex items-center space-x-2 cursor-pointer hover:text-green-400"
                      >
                        <input
                          type="checkbox"
                          checked={formData.genre.includes(genre)}
                          onChange={() => handleMultiSelectChange("genre", genre)}
                          className="w-4 h-4 rounded border-gray-600 cursor-pointer checked:bg-green-600 checked:border-green-600"
                        />
                        <span>{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 max-h-36 overflow-y-auto border border-gray-600 rounded p-2 bg-[#202024]">
                  <p className="mb-1 font-semibold">Platforms</p>
                  <div className="flex flex-wrap gap-3">
                    {allPlatforms.map((platform) => (
                      <label
                        key={platform}
                        className="flex items-center space-x-2 cursor-pointer hover:text-green-400"
                      >
                        <input
                          type="checkbox"
                          checked={formData.platforms.includes(platform)}
                          onChange={() => handleMultiSelectChange("platforms", platform)}
                          className="w-4 h-4 rounded border-gray-600 cursor-pointer checked:bg-green-600 checked:border-green-600"
                        />
                        <span>{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="col-span-2 max-h-36 overflow-y-auto border border-gray-600 rounded p-2 bg-[#202024]">
                  <p className="mb-1 font-semibold">Languages</p>
                  <div className="flex flex-wrap gap-3">
                    {allLanguages.map((lang) => (
                      <label
                        key={lang}
                        className="flex items-center space-x-2 cursor-pointer hover:text-green-400"
                      >
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(lang)}
                          onChange={() => handleMultiSelectChange("languages", lang)}
                          className="w-4 h-4 rounded border-gray-600 cursor-pointer checked:bg-green-600 checked:border-green-600"
                        />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Age rating */}
                <div className="col-span-2">
                  <label className="block mb-1 font-semibold">Age Rating</label>
                  <input
                    type="number"
                    min={0}
                    max={18}
                    name="ageRating.rating"
                    value={formData.ageRating.rating || ""}
                    onChange={handleChange}
                    className="bg-[#202024] p-2 rounded w-24 text-white"
                    placeholder="Rating (e.g. 10)"
                  />
                  <div className="mt-2">
                    <p className="mb-1 font-semibold">Reasons</p>
                    {formData.ageRating.reasons.map((reason, i) => (
                      <div key={i} className="flex items-center mb-1 space-x-2">
                        <input
                          type="text"
                          value={reason}
                          onChange={(e) =>
                            setFormData((prev) => {
                              const newReasons = [...prev.ageRating.reasons];
                              newReasons[i] = e.target.value;
                              return {
                                ...prev,
                                ageRating: {
                                  ...prev.ageRating,
                                  reasons: newReasons,
                                },
                              };
                            })
                          }
                          placeholder="Reason"
                          className="bg-[#202024] p-2 rounded flex-grow text-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => {
                              const newReasons = [...prev.ageRating.reasons];
                              newReasons.splice(i, 1);
                              return {
                                ...prev,
                                ageRating: { ...prev.ageRating, reasons: newReasons },
                              };
                            });
                          }}
                          className="text-red-500 font-bold"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          ageRating: {
                            ...prev.ageRating,
                            reasons: [...prev.ageRating.reasons, ""],
                          },
                        }))
                      }
                      className="text-green-500 hover:underline text-sm"
                    >
                      + Add Reason
                    </button>
                  </div>
                </div>

                {/* Short Description */}
                <div className="col-span-2 flex flex-col">
                  <label htmlFor="shortDescription" className="mb-1">
                    Short Description
                  </label>
                  <textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={3}
                    className="bg-[#202024] p-2 rounded text-white resize-none"
                    placeholder="Short description of the DLC"
                    required
                  />
                </div>

                {/* Screenshots input */}
                <div className="col-span-2">
                  <label className="block mb-1 font-semibold">Screenshots URLs</label>
                  {formData.screenshots.map((url, i) => (
                    <div key={i} className="flex items-center mb-1 space-x-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleArrayItemChange("screenshots", i, e.target.value)}
                        placeholder="Screenshot URL"
                        className="bg-[#202024] p-2 rounded flex-grow text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("screenshots", i)}
                        className="text-red-500 font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("screenshots")}
                    className="text-green-500 hover:underline text-sm"
                  >
                    + Add Screenshot
                  </button>
                </div>

                {/* Videos input */}
                <div className="col-span-2">
                  <label className="block mb-1 font-semibold">Video URLs</label>
                  {formData.videos.map((url, i) => (
                    <div key={i} className="flex items-center mb-1 space-x-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleArrayItemChange("videos", i, e.target.value)}
                        placeholder="Video URL"
                        className="bg-[#202024] p-2 rounded flex-grow text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("videos", i)}
                        className="text-red-500 font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("videos")}
                    className="text-green-500 hover:underline text-sm"
                  >
                    + Add Video
                  </button>
                </div>

                {/* Features */}
                <div className="col-span-2">
                  <label className="block mb-1 font-semibold">Features</label>
                  {formData.features.map((feat, i) => (
                    <div key={i} className="flex items-center mb-1 space-x-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleArrayItemChange("features", i, e.target.value)}
                        placeholder="Feature"
                        className="bg-[#202024] p-2 rounded flex-grow text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("features", i)}
                        className="text-red-500 font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("features")}
                    className="text-green-500 hover:underline text-sm"
                  >
                    + Add Feature
                  </button>
                </div>

                {/* Tags */}
                <div className="col-span-2">
                  <label className="block mb-1 font-semibold">Tags</label>
                  {formData.tags.map((tag, i) => (
                    <div key={i} className="flex items-center mb-1 space-x-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayItemChange("tags", i, e.target.value)}
                        placeholder="Tag"
                        className="bg-[#202024] p-2 rounded flex-grow text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem("tags", i)}
                        className="text-red-500 font-bold"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem("tags")}
                    className="text-green-500 hover:underline text-sm"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
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

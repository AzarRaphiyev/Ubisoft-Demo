import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getAllGame,
  addGame,
  updateGame,
  deleteGame,
} from "../services/GameadminService";
import { IoCloseCircle } from "react-icons/io5";

const ALL_LANGUAGES = [
  "English",
  "French",
  "German",
  "Italian",
  "Spanish",
  "Polish",
  "Portuguese",
  "Russian",
  "Japanese",
  "Chinese",
];

const GameAdmin = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [allGenres, setAllGenres] = useState([]);
  const [allPlatforms, setAllPlatforms] = useState([]);
  const [allFeatures, setAllFeatures] = useState([
    "Single Player",
    "Multiplayer",
    "Co-op",
    "Open World",
    "Shooter",
  ]);

  // Başlanğıc form datası (initial state)
  const initialFormData = {
    id: "",
    title: "",
    type: "",
    logo: "",
    cardImg: "",
    bannerImg: "",
    sectionImg: "",
    screenshots: [""],       // array of strings (URLs)
    descriptionImg: [""],   // array of strings (URLs)
    videos: [""],           // array of strings (URLs)
    price: "",
    discount: "",
    isFree: false,
    saleCount: 0,
    viewCount: 0,
    releaseDate: "",
    publisher: "",
    developer: "",
    genre: [],              // array of strings
    platforms: [],          // array of strings
    languages: ALL_LANGUAGES.map((lang) => ({
      language: lang,
      audio: false,
      interface: false,
      subtitle: false,
    })),
    brand: "",
    productEdition: "",
    shortDescription: "",
    fullDescription: [{ heading: "", content: "" }],
    ageRating: {
      rating: 0,
      reasons: [""],
    },
    features: [],
    systemRequirements: {
      minimum: {
        os: "",
        cpu: "",
        gpu: "",
        ram: "",
        vram: "",
        storage: "",
      },
      recommended: {
        os: "",
        cpu: "",
        gpu: "",
        ram: "",
        vram: "",
        storage: "",
      },
    },
    multiplayer: false,
    region: "",
    availability: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchGames();
  }, []);

  // Oyunları yüklə və genres/platformları topla
  const fetchGames = async () => {
    try {
      const data = await getAllGame();
      setGames(data);
      setFilteredGames(data);

      const genresSet = new Set();
      const platformsSet = new Set();
      const featuresSet = new Set();

      data.forEach((game) => {
        if (game.genre?.length) game.genre.forEach((g) => genresSet.add(g));
        if (game.platforms?.length)
          game.platforms.forEach((p) => platformsSet.add(p));
        if (game.features?.length) game.features.forEach((f) => featuresSet.add(f));
      });

      setAllGenres(Array.from(genresSet).sort());
      setAllPlatforms(Array.from(platformsSet).sort());
      setAllFeatures(Array.from(featuresSet).sort());
    } catch (error) {
      alert("Oyunları yükləmək mümkün olmadı");
    }
  };

  // Axtarış sözü ilə filtrləmə
  useEffect(() => {
    if (!searchTerm) {
      setFilteredGames(games);
      return;
    }
    const lowerTerm = searchTerm.toLowerCase();
    setFilteredGames(
      games.filter((g) => g.title.toLowerCase().includes(lowerTerm))
    );
  }, [searchTerm, games]);

  // Modal aç
  const openAddModal = () => {
    setFormData(initialFormData);
    setIsEditing(false);
    setShowModal(true);
  };

  // Redaktə üçün modal aç (mövcud oyunla)
  const openEditModal = (game) => {
    // Languages üçün bütün dil variantlarını saxla, yoxsa default false
    const languages = ALL_LANGUAGES.map((lang) => {
      const found = game.languages?.find((l) => l.language === lang);
      return {
        language: lang,
        audio: found?.audio || false,
        interface: found?.interface || false,
        subtitle: found?.subtitle || false,
      };
    });

    setFormData({
      id: game.id || "",
      title: game.title || "",
      type: game.type || "",
      logo: game.logo || "",
      cardImg: game.cardImg || "",
      bannerImg: game.bannerImg || "",
      sectionImg: game.sectionImg || "",
      screenshots: game.screenshots?.length ? game.screenshots : [""],
      descriptionImg: game.descriptionImg?.length ? game.descriptionImg : [""],
      videos: game.videos?.length ? game.videos : [""],
      price: game.price?.toString() || "",
      discount: game.discount?.toString() || "",
      isFree: game.isFree || false,
      saleCount: game.saleCount || 0,
      viewCount: game.viewCount || 0,
      releaseDate: game.releaseDate || "",
      publisher: game.publisher || "",
      developer: game.developer || "",
      genre: game.genre || [],
      platforms: game.platforms || [],
      languages,
      brand: game.brand || "",
      productEdition: game.productEdition || "",
      shortDescription: game.shortDescription || "",
      fullDescription:
        game.fullDescription?.length > 0
          ? game.fullDescription
          : [{ heading: "", content: "" }],
      ageRating: {
        rating: game.ageRating?.rating || 0,
        reasons:
          game.ageRating?.reasons?.length > 0
            ? game.ageRating.reasons
            : [""],
      },
      features: game.features || [],
      systemRequirements: {
        minimum: {
          os: game.systemRequirements?.minimum?.os || "",
          cpu: game.systemRequirements?.minimum?.cpu || "",
          gpu: game.systemRequirements?.minimum?.gpu || "",
          ram: game.systemRequirements?.minimum?.ram || "",
          vram: game.systemRequirements?.minimum?.vram || "",
          storage: game.systemRequirements?.minimum?.storage || "",
        },
        recommended: {
          os: game.systemRequirements?.recommended?.os || "",
          cpu: game.systemRequirements?.recommended?.cpu || "",
          gpu: game.systemRequirements?.recommended?.gpu || "",
          ram: game.systemRequirements?.recommended?.ram || "",
          vram: game.systemRequirements?.recommended?.vram || "",
          storage: game.systemRequirements?.recommended?.storage || "",
        },
      },
      multiplayer: game.multiplayer || false,
      region: game.region || "",
      availability: game.availability || false,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Form input dəyişiklikləri
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      // Məsələn systemRequirements.minimum.os üçün
      const keys = name.split(".");
      setFormData((prev) => {
        let newData = { ...prev };
        let obj = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          obj[keys[i]] = { ...obj[keys[i]] };
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = type === "checkbox" ? checked : value;
        return newData;
      });
      return;
    }

    if (name === "isFree") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          isFree: true,
          price: "0",
          discount: "0",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          isFree: false,
        }));
      }
      return;
    }

    if (name === "price") {
      const val = value === "" ? "" : value;
      setFormData((prev) => ({
        ...prev,
        price: val,
        isFree: val === "0" || val === 0,
        discount: val === "0" || val === 0 ? "0" : prev.discount,
      }));
      return;
    }

    if (name === "discount") {
      if (formData.isFree) return;
      setFormData((prev) => ({ ...prev, discount: value }));
      return;
    }

    if (name === "saleCount" || name === "viewCount") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    if (type === "checkbox" && (name === "multiplayer" || name === "availability")) {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Array input dəyişiklikləri (screenshots, videos, descriptionImg)
  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => {
      const arr = [...prev[field]];
      arr.splice(index, 1);
      return { ...prev, [field]: arr.length ? arr : [""] };
    });
  };

  // Genres, Platforms, Features toggle seçimi
  const toggleMultiSelect = (field, value) => {
    setFormData((prev) => {
      const arr = prev[field];
      if (arr.includes(value)) {
        return { ...prev, [field]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [field]: [...arr, value] };
      }
    });
  };

  // Languages toggling (varlıq və audio/interface/subtitle)
  const toggleLanguagePresence = (language) => {
    setFormData((prev) => {
      const langs = [...prev.languages];
      const index = langs.findIndex((l) => l.language === language);
      if (index === -1) {
        langs.push({
          language,
          audio: false,
          interface: false,
          subtitle: false,
        });
      } else {
        langs.splice(index, 1);
      }
      return { ...prev, languages: langs };
    });
  };

  const toggleLanguageProperty = (language, prop) => {
    setFormData((prev) => {
      const langs = [...prev.languages];
      const index = langs.findIndex((l) => l.language === language);
      if (index !== -1) {
        langs[index] = { ...langs[index], [prop]: !langs[index][prop] };
      }
      return { ...prev, languages: langs };
    });
  };

  // AgeRating səbəbləri
  const addAgeReason = () => {
    setFormData((prev) => ({
      ...prev,
      ageRating: {
        ...prev.ageRating,
        reasons: [...prev.ageRating.reasons, ""],
      },
    }));
  };

  const removeAgeReason = (index) => {
    setFormData((prev) => {
      const reasons = [...prev.ageRating.reasons];
      reasons.splice(index, 1);
      return {
        ...prev,
        ageRating: { ...prev.ageRating, reasons },
      };
    });
  };

  const changeAgeReason = (index, value) => {
    setFormData((prev) => {
      const reasons = [...prev.ageRating.reasons];
      reasons[index] = value;
      return {
        ...prev,
        ageRating: { ...prev.ageRating, reasons },
      };
    });
  };

  // FullDescription sahələri
  const addFullDescriptionItem = () => {
    setFormData((prev) => ({
      ...prev,
      fullDescription: [...prev.fullDescription, { heading: "", content: "" }],
    }));
  };

  const removeFullDescriptionItem = (index) => {
    setFormData((prev) => {
      const arr = [...prev.fullDescription];
      arr.splice(index, 1);
      return { ...prev, fullDescription: arr.length ? arr : [{ heading: "", content: "" }] };
    });
  };

  const changeFullDescriptionItem = (index, key, value) => {
    setFormData((prev) => {
      const arr = [...prev.fullDescription];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, fullDescription: arr };
    });
  };

  // Features toggle
  const toggleFeature = (feature) => {
    setFormData((prev) => {
      const arr = prev.features;
      if (arr.includes(feature)) {
        return { ...prev, features: arr.filter((f) => f !== feature) };
      } else {
        return { ...prev, features: [...arr, feature] };
      }
    });
  };

  // Form submit
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
        fullDescription: formData.fullDescription.filter(
          (item) => item.heading.trim() && item.content.trim()
        ),
        ageRating: {
          rating: Number(formData.ageRating.rating),
          reasons: formData.ageRating.reasons.filter((r) => r.trim()),
        },
        features: formData.features,
        systemRequirements: formData.systemRequirements,
        multiplayer: formData.multiplayer,
        availability: formData.availability,
      };

      if (isEditing) {
        await updateGame(formData.id, payload);
      } else {
        await addGame({ ...payload, id: uuidv4() });
      }

      await fetchGames();
      setShowModal(false);
      setFormData(initialFormData);
      setIsEditing(false);
    } catch (error) {
      alert("Saxlanma zamanı xəta baş verdi");
    }
  };

  // Oyun sil
  const handleDelete = async (id) => {
    if (!window.confirm("Silinsin?")) return;
    try {
      await deleteGame(id);
      await fetchGames();
    } catch {
      alert("Silinmə zamanı xəta baş verdi");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">Game Management</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="rounded px-3 py-1 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={openAddModal}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add New Game
          </button>
        </div>
      </div>

      {/* Game Table */}
      <div className="overflow-x-auto bg-gray-800 rounded">
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="border border-gray-600 px-3 py-2">Title</th>
              <th className="border border-gray-600 px-3 py-2">Type</th>
              <th className="border border-gray-600 px-3 py-2">Price</th>
              <th className="border border-gray-600 px-3 py-2">Discount %</th>
              <th className="border border-gray-600 px-3 py-2">Card Img</th>
              <th className="border border-gray-600 px-3 py-2">Is Free</th>
              <th className="border border-gray-600 px-3 py-2">Genres</th>
              <th className="border border-gray-600 px-3 py-2">Platforms</th>
              <th className="border border-gray-600 px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="text-center text-gray-400 p-4"
                >
                  No games found
                </td>
              </tr>
            ) : (
              filteredGames.map((game) => (
                <tr key={game.id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="border border-gray-600 px-3 py-2">{game.title}</td>
                  <td className="border border-gray-600 px-3 py-2">{game.type}</td>
                  <td className="border border-gray-600 px-3 py-2">${game.price}</td>
                  <td className="border border-gray-600 px-3 py-2">{game.discount}</td>
                  <td className="border border-gray-600 px-3 py-2">
                    <img
                      src={game.cardImg}
                      alt={game.title}
                      className="w-16 h-auto rounded"
                    />
                  </td>
                  <td className="border border-gray-600 px-3 py-2">{game.isFree ? "Yes" : "No"}</td>
                  <td className="border border-gray-600 px-3 py-2">{game.genre?.join(", ")}</td>
                  <td className="border border-gray-600 px-3 py-2">{game.platforms?.join(", ")}</td>
                  <td className="border border-gray-600 px-3 py-2 space-x-2">
                    <button
                      onClick={() => openEditModal(game)}
                      className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(game.id)}
                      className="bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black bg-opacity-80 pt-10 pb-20 px-6">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-lg w-full max-w-5xl p-6 overflow-auto max-h-[90vh] text-white space-y-4 relative"
          >
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
                setFormData(initialFormData);
              }}
              className="absolute top-4 right-4 text-3xl hover:text-red-500"
            >
              <IoCloseCircle />
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Game" : "Add New Game"}
            </h2>

            {/* Basic info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                Title*
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Type*
                <input
                  required
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Logo URL
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Card Image URL*
                <input
                  required
                  type="text"
                  name="cardImg"
                  value={formData.cardImg}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Banner Image URL
                <input
                  type="text"
                  name="bannerImg"
                  value={formData.bannerImg}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Section Image URL
                <input
                  type="text"
                  name="sectionImg"
                  value={formData.sectionImg}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={formData.isFree}
                  onChange={handleChange}
                />
                <span>Is Free</span>
              </label>

              <label className="flex flex-col">
                Price*
                <input
                  required={!formData.isFree}
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  disabled={formData.isFree}
                  className="rounded bg-gray-800 p-2 mt-1 text-white disabled:opacity-50"
                />
              </label>

              <label className="flex flex-col">
                Discount %
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  disabled={formData.isFree}
                  className="rounded bg-gray-800 p-2 mt-1 text-white disabled:opacity-50"
                />
              </label>

              <label className="flex flex-col">
                Sale Count
                <input
                  type="number"
                  min="0"
                  name="saleCount"
                  value={formData.saleCount}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                View Count
                <input
                  type="number"
                  min="0"
                  name="viewCount"
                  value={formData.viewCount}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Release Date
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Publisher
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Developer
                <input
                  type="text"
                  name="developer"
                  value={formData.developer}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Brand
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col">
                Product Edition
                <input
                  type="text"
                  name="productEdition"
                  value={formData.productEdition}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <label className="flex flex-col md:col-span-2">
                Short Description
                <textarea
                  rows={3}
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white resize-none"
                />
              </label>
            </div>

            {/* Arrays: Screenshots */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Screenshots URLs</h3>
              {formData.screenshots.map((url, i) => (
                <div key={i} className="flex items-center mb-2 space-x-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleArrayChange("screenshots", i, e.target.value)}
                    placeholder="Screenshot URL"
                    className="flex-grow rounded bg-gray-800 p-2 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("screenshots", i)}
                    className="text-red-500 hover:text-red-700 text-2xl"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("screenshots")}
                className="text-blue-500 hover:underline"
              >
                + Add Screenshot
              </button>
            </div>

            {/* Arrays: Description Images */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Description Images URLs</h3>
              {formData.descriptionImg.map((url, i) => (
                <div key={i} className="flex items-center mb-2 space-x-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleArrayChange("descriptionImg", i, e.target.value)}
                    placeholder="Description Image URL"
                    className="flex-grow rounded bg-gray-800 p-2 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("descriptionImg", i)}
                    className="text-red-500 hover:text-red-700 text-2xl"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("descriptionImg")}
                className="text-blue-500 hover:underline"
              >
                + Add Description Image
              </button>
            </div>

            {/* Arrays: Videos */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Videos URLs</h3>
              {formData.videos.map((url, i) => (
                <div key={i} className="flex items-center mb-2 space-x-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleArrayChange("videos", i, e.target.value)}
                    placeholder="Video URL"
                    className="flex-grow rounded bg-gray-800 p-2 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem("videos", i)}
                    className="text-red-500 hover:text-red-700 text-2xl"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("videos")}
                className="text-blue-500 hover:underline"
              >
                + Add Video
              </button>
            </div>

            {/* Genres multi-select */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {allGenres.map((genre) => (
                  <label
                    key={genre}
                    className={`px-3 py-1 rounded cursor-pointer border ${
                      formData.genre.includes(genre)
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.genre.includes(genre)}
                      onChange={() => toggleMultiSelect("genre", genre)}
                      className="hidden"
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            {/* Platforms multi-select */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {allPlatforms.map((platform) => (
                  <label
                    key={platform}
                    className={`px-3 py-1 rounded cursor-pointer border ${
                      formData.platforms.includes(platform)
                        ? "bg-green-600 border-green-600"
                        : "border-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(platform)}
                      onChange={() => toggleMultiSelect("platforms", platform)}
                      className="hidden"
                    />
                    {platform}
                  </label>
                ))}
              </div>
            </div>

            {/* Languages with toggles */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Languages (Audio / Interface / Subtitle)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-auto border border-gray-700 p-2 rounded">
                {formData.languages.map(({ language, audio, interface: iface, subtitle }) => (
                  <div key={language} className="flex items-center space-x-4">
                    <label className="flex items-center space-x-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="hidden"
                      />
                      <span className="font-semibold">{language}</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={audio}
                        onChange={() => toggleLanguageProperty(language, "audio")}
                      />
                      <span>Audio</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={iface}
                        onChange={() => toggleLanguageProperty(language, "interface")}
                      />
                      <span>Interface</span>
                    </label>
                    <label className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={subtitle}
                        onChange={() => toggleLanguageProperty(language, "subtitle")}
                      />
                      <span>Subtitle</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Description */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Full Description</h3>
              {formData.fullDescription.map((item, i) => (
                <div key={i} className="mb-4 border-b border-gray-700 pb-4">
                  <label className="flex flex-col mb-1">
                    Heading
                    <input
                      type="text"
                      value={item.heading}
                      onChange={(e) =>
                        changeFullDescriptionItem(i, "heading", e.target.value)
                      }
                      className="rounded bg-gray-800 p-2 text-white"
                    />
                  </label>
                  <label className="flex flex-col">
                    Content
                    <textarea
                      rows={4}
                      value={item.content}
                      onChange={(e) =>
                        changeFullDescriptionItem(i, "content", e.target.value)
                      }
                      className="rounded bg-gray-800 p-2 text-white resize-none"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeFullDescriptionItem(i)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Remove Section
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFullDescriptionItem}
                className="text-blue-500 hover:underline"
              >
                + Add Description Section
              </button>
            </div>

            {/* Age Rating */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Age Rating</h3>
              <label className="flex flex-col mb-2">
                Rating
                <input
                  type="number"
                  min="0"
                  max="21"
                  name="ageRating.rating"
                  value={formData.ageRating.rating}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 mt-1 text-white"
                />
              </label>

              <h4 className="font-semibold mb-1">Reasons</h4>
              {formData.ageRating.reasons.map((reason, i) => (
                <div key={i} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => changeAgeReason(i, e.target.value)}
                    className="flex-grow rounded bg-gray-800 p-2 text-white"
                    placeholder="Reason for age rating"
                  />
                  <button
                    type="button"
                    onClick={() => removeAgeReason(i)}
                    className="text-red-500 hover:text-red-700 text-2xl"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addAgeReason}
                className="text-blue-500 hover:underline"
              >
                + Add Reason
              </button>
            </div>

            {/* Features multi-select */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {allFeatures.map((feature) => (
                  <label
                    key={feature}
                    className={`px-3 py-1 rounded cursor-pointer border ${
                      formData.features.includes(feature)
                        ? "bg-purple-600 border-purple-600"
                        : "border-gray-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="hidden"
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            {/* System Requirements */}
            <div>
              <h3 className="text-xl font-semibold mb-2">System Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimum */}
                <div>
                  <h4 className="font-semibold mb-2">Minimum</h4>
                  {[
                    "os",
                    "cpu",
                    "gpu",
                    "ram",
                    "vram",
                    "storage",
                  ].map((key) => (
                    <label key={key} className="flex flex-col mb-2">
                      {key.toUpperCase()}
                      <input
                        type="text"
                        name={`systemRequirements.minimum.${key}`}
                        value={formData.systemRequirements.minimum[key]}
                        onChange={handleChange}
                        className="rounded bg-gray-800 p-2 mt-1 text-white"
                      />
                    </label>
                  ))}
                </div>

                {/* Recommended */}
                <div>
                  <h4 className="font-semibold mb-2">Recommended</h4>
                  {[
                    "os",
                    "cpu",
                    "gpu",
                    "ram",
                    "vram",
                    "storage",
                  ].map((key) => (
                    <label key={key} className="flex flex-col mb-2">
                      {key.toUpperCase()}
                      <input
                        type="text"
                        name={`systemRequirements.recommended.${key}`}
                        value={formData.systemRequirements.recommended[key]}
                        onChange={handleChange}
                        className="rounded bg-gray-800 p-2 mt-1 text-white"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Multiplayer & Region & Availability */}
            <div className="flex flex-wrap gap-6 items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="multiplayer"
                  checked={formData.multiplayer}
                  onChange={handleChange}
                />
                <span>Multiplayer</span>
              </label>

              <label className="flex flex-col">
                Region
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="rounded bg-gray-800 p-2 text-white mt-1"
                />
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />
                <span>Available</span>
              </label>
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                  setFormData(initialFormData);
                }}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GameAdmin;

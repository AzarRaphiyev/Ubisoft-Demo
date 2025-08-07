import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllSliders, addSlider, updateSlider, deleteSlider } from "../services/SliderService";
import { IoCloseCircle } from "react-icons/io5";


const SliderAdmin = () => {
  const [sliders, setSliders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    btnType: "",
    image: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const openAddModal = () => {
  resetForm();
  setShowModal(true);
};

const openEditModal = (item) => {
  setFormData(item);
  setIsEditing(true);
  setShowModal(true);
};


  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    const data = await getAllSliders();
    setSliders(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateSlider(formData.id, formData);
      } else {
        const newItem = { ...formData, id: uuidv4() };
        await addSlider(newItem);
      }
      await fetchSliders();
      resetForm();
    } catch (error) {
      alert("Əməliyyat zamanı xəta baş verdi");
    }
  };
;

   const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteSlider(id);
      await fetchSliders();
    } catch (error) {
      alert("Silinmə zamanı xəta baş verdi");
    }
  };
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

const handleEdit = (item) => {
  openEditModal(item);
};


const resetForm = () => {
  setFormData({
    id: "",
    title: "",
    category: "",
    btnType: "",
    image: "",
    description: "",
  });
  setIsEditing(false);
};



  return (
    <div className=" bg-gradient-to-b from-[#0E0D0E] via-[#150C15] to-[#0F131E] pb-[30px]  p-6 max-w-7xl mx-auto h-[86.5vh] flex flex-col  text-white bg-[]">
      <div className="flex justify-between items-center mb-4">
          
                      <h2 className="text-xl font-semibold mt-8 mb-4">Existing Sliders:</h2>      
            <button
                onClick={openAddModal}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded cursor-pointer hover:scale-105 duration-300"
            >
                + Add Slide
            </button>
            </div>


<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">Title</th>
        <th scope="col" className="px-6 py-3">Category</th>
        <th scope="col" className="px-6 py-3">Button type</th>
        <th scope="col" className="px-6 py-3">Image</th>
        <th scope="col" className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody>
      {sliders.map((item) => (
        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.title}
          </th>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.category}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.btnType}
          </td>
          
          <td className="px-6 py-4">
            <img src={item.image} alt="thumb" className="w-14 h-auto rounded" />
          </td>
          <td className="px-6 py-4 ">
            <button onClick={() => handleEdit(item)} className="font-medium text-yellow-500 hover:underline mr-4 cursor-pointer">Edit</button>
            <button onClick={() => handleDelete(item.id)} className="font-medium text-red-500 hover:underline cursor-pointer">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
{showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/60 backdrop-blur-sm">
          <div className="bg-[#101014] p-6 rounded-xl max-w-2xl w-full relative">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4">
                  {isEditing ? "Edit Slide" : "Add Slide"}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className=" cursor-pointer hover:scale-105 duration-300 text-white"
                >
                  <IoCloseCircle  size={30}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
  { name: "title", label: "Title" },
  { name: "category", label: "Category" },
  { name: "btnType", label: "BTN Type" },
  { name: "image", label: "Image" },
  { name: "description", label: "Description" },
].map(({ name, label }) => (
  <div key={name} className="flex flex-col">
    <label
      htmlFor={name}
      className="mb-1 text-sm text-white"
    >
      {label}
    </label>

    {name === "description" ? (
      <textarea
        id={name}
        name={name}
        placeholder={label}
        value={formData[name] || ""}
        onChange={handleChange}
        className="bg-[#202024] p-2 rounded text-sm text-white placeholder-gray-400"
        style={{ width: "200%", height: "200px",margin: "auto" }}
        required
      />

    ) : (
      <input
        id={name}
        name={name}
        placeholder={label}
        value={formData[name] || ""}
        onChange={handleChange}
        className="bg-[#202024] p-2 rounded text-sm text-white placeholder-gray-400"
        type={name === "price" ? "number" : "text"}
        required
      />
    )}
  </div>
))}


              <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
               
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
                >
                  {isEditing ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
};

export default SliderAdmin;
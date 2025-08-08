import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllSliders, addSlider, updateSlider, deleteSlider } from "../services/SliderService";
import { Plus, Edit3, Trash2, X, Sparkles, Grid, ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';

const SliderAdmin = () => {
  const [sliders, setSliders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
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

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const data = await getAllSliders();
      setSliders(data);
    } catch (error) {
      showNotification("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await updateSlider(formData.id, formData);
        showNotification("Slider updated successfully! ✨");
      } else {
        const newItem = { ...formData, id: uuidv4() };
        await addSlider(newItem);
        showNotification("New slider added! 🎉");
      }
      await fetchSliders();
      setShowModal(false);
      resetForm();
    } catch (error) {
      showNotification("Operation failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;
    
    try {
      setLoading(true);
      await deleteSlider(id);
      await fetchSliders();
      showNotification("Slider deleted", "success");
    } catch (error) {
      showNotification("Delete operation failed", "error");
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-[60] animate-slideIn">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl backdrop-blur-xl border shadow-2xl ${
            notification.type === "error" 
              ? "bg-red-500/20 border-red-500/30 text-red-200" 
              : "bg-green-500/20 border-green-500/30 text-green-200"
          }`}>
            {notification.type === "error" ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <CheckCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-white font-semibold">Loading...</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="text-purple-400 w-8 h-8 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Slider Management System
            </h1>
            <Sparkles className="text-purple-400 w-8 h-8 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg">Create and manage beautiful sliders with style</p>
        </div>

        {/* Controls Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Grid className="text-purple-400 w-6 h-6" />
            <h2 className="text-2xl font-semibold text-white">Existing Sliders</h2>
            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
              {sliders.length} items
            </span>
          </div>
          
          <button
            onClick={openAddModal}
            disabled={loading}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Slider
            </div>
          </button>
        </div>

        {/* Table Section with Glassmorphism */}
        <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {["Title", "Category", "Button Type", "Image", "Actions"].map((header) => (
                    <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sliders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="text-gray-400">
                          <p className="text-lg font-medium">No sliders yet</p>
                          <p className="text-sm">Click the button above to create your first slider</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  sliders.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className="group hover:bg-white/5 transition-all duration-300 animate-fadeIn"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="font-medium text-white group-hover:text-purple-300 transition-colors">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-xs text-gray-400 line-clamp-2 max-w-xs">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.btnType === 'Primary' 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                          {item.btnType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative group/image">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-16 h-12 object-cover rounded-lg border-2 border-white/20 group-hover/image:border-purple-400 transition-all duration-300 group-hover/image:scale-110"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='48' fill='%236B7280'%3E%3Crect width='64' height='48' fill='%231F2937'/%3E%3Ctext x='32' y='28' text-anchor='middle' fill='%236B7280' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button 
                            onClick={() => handleEdit(item)}
                            disabled={loading}
                            className="group/btn flex items-center gap-1 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/30 disabled:opacity-50 transition-all duration-300 hover:scale-105"
                          >
                            <Edit3 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            disabled={loading}
                            className="group/btn flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 disabled:opacity-50 transition-all duration-300 hover:scale-105"
                          >
                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 p-8 rounded-2xl max-w-2xl w-full mx-4 relative shadow-2xl animate-scaleIn">
              <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl opacity-20 blur-sm"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {isEditing ? "Edit Slider" : "Create New Slider"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    disabled={loading}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white disabled:opacity-50 transition-all duration-300 hover:rotate-90"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "title", label: "Title", icon: "✨", placeholder: "Enter slider title" },
                    { name: "category", label: "Category", icon: "🏷️", placeholder: "e.g. Fashion, Tech" },
                    { name: "btnType", label: "Button Type", icon: "🔘", placeholder: "Primary or Secondary" },
                    { name: "image", label: "Image URL", icon: "🖼️", placeholder: "https://example.com/image.jpg" },
                  ].map(({ name, label, icon, placeholder }) => (
                    <div key={name} className="group">
                      <label className="flex items-center gap-2 mb-2 text-sm font-medium text-purple-300">
                        <span>{icon}</span>
                        {label}
                      </label>
                      <input
                        name={name}
                        placeholder={placeholder}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/10 disabled:opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        required
                      />
                    </div>
                  ))}

                  <div className="md:col-span-2 group">
                    <label className="flex items-center gap-2 mb-2 text-sm font-medium text-purple-300">
                      <span>📝</span>
                      Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Brief description about the slider"
                      value={formData.description || ""}
                      onChange={handleChange}
                      disabled={loading}
                      rows={4}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:bg-white/10 disabled:opacity-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 resize-none"
                      required
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      disabled={loading}
                      className="px-6 py-3 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white disabled:opacity-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative flex items-center gap-2">
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Loading...
                          </>
                        ) : (
                          <>
                            {isEditing ? "💾 Save Changes" : "✨ Create Slider"}
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SliderAdmin;
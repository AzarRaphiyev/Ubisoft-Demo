import React, { useContext, useState, useMemo } from "react";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { 
  Loader, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  ShoppingCart, 
  DollarSign, 
  Package,
  Calendar,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Gamepad2,
  Star,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { GameContext } from "../context/DataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale
);

const AdminHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("views");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeFilter, setTimeFilter] = useState("all");
  const {gamedata, sliderdata, dlcdata,universedata,news, error, loader} = useContext(GameContext)
  // Mock data - replace with actual context
  const gameData = gamedata
  const allGenres = gameData.flatMap(item => item.genre || []);
  const uniqueGenres = [...new Set(allGenres)];
  const sliderData = sliderdata

  const dlcData = dlcdata

  const newsData = news

  const universeData = universedata
if (!gameData || !sliderdata|| !news ||!dlcdata||!universedata) {
  <Loader />
}
  // Calculate statistics
  const totalGames = gameData.length;
  const totalDLCs = dlcData.length;
  const totalViews = gameData.reduce((acc, game) => acc + (game.viewCount || 0), 0);
  const totalSales = gameData.reduce((acc, game) => acc + (game.saleCount || 0), 0);
  const avgPrice = gameData.reduce((acc, game) => acc + (game.price || 0), 0) / totalGames;

  // Calculate trends
  const viewsTrend = 12; // Mock percentage
  const salesTrend = -3; // Mock percentage

  // Filter and search functionality
  const filteredGames = useMemo(() => {
    return gameData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" ||  game.genre.some(g => g.toLowerCase() === filterType.toLowerCase());
      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      if (sortBy === "views") return (b.viewCount || 0) - (a.viewCount || 0);
      if (sortBy === "sales") return (b.saleCount || 0) - (a.saleCount || 0);
      if (sortBy === "price") return (b.price || 0) - (a.price || 0);
      return 0;
    });
  }, [searchTerm, filterType, sortBy]);

  // Enhanced chart data
  const priceDistribution = () => {
    const ranges = ["$0-20", "$21-40", "$41-60", "$61+"];
    const counts = [0, 0, 0, 0];

    gameData.forEach((game) => {
      const price = game.price || 0;
      if (price <= 20) counts[0]++;
      else if (price <= 40) counts[1]++;
      else if (price <= 60) counts[2]++;
      else counts[3]++;
    });

    return {
      labels: ranges,
      datasets: [
        {
          label: "Qiymət Paylanması",
          data: counts,
          backgroundColor: ["#4ade80", "#22d3ee", "#f87171", "#c084fc"],
          borderColor: "#1f2937",
          borderWidth: 2,
        },
      ],
    };
  };

  const gameTypeDistribution = () => {
    const types = [...new Set(gameData.map(game => game.productEdition))];
    const counts = types.map(type => 
      gameData.filter(game => game.productEdition === type).length
    );

    return {
      labels: types,
      datasets: [
        {
          label: "Oyun Növləri",
          data: counts,
          backgroundColor: [
            "#2563eb",
            "#dc2626", 
            "#059669",
            "#7c3aed",
            "#ea580c"
          ],
          borderColor: "#1f2937",
          borderWidth: 2,
        },
      ],
    };
  };

  const performanceMetrics = () => {
    const uniqueBrands = new Set();
    const topGames = [];
  
    for (const game of gameData) {
      if (!uniqueBrands.has(game.brand)) { // əgər bu brend əvvəllər seçilməyibsə
        uniqueBrands.add(game.brand);
        topGames.push(game);
      }
      if (topGames.length === 3) break; // 5 oyun seçilibsə, dayandır
    }
  
    return {
      labels: topGames.map(g => g.title.substring(0, 15) + "..."),
      datasets: [
        {
          label: "Performans Skoru",
          data: topGames.map(g => (g.viewCount * 0.6 + g.saleCount * 0.4) / 100),
          backgroundColor: "rgba(34, 211, 238, 0.2)",
          borderColor: "#22d3ee",
          pointBackgroundColor: "#22d3ee",
          pointBorderColor: "#1f2937",
          pointHoverBackgroundColor: "#1f2937",
          pointHoverBorderColor: "#22d3ee",
        },
      ],
    };
  };
  

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-6 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Məlumatları idarə edin və statistikaları izləyin</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Son yeniləmə</p>
              <p className="text-white font-semibold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Gamepad2 className="w-6 h-6 text-blue-400" />
              </div>
             
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Ümumi Oyunlar</h3>
            <p className="text-3xl font-bold mt-1">{totalGames}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              
            </div>
            <h3 className="text-gray-400 text-sm font-medium">DLC-lər</h3>
            <p className="text-3xl font-bold mt-1">{totalDLCs}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Eye className="w-6 h-6 text-orange-400" />
              </div>
             
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Ümumi Baxışlar</h3>
            <p className="text-3xl font-bold mt-1">{totalViews.toLocaleString()}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-400" />
              </div>
              
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Ümumi Satışlar</h3>
            <p className="text-3xl font-bold mt-1">{totalSales.toLocaleString()}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex items-center text-gray-400">
                <span className="text-sm">Avg</span>
              </div>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">Orta Qiymət</h3>
            <p className="text-3xl font-bold mt-1">${avgPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Enhanced Interactive Slider */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-blue-400" />
            Xüsusi Təkliflər
          </h2>
          <div className="relative">
            {sliderData.length > 0 && (
              <div className="relative overflow-hidden rounded-lg">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {sliderData.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-100 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-xl font-bold text-white">{slide.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
              {sliderData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-green-400" />
              Qiymət Paylanması
            </h3>
            <div className="h-64">
              <Doughnut 
                data={priceDistribution()} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { color: '#ffffff' }
                    }
                  }
                }} 
              />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              Oyun Editionları
            </h3>
            <div className="h-64">
              <Bar 
                data={gameTypeDistribution()} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    x: { ticks: { color: '#ffffff' } },
                    y: { ticks: { color: '#ffffff' } }
                  }
                }} 
              />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-cyan-400" />
              Performans Metriklər
            </h3>
            <div className="h-64">
              <Radar 
                data={performanceMetrics()} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false }
                  },
                  scales: {
                    r: {
                      ticks: { color: '#ffffff', backdropColor: 'transparent' },
                      grid: { color: '#374151' }
                    }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Enhanced Games Table with Filters */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-2xl font-semibold flex items-center">
                <Users className="w-6 h-6 mr-2 text-purple-400" />
                Oyunlar İdarəetməsi
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Oyun axtar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">Bütün növlər</option>
                  {
                    uniqueGenres.map(item=>(
                      <option value={item}>{item}</option>
                    ))
                  }
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="views">Baxışlara görə</option>
                  <option value="sales">Satışlara görə</option>
                  <option value="price">Qiymətə görə</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Oyun</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Edition</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Qiymət</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Endirim</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Satışlar</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Baxışlar</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredGames.map((game, index) => (
                  <tr key={game.id} className={`border-b border-gray-700 hover:bg-gray-700/50 transition-colors ${index % 2 === 0 ? 'bg-gray-800/30' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-600 rounded-lg flex items-center justify-center mr-3">
                          <Gamepad2 className="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{game.title}</div>
                          <div className="text-sm text-gray-400">{game.releaseDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {game.productEdition}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white font-semibold">${game.price}</td>
                    <td className="px-6 py-4">
                      {game.discount > 0 ? (
                        <span className="text-green-400 font-semibold">-{game.discount}%</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-white">{game.saleCount}</td>
                    <td className="px-6 py-4 text-sm text-white">{game.viewCount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Aktiv
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Son Xəbərlər</h3>
            <div className="space-y-3">
              {newsData.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{item.title}</p>
                    <p className="text-xs text-gray-400">{new Date(item.releaseDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Top DLC-lər</h3>
            <div className="space-y-3">
              {dlcData.map((dlc) => (
                <div key={dlc.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-white">{dlc.title}</p>
                    <p className="text-xs text-gray-400">${dlc.price}</p>
                  </div>
                  <Star className="w-4 h-4 text-yellow-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Universe Stats</h3>
            <div className="grid grid-cols-3 gap-3">
              {universeData.map((univ) => (
                <div key={univ.id} className="text-center p-3 bg-gray-700/50 rounded-lg">
                  <img
                    src={univ.cardImg}
                    alt={univ.name}
                    className="mx-auto "
                  />
                  <p className="text-xs text-gray-300">{univ.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
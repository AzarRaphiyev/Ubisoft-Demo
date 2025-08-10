import React, { useContext } from "react";
import { Bar, Line } from "react-chartjs-2";
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
} from "chart.js";
import { GameContext } from '../context/DataContext'
import { Loader } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AdminHome = () => {
  const {
    gamedata = [],
    sliderdata = [],
    dlcdata = [],
    universedata = [],
    news = [],
    error,
    loader,
  } = useContext(GameContext);

  if (loader) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl mt-20">
        Xəta baş verdi: {error}
      </div>
    );
  }

  // Ümumi statistikalar
  const totalGames = gamedata.length;
  const totalDLCs = dlcdata.length;
  const totalViews = gamedata.reduce((acc, game) => acc + (game.viewCount || 0), 0);
  const totalSales = gamedata.reduce((acc, game) => acc + (game.saleCount || 0), 0);

  // Qiymət paylanması
  const priceDistribution = () => {
    if (!gamedata.length) return {};
    const ranges = ["0-10", "11-30", "31-50", "51-70", "71-100", "100+"];
    const counts = [0, 0, 0, 0, 0, 0];

    gamedata.forEach((game) => {
      const price = game.price || 0;
      if (price <= 10) counts[0]++;
      else if (price <= 30) counts[1]++;
      else if (price <= 50) counts[2]++;
      else if (price <= 70) counts[3]++;
      else if (price <= 100) counts[4]++;
      else counts[5]++;
    });

    return {
      labels: ranges,
      datasets: [
        {
          label: "Oyunların Qiymət Paylanması ($)",
          data: counts,
          backgroundColor: [
            "#4ade80",
            "#22d3ee",
            "#facc15",
            "#f87171",
            "#c084fc",
            "#60a5fa",
          ],
        },
      ],
    };
  };

  // Ən çox satılan oyunlar
  const topSales = () => {
    if (!gamedata.length) return {};
    const sortedBySales = [...gamedata]
      .sort((a, b) => (b.saleCount || 0) - (a.saleCount || 0))
      .slice(0, 5);
    return {
      labels: sortedBySales.map((g) => g.title),
      datasets: [
        {
          label: "Ən çox satılan 5 oyun",
          data: sortedBySales.map((g) => g.saleCount || 0),
          backgroundColor: "#2563eb",
        },
      ],
    };
  };

  // Ən çox baxılan oyunlar
  const topViews = () => {
    if (!gamedata.length) return {};
    const sortedByViews = [...gamedata]
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, 5);
    return {
      labels: sortedByViews.map((g) => g.title),
      datasets: [
        {
          label: "Ən çox baxılan 5 oyun",
          data: sortedByViews.map((g) => g.viewCount || 0),
          backgroundColor: "#f97316",
        },
      ],
    };
  };

  // Aylara görə xəbərlər
  const newsPerMonth = () => {
    if (!news.length) return {};
    const months = [
      "Yan", "Fev", "Mar", "Apr", "May", "İyun",
      "İyul", "Avq", "Sen", "Okt", "Noy", "Dek",
    ];
    const monthCounts = new Array(12).fill(0);
    news.forEach((item) => {
      if (item.date) {
        const d = new Date(item.date);
        if (!isNaN(d)) monthCounts[d.getMonth()]++;
      }
    });
    return {
      labels: months,
      datasets: [
        {
          label: "Aylara görə xəbərlər",
          data: monthCounts,
          fill: false,
          borderColor: "#f97316",
          backgroundColor: "#fb923c",
          tension: 0.3,
        },
      ],
    };
  };

  // Oyunlar viewCount-a görə sort olunmuş
  const sortedGamesByViews = [...gamedata].sort(
    (a, b) => (b.viewCount || 0) - (a.viewCount || 0)
  );

  return (
    <div className="min-h-screen bg-gray-900/70 p-6 text-white max-w-7xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Ümumi göstəricilər kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Ümumi Oyunlar</h2>
          <p className="text-4xl font-bold">{totalGames}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Ümumi DLC-lər</h2>
          <p className="text-4xl font-bold">{totalDLCs}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Ümumi Baxışlar</h2>
          <p className="text-4xl font-bold">{totalViews}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow text-center">
          <h2 className="text-2xl font-semibold mb-2">Ümumi Satışlar</h2>
          <p className="text-4xl font-bold">{totalSales}</p>
        </div>
      </div>

      {/* Qrafiklər */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">Qiymət Paylanması</h3>
          <Bar data={priceDistribution()} options={{ responsive: true }} />
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">Ən çox satılan oyunlar</h3>
          <Bar data={topSales()} options={{ responsive: true }} />
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">Ən çox baxılan oyunlar</h3>
          <Bar data={topViews()} options={{ responsive: true }} />
        </div>

        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">Aylara görə xəbərlər</h3>
          <Line data={newsPerMonth()} options={{ responsive: true }} />
        </div>
      </div>

      {/* Sliders (sekiller carousel kimi) */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Slider Şəkillər</h2>
        {sliderdata.length === 0 ? (
          <p>Slider məlumatı yoxdur.</p>
        ) : (
          <div className="flex space-x-4 overflow-x-auto py-2">
            {sliderdata.map((slide) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title || "Slider Image"}
                className="h-40 rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </section>

      {/* Oyunlar cədvəli viewCount-a görə sıralanmış */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Oyunlar Cədvəli (Baxışlara görə sıralanmış)</h2>
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-gray-800 text-white text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Başlıq</th>
                <th className="px-4 py-2 border-b border-gray-700">Növ</th>
                <th className="px-4 py-2 border-b border-gray-700">Qiymət</th>
                <th className="px-4 py-2 border-b border-gray-700">Endirim (%)</th>
                <th className="px-4 py-2 border-b border-gray-700">Satışlar</th>
                <th className="px-4 py-2 border-b border-gray-700">Baxışlar</th>
                <th className="px-4 py-2 border-b border-gray-700">Çıxış tarixi</th>
              </tr>
            </thead>
            <tbody>
              {sortedGamesByViews.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-400">
                    Oyun məlumatı yoxdur
                  </td>
                </tr>
              ) : (
                sortedGamesByViews.map((game) => (
                  <tr
                    key={game.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{game.title}</td>
                    <td className="px-4 py-2">{game.type}</td>
                    <td className="px-4 py-2">${game.price?.toFixed(2)}</td>
                    <td className="px-4 py-2">{game.discount}%</td>
                    <td className="px-4 py-2">{game.saleCount || 0}</td>
                    <td className="px-4 py-2">{game.viewCount || 0}</td>
                    <td className="px-4 py-2">{game.releaseDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* DLC-lər cədvəli */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">DLC-lər Cədvəli</h2>
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-gray-800 text-white text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Başlıq</th>
                <th className="px-4 py-2 border-b border-gray-700">Əlavə oyun</th>
                <th className="px-4 py-2 border-b border-gray-700">Qiymət</th>
                <th className="px-4 py-2 border-b border-gray-700">Endirim (%)</th>
                <th className="px-4 py-2 border-b border-gray-700">Çıxış tarixi</th>
              </tr>
            </thead>
            <tbody>
  {dlcdata.length === 0 ? (
    <tr>
      <td colSpan={5} className="text-center p-4 text-gray-400">
        DLC məlumatı yoxdur
      </td>
    </tr>
  ) : (
    dlcdata.map((dlc) => {
      // Hər dlc üçün uyğun oyun tapılır
      const parentGame = gamedata.find(game => game.id === dlc.gameId);

      return (
        <tr
          key={dlc.id}
          className="border-b border-gray-700 hover:bg-gray-700 transition"
        >
          <td className="px-4 py-2">{dlc.title}</td>
          <td className="px-4 py-2">{parentGame ? parentGame.title : "N/A"}</td>
          <td className="px-4 py-2">${dlc.price?.toFixed(2)}</td>
          <td className="px-4 py-2">{dlc.discount || 0}%</td>
          <td className="px-4 py-2">{dlc.releaseDate || "?"}</td>
        </tr>
      );
    })
  )}
</tbody>
          </table>
        </div>
      </section>

      {/* News cədvəli */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Xəbərlər</h2>
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-gray-800 text-white text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Başlıq</th>
                <th className="px-4 py-2 border-b border-gray-700">Tarix</th>
                <th className="px-4 py-2 border-b border-gray-700">Brand</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-400">
                    Xəbər məlumatı yoxdur
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">{new Date(item.releaseDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{item.gameBrand || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ubisoft Universe */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Ubisoft Universe</h2>
        {universedata.length === 0 ? (
          <p>Universe məlumatı yoxdur.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {universedata.map((univ) => (
              <div key={univ.id} className="bg-gray-800 rounded p-3 text-center">
                <img
                  src={univ.cardImg}
                  alt={univ.name}
                  className="mx-auto  h-16 object-contain"
                />
                <p className="text-sm">{univ.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminHome;

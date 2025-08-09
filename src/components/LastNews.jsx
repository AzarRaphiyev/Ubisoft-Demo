import React from 'react'
import { Link } from 'react-router';

function LastNews({news}) {
    const data = [...news]
  .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
  .slice(0, 4); 


    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const seconds = Math.floor((now - past) / 1000);
      
        const intervals = [
          { label: "year", seconds: 31536000 },
          { label: "month", seconds: 2592000 },
          { label: "day", seconds: 86400 },
          { label: "hour", seconds: 3600 },
          { label: "minute", seconds: 60 },
          { label: "second", seconds: 1 },
        ];
      
        for (const interval of intervals) {
          const count = Math.floor(seconds / interval.seconds);
          if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
          }
        }
        return "just now";
      }
      
      return (
        <div className='container2 m-auto my-[30px]'>
        <h1 className='text-[#f2f2f2] text-[24px] ubisoft-bold my-[15px] '>Latest News <sup className='hover:underline  text-blue-400 text-[16px]'> <Link to={'/news'}>View all</Link></sup></h1>
        <div className="flex gap-[20px] overflow-x-auto xl:overflow-hidden flex-nowrap scrollbar-hide">
            {data.map(item => (
                <div
                key={item.id}
                className="bg-[#1e1e1e] text-white rounded-xl overflow-hidden w-[325px] flex-shrink-0 cursor-pointer shadow-lg"
                >
                {/* Image */}
                <div className="h-[160px] w-full overflow-hidden">
                    <img
                    src={item.sectionImg}
                    alt={item.title}
                    className="h-full hover:scale-110 duration-300 w-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-4 FLEX flex-col justify-between">
                    <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">
                    {item.gameBrand}
                    </p>
                    <h2 className="text-[15px] font-bold leading-tight mt-1 line-clamp-2">
                    {item.title.slice(0,35)}...
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                    {item.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{timeAgo(item.releaseDate)}</p>
                </div>
                </div>
            ))}
            </div>


    </div>
        
      );
}

export default LastNews
import React, {  useState } from 'react'
import { CiHeart } from 'react-icons/ci';
import { useParams } from 'react-router'
import GameSlider from '../components/GameSlider';
import DetailHeader from '../components/DetailHeader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { getAllDLCs, getAllGames, getDLCsById, getGamesById } from '../services/GameService';
import Loader from '../components/Loader';




function Detail() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, [])
  const {type, id}=useParams()
  console.log(type);
  console.log(id);
  const [obj, setObj] = useState(null);

  
  useEffect(()=>{

    if (type==="basedgame") {
      getGamesById(id).then((item) => setObj(item));
      window.scrollTo(0, 0);
        }
    else{
      getDLCsById(id).then((item)=>setObj(item))
      window.scrollTo(0, 0);
    }
  },[type,id])

  if (!obj) {
    return <Loader />;
  }
  
  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  }
  
  
  
  return (
    <div className='py-[55px]'>
      {/* Detail Header Section */}
      <DetailHeader/>

      {/* Banner Section */}

    <div className=' bg-white relative mt-[67px]  mb-[90px] '>



      
      <div className=' relative '>
      <div className="relative w-full">
      <img className="w-full" src={obj?.bannerImg} alt="" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent opacity-60 z-1"></div>
      </div>


        <div className='absolute z-2 top-0 flex w-[100%] h-[100%] justify-between px-[30px] pt-[30px]'>
          <div className='flex flex-col gap-[80px]'>
            <div><img src={obj?.logo} className='w-[200px]' alt="" /></div>
            <div>
              <h1 className='ubisoft-bold text-[2.5vw] text-[#fff]'>{obj?.title} - </h1>
              <h1 className='ubisoft-bold text-[2.5vw] text-[#fff]'>{obj?.productEdition}</h1>
              <p className='ubisoft-text text-[#fff]'>Release date: {formatDate(obj?.releaseDate)}</p>
              <button className='ubisoft-bold px-[30px] py-[5px]  border-[#fff] border-[1px] duration-200 my-[15px] text-[20px] cursor-pointer text-[#fff] rounded-2xl hover:border-[#000] hover:bg-[#fff] hover:text-[#000] '>Discover Editions</button>
            </div>
          </div>
          <div className='flex flex-col justify-between items-end '>
            <div className='flex gap-[10px]  w-[60%] items-center justify-between p-[10px] bg-[#2a2a2a]/70 rounded-xl '>
           
           {obj?.ageRating.rating==18 ?
             <img className='w-[55px]'  src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwc012ec98/images/rating/pegi-18.png" alt="" />:
             obj?.ageRating.rating==12 ?
             <img className='w-[55px]'  src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw1531754a/12_Pending.PNG" alt="" />:
             <img className='w-[55px]'  src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwcb496937/images/rating/pegi-7.png" alt="" />
           }
            

              <p className='ubisoft-text w-[70%] text-[#fff]'>{obj?.ageRating?.reasons?.join(",  ")}</p>
              </div>
          <div>
            <div className='h-[210px] w-[400px] bg-black p-[30px] flex  flex-col justify-between'>
              <div className='bg-[#45464A] px-[10px] rounded'>
                <p className='ubisoft-text text-[#fff] text-[2.5vw]'> {obj.price ==0 ? "Free":"€ "+obj.price}</p>
              </div>
              <div className='flex items-center justify-between' >
                <button className='text-center text-[#fff] text-[23px] open-sans-bold bg-[#006EF5] w-[85%] p-[2px] rounded-2xl cursor-pointer hover:text-[black] duration-300'>Pre-Order</button>
                <CiHeart className='text-[#fff] ' size={40}/>
              </div>

            </div>
          </div>
          </div>

        </div>
      </div>
    </div>
    {/* Slider Section */}
    <div  className='pb-[50px]'>

      <GameSlider screenshots={obj.screenshots} videos={obj.videos} />
    </div >

    {/* About Section */}
    <div className='container2 mx-auto flex flex-col gap-[20px] '>
    <h1 className='ubisoft-bold text-white text-2xl' >About this game</h1>
    <div className='flex justify-between bg-[#1B1B1B] px-[30px] py-[20px] rounded-lg'>

      <div className='flex flex-col w-[70%] gap-[10px] items-start '>
        <p className='ubisoft-text  text-[18px]'>{obj?.shortDescription}</p>
        <div className='flex gap-[5px]'>
          <p className='ubisoft-bold text-[16px]'>Release date:</p>
          <p className='ubisoft-text text-[16px]'>{formatDate(obj?.releaseDate)}</p>
        </div>
      </div>
      <div className='w-[20%] flex flex-col gap-[10px]'>
        <div>
          <h3 className='ubisoft-bold text-white mb-[5px] text-[16px] '>Platform:</h3>
          <div className='flex flex-wrap gap-3'>
            {obj?.platforms.map(item=>

          <button className='border-white border-[2px] px-[16px] py-[1.5px]  ubisoft-bold rounded uppercase text-[14px]'>{item}</button>
            )}
          </div>
        </div>
        <div >
          <h3 className='ubisoft-bold text-white mb-[5px] text-[16px] '>Genre:</h3>
          <div className='flex flex-wrap gap-3'>
          {obj?.genre.map(item=>

          <button className='border-white border-[2px] px-[16px] py-[1.5px]  ubisoft-bold rounded uppercase text-[14px]'>{item}</button>
            )}
            </div>
        </div>
        
      </div>
    </div>
    </div>

    {/* Navbar Detail Section */}

    <div className='flex bg-black gap-[50px] justify-center mt-[50px] h-[80px] items-center'>
      <a className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>Editions</a>
      <a href='#moreContent' className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>More Content</a>
      <a href='#generalInformation' className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>General Information</a>
      <a className='ubisoft-text uppercase text-[20px] hover:border-b-[5px] py-[20px] duration-200 cursor-pointer'>Pc Specs</a> 
    </div>

    {/*  More Content Section */}
    {obj.descriptionImg?.length!=0?
     <div  id="moreContent" className='mt-[50px] scroll-mt-[150px]'>
     {obj.descriptionImg?.map((item, index) => (
       <div
         key={index}
         className="bg-cover bg-center w-full h-[90vh]"
         style={{ backgroundImage: `url(${encodeURI(item)})` }}
       >
         {
           index % 2 === 0 ? (
             // CÜT INDEX → fade-left (solda yazı)
             <div
               className='w-[45%] bg-black/80 px-15 py-10 relative top-110 left-20'
               data-aos="fade-right"
             >
               <h3 className='font-bold text-[40px]'>{obj.fullDescription?.[index]?.heading}</h3>
               <p className='ubisoft-text text-[20px]'>
               {obj.fullDescription?.[index]?.content}
               </p>
             </div>
           ) : (
             // TƏK INDEX → fade-right (sağda yazı)
             <div
               className='w-[50%] bg-black/80 px-15 py-10 relative top-110 left-180'
               data-aos="fade-left"
             >
               <h3 className='font-bold text-[40px]'>{obj.fullDescription?.[index]?.heading}</h3>
               <p className='ubisoft-text text-[20px]'>
               {obj.fullDescription?.[index]?.content}
               </p>
             </div>
           )
         }
       </div>
     ))}
   </div>:''
  
  }
   


    {/*  General information Section */}
    <div id="generalInformation" className='w-[80%] mx-auto mt-[50px] scroll-mt-[150px]'>
      <h2 className='ubisoft-bold text-[2.5rem] text-center mb-[20px]'>General information </h2>
      <div className='flex gap-10 items-start flex-col lg:flex-row xl:flex-row '>

      <div className='flex flex-col gap-5'>
        <div className='flex gap-2 text-[16px]'>
        <p className='ubisoft-bold'>Publisher: </p> <span className='ubisoft-text'>{obj.publisher}</span>
        </div>
        <div className='flex gap-2 text-[16px]'>
        <p className='ubisoft-bold'>Developer: </p> <span className='ubisoft-text'>{obj.developer}</span>
        </div>
        <div className='flex gap-2 text-[16px]'>
        <p className='ubisoft-bold'>Release date: </p> <span className='ubisoft-text'>{formatDate(obj?.releaseDate)}</span>
        </div>
       
      </div>

      <div className='flex flex-col gap-5'>
      <div className='flex gap-5 text-[16px]'>
        <p className='ubisoft-bold'>Description: </p> <span className='ubisoft-text'>{obj.shortDescription}</span>
        </div>
        <div className='flex gap-[10px] w-fit  items-center justify-between  '>
           
           {obj?.ageRating.rating==18 ?
             <img className='w-[45px]'  src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwc012ec98/images/rating/pegi-18.png" alt="" />:
             obj?.ageRating.rating==12 ?
             <img className='w-[45px]'  src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dw1531754a/12_Pending.PNG" alt="" />:
             <img className='w-[45px]'  src="https://store.ubisoft.com/on/demandware.static/-/Library-Sites-shared-library-web/default/dwcb496937/images/rating/pegi-7.png" alt="" />
           }
            

              <p className='ubisoft-text w-[70%] text-[#fff]'>{obj?.ageRating?.reasons?.join(",  ")}</p>

        </div>
        <div>
        <p className='ubisoft-bold'>Language: </p>
        {obj.languages.slice(0, 3).map((item, index) => (
  <p className='ubisoft-text' key={index}>
    {item.language} (
    {item.audio ? " Audio, " : ""}
    {item.interface ? " Interface, " : ""}
    {item.subtitle ? " Subtitle, " : ""}
    )
  </p>
))}

        </div>
      </div>

      <div className='flex flex-col'>
      
      <div className='flex gap-2 flex-wrap text-[16px] items-center'>
        <p className='ubisoft-bold'>Platforms: </p> 
        {obj?.platforms.map((item, index) => (
        <span key={index} className='ubisoft-text  uppercase text-[14px]'>
          {item }{index !== obj.platforms.length - 1 ? ', ' : ''}
        </span>
      ))}

        </div>
        <div className='flex gap-2 flex-wrap text-[16px] items-center'>
        <p className='ubisoft-bold'>Genres: </p> 
        {obj?.genre.map((item, index) => (
        <span key={index} className='ubisoft-text  uppercase text-[14px]'>
          {item }{index !== obj.genre.length - 1 ? ', ' : ''}
        </span>
      ))}

        </div>
      </div>
      
      </div>
    </div>

    </div>
  )
}

export default Detail
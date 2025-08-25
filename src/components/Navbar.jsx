import React from 'react'
import { Search, ChevronDown , ChevronUp } from 'lucide-react';
import scene from "../scene.json";
import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlignJustify } from 'lucide-react';
import { FaCaretLeft } from "react-icons/fa";
import oval from "../assets/IMG_5738.jpg"
import eng from "../assets/IMG_5856.jpg"
import fountain from "../assets/IMG_5707.jpg"
import park from "../assets/IMG_5708.jpg"

function Navbar({setCurrentScene}) {


    const [query, setQuery] = useState([]);
    const [suggestion, setSuggestion] = useState([]);
    const [arrowClicked, setArrowClicked] =  useState(false);
   
  const handleInput = (e) =>{
     const value = e.target.value;
     console.log(value);
     if(value){
        
         const filteredSuggestion = Object.keys(scene).filter((item)=>item.toLowerCase().includes(value.toLowerCase()));

         setSuggestion(filteredSuggestion);
         console.log(filteredSuggestion);
        filteredSuggestion.length === 0 ? setQuery(value) : setQuery(filteredSuggestion);
     }else{
         setSuggestion([]);
         setQuery([]);
     }

  }

     const handleSuggestionClicked = (suggestion) =>{
        setQuery(suggestion);
        setCurrentScene(suggestion)
        const input = document.querySelector('input[type="search"]');
        if (input) {
            input.value = suggestion;
        }
        console.log(suggestion)
        setSuggestion([]);
   }

const clicked = () => {
  if (!query || (Array.isArray(query) ? query.length === 0 : query.trim().length === 0)) {
    return; // do nothing if query is null/empty
  }
  setCurrentScene(query);
};


   

  return (
  
      <>

          <div className={`absolute top-5 right-10 w-[350px] bg-white flex flex-col justify-center ${suggestion.length > 0 ? 'shadow-none' : 'shadow-2xl'} shadow-black  h-12 rounded-full p-1 items-center  text-black z-50`}>
        <div className='flex items-center gap-2'> 
            <Search color='black' onClick={clicked}/>
            <input onChange={handleInput} className='bg-white w-[250px] outline-none ' placeholder='Search location/place' type="search" />
            <p  onClick={()=>setArrowClicked(!arrowClicked)}>{arrowClicked ? <ChevronUp  color='black' size={30}  />: <ChevronDown color='black' size={30} />}</p>
        </div>
     

        </div>
           <div className={`absolute top-10 right-10 h-[60vh] bg-white w-[350px] ${suggestion && suggestion.length > 0 ? 'block' : 'hidden'} z-40`}> 
            <div className='overflow-x-auto h-[60vh] pt-8'>
              {suggestion.map((suggestions, index)=>(
                <div className=' flex flex-col gap-4 ' key={index}>
                    <ul onClick={()=>handleSuggestionClicked(suggestions)} className='text-base py-2 hover:bg-gray-200 p-2 pl-3'>{suggestions}</ul>
                </div>
              ))}
            </div>
           </div>


              

      <div className={`absolute overflow-x-hidden ${arrowClicked ? 'block' : 'hidden' } flex justify-center items-center top-0 pt-16 z-30 right-10 pr-  h-[99vh] w-[400px]  `} >
         <div className='flex flex-row items-center  '>
           <button className={` rounded-l-xl  text-8xl text-white  z-20`}><FaCaretLeft onClick={()=>setArrowClicked(!arrowClicked)} /></button>
            <div className='flex flex-col gap-6 items-center  overflow-y-scroll h-[80vh]'>
              
                <div onClick={()=>setCurrentScene("oval_entrance")} className="relative inline-block cursor-pointer">
                    {/* Image */}
                    <img 
                      className="w-[300px] h-[140px] p-2 rounded-md bg-white" 
                      src={oval} 
                      alt="" 
                    />

                    {/* Overlay only on the image area */}
                    <div className="absolute top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
                                    bg-gray-800 bg-opacity-50 flex items-center justify-center 
                                    rounded-md ">
                      <span className="text-white text-2xl font-bold">
                      OVAL
                      </span>
                    </div>
                  </div>
                <div className="relative inline-block cursor-pointer">
                    {/* Image */}
                    <img 
                      className="w-[300px] h-[140px] p-2 rounded-md bg-white" 
                      src={eng} 
                      alt="" 
                    />

                    {/* Overlay only on the image area */}
                    <div className="absolute top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
                                    bg-gray-800 bg-opacity-50 flex items-center justify-center 
                                    rounded-md ">
                      <span className="text-white text-2xl text-center font-bold">
                      UNDER DEVELOPMENT
                      </span>
                    </div>
                  </div>
                <div onClick={()=>setCurrentScene("errc_blg")} className="relative inline-block cursor-pointer">
                    {/* Image */}
                    <img 
                      className="w-[300px] h-[140px] p-2 rounded-md bg-white" 
                      src={fountain} 
                      alt="" 
                    />

                    {/* Overlay only on the image area */}
                    <div className="absolute top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
                                    bg-gray-800 bg-opacity-50 flex items-center justify-center 
                                    rounded-md ">
                      <span className="text-white text-2xl text-center font-bold">
                      ERRC BUILDING
                      </span>
                    </div>
                  </div>
                   <div className="relative inline-block cursor-pointer">
                    {/* Image */}
                    <img 
                      className="w-[300px] h-[140px] p-2 rounded-md bg-white" 
                      src={park} 
                      alt="" 
                    />

                    {/* Overlay only on the image area */}
                    <div className="absolute top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
                                    bg-gray-800 bg-opacity-50 flex items-center justify-center 
                                    rounded-md ">
                      <span className="text-white text-2xl text-center font-bold">
                      UNDER DEVELOPMENT
                      </span>
                    </div>
                  </div>
                     <div className="relative inline-block cursor-pointer">
                    {/* Image */}
                    <img 
                      className="w-[300px] h-[140px] p-2 rounded-md bg-white" 
                      src={fountain} 
                      alt="" 
                    />

                    {/* Overlay only on the image area */}
                    <div className="absolute top-2 left-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] 
                                    bg-gray-800 bg-opacity-50 flex items-center justify-center 
                                    rounded-md ">
                      <span className="text-white text-2xl text-center font-bold">
                      UNDER DEVELOPMENT
                      </span>
                    </div>
                  </div>
            </div>
         </div>
      </div>

      </>
  )
}

export default Navbar
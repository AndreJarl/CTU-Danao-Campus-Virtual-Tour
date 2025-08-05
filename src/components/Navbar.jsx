import React from 'react'
import { Search, ChevronDown  } from 'lucide-react';
import scene from "../scene.json";
import { useState } from 'react';

function Navbar({setCurrentScene}) {


    const [query, setQuery] = useState([]);
    const [suggestion, setSuggestion] = useState([]);

   
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
        const input = document.querySelector('input[type="search"]');
        if (input) {
            input.value = suggestion;
        }
        console.log(suggestion)
        setSuggestion([]);
   }


  return (
    <div className='flex gap-2'> 
        <Search />
        <input onChange={handleInput} className='bg-black w-[250px] outline-none ' placeholder='Search location/place' type="text" />
         <ChevronDown />
    </div>
  )
}

export default Navbar
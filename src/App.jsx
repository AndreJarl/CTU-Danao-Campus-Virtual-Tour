import Panorama from "./Panorama";
import 'pannellum/build/pannellum.css';
import { useState } from "react";
import { Plus, Minus, Maximize} from 'lucide-react';
import Navbar from "./components/Navbar";



function App() {

    const [currentScene, setCurrentScene] = useState('main_gate');

  return (
     <div className="relative w-full h-screen">
           {/* Navbar overlayed on top, absolute position */}
      <div className="absolute top-3 right-3 w-[350px] bg-black flex justify-center shadow-2xl shadow-black  h-12 rounded-full p-1 items-center text-white z-50">
        <Navbar setCurrentScene={setCurrentScene} />
      </div>

      <Panorama scene={currentScene} onChangeScene={setCurrentScene} />

     <div className="absolute bottom-0 left-0 w-full justify-between px-20 gap-44 flex items-center p-1 bg-[#0f0f0f] text-white h-5 z-50">

        <div className='text-[10px] flex gap-2 items-center'>
            <p className=' ml-4'>Cebu Technological University Danao Campus</p>
            <p>2025</p>
        </div>

        <div className='text-[10px]'>
            <p>Shot on iPhone</p>
        </div>

      </div>

    </div>
  );
}

export default App;

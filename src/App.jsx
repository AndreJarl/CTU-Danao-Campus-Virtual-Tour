import Panorama from "./Panorama";
import 'pannellum/build/pannellum.css';
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {

    const [currentScene, setCurrentScene] = useState('main_gate');

  return (
     <div className="relative w-full h-screen z-50">
           {/* Navbar overlayed on top, absolute position */}
        <Navbar setCurrentScene={setCurrentScene} />
 

      <Panorama scene={currentScene} onChangeScene={setCurrentScene} />

      <Footer/>

    </div>
  );
}

export default App;

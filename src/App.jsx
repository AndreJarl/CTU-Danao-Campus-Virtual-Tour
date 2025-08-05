import Panorama from "./Panorama";
import 'pannellum/build/pannellum.css';
import { useState } from "react";
import { Plus, Minus, Maximize} from 'lucide-react';

function App() {

  const [currentScene, setCurrentScene] = useState('main_gate');



  return (
    <div className="flex flex-col  items-center">
      <Panorama scene={currentScene} onChangeScene={setCurrentScene} />
    
    </div>
  );
}

export default App;

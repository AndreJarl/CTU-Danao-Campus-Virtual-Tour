import Panorama from "./Panorama";

import { useState } from "react";

function App() {

  const [currentScene, setCurrentScene] = useState('fountaion_park4');

  return (
    <div className="flex flex-col items-center">
      <Panorama scene={currentScene} onChangeScene={setCurrentScene} />

      
    </div>
  );
}

export default App;

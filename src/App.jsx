import Panorama from "./Panorama";

import { useState } from "react";

function App() {

  const [currentScene, setCurrentScene] = useState('old_admin_blg_road6');

  return (
    <div className="flex flex-col  items-center">
      <Panorama scene={currentScene} onChangeScene={setCurrentScene} />
    </div>
  );
}

export default App;

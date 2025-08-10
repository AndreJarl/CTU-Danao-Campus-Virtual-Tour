import React, { useEffect, useRef } from 'react';
import 'pannellum/build/pannellum.css';
import scenes from './scene.json';
import './index.css';
import { Plus, Minus, Maximize} from 'lucide-react';

function Panorama({ scene, onChangeScene }) {
  const viewerRef = useRef(null);
  const viewerInstance = useRef(null);

  // Custom arrow hotspot rendering
const customArrow = (hotSpotDiv, args = {}) => {
  let rotation = args.rotation || 0;



  // Optional: Allow using 'arrowType' to determine rotation
  if (args.arrowType) {
    if (args.arrowType === "backward") rotation = 180;
    if (args.arrowType === "left") rotation = -90;
    if (args.arrowType === "right") rotation = 90;
    if (args.arrowType === "forward") rotation = 0;
  }


  
  hotSpotDiv.innerHTML = `
     <div style="
    transform: scale(3.7) translateX(-9px) rotateX(60deg) rotate(${rotation}deg);
    width: 70px; height: 70px;
    transform-origin: center center;
    perspective: 800px;
  ">
      <svg width="70" height="70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="background: transparent">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="gray" flood-opacity="0.6"/>
          </filter>
        </defs>
        <polygon points="100,40 160,160 100,130 40,160" fill="white" filter="url(#shadow)" />
      </svg>
    </div>
    <div style="text-align: center; color: white; margin-top: 4px;">${args.label || ''}</div>
  `;


  hotSpotDiv.style.cursor = 'pointer';
  hotSpotDiv.addEventListener('click', () => {
    if (typeof onChangeScene === 'function' && args.sceneId) {
      onChangeScene(args.sceneId);
    }
  });
};



  // Initialize viewer once
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';

    script.onload = () => {
      if (viewerRef.current && !viewerInstance.current) {
        viewerInstance.current = window.pannellum.viewer(viewerRef.current, {
          default: {
            firstScene: scene,
            sceneFadeDuration: 1000,
            autoLoad: true,
            mouseZoom: true,           
            keyboardZoom: true, 
             showControls: false,
          },
          scenes: Object.fromEntries(
            Object.entries(scenes).map(([key, val]) => [
              key,
              {
                type: 'equirectangular',
                panorama: val.image,
                hfov: 150,
                hotSpots: val.hotspots.map(h => ({
                pitch: h.pitch,
                yaw: h.yaw,
                type: 'custom',
                createTooltipFunc: customArrow,
                createTooltipArgs: {
                    sceneId: h.target,
                    rotation: h.rotation,
                    arrowType: h.arrowType
                }
                })),


              }
            ])
          )
        });
      }
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Change scene using API
  useEffect(() => {
    if (viewerInstance.current && viewerInstance.current.getScene() !== scene) {
      viewerInstance.current.loadScene(scene);
    }
  }, [scene]);

      // 🔘 Zoom control functions
  const zoomIn = () => {
    if (viewerInstance.current) {
      const current = viewerInstance.current.getHfov();
      viewerInstance.current.setHfov(current - 30);
    }
  };

  const zoomOut = () => {
    if (viewerInstance.current) {
      const current = viewerInstance.current.getHfov();
      viewerInstance.current.setHfov(current + 30);
    }
  };

  const toggleFullscreen = () => {
    if (viewerInstance.current) {
      viewerInstance.current.toggleFullscreen();
    }
  };

return (
  <>
    <div className="relative w-full h-screen">
      <div ref={viewerRef} className="w-full h-full" />

      {/* Controls in lower-left corner */}
      <div className="absolute bottom-8 left-5 flex flex-row  gap-2 z-50">
        <button
          className="w-10 py-2 font-bold flex justify-center items-center bg-black shadow-2xl shadow-gray-800 rounded-full "
                   
          onClick={zoomIn}
        >
          <Plus color='white'/>
        </button>
        <button
          className="w-10 py-2 font-bold flex justify-center items-center bg-black shadow-2xl
                    shadow-gray-800 rounded-full "
          onClick={zoomOut}
        >
          <Minus color='white' />
        </button>
  
      </div>
    </div>
  </>
);



}
export default Panorama;

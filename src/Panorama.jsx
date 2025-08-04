import React, { useEffect, useRef } from 'react';
import 'pannellum/build/pannellum.css';
import scenes from './scene.json';
import './index.css';

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
    transform: scale(4.5) rotateX(60deg) rotate(${rotation}deg);
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
          },
          scenes: Object.fromEntries(
            Object.entries(scenes).map(([key, val]) => [
              key,
              {
                type: 'equirectangular',
                panorama: val.image,
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

  return <div ref={viewerRef} style={{ width: '100%', height: '100vh' }} />;
}

export default Panorama;

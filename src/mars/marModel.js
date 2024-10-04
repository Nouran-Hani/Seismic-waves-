// MoonModel.js
import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
// import lroc from './lroc_color_poles_8k.jpg';
// import ldem from './ldem_3_8bit.jpg';
import marsimg from './marsimg.jpg';
// import nakamura from './nakamurasmlocations.json';
// import * as d3 from 'd3'; // Ensure you import D3

export default function MarsModel() {
  const globeRef = useRef();

  const marsModel = () => {
    const mars = Globe()
      .width(637)
      .globeImageUrl(marsimg)
    //   .bumpImageUrl(ldem)
      // .backgroundColor('rgba(255, 255, 255, 0)')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGraticules(false)
      .showAtmosphere(true)
      .atmosphereColor("gray")
      .atmosphereAltitude(0.2);

    mars(globeRef.current);
  }

  useEffect(() => {
    marsModel()
  }, []);

  return (
    <div ref={globeRef}/>
  );
}
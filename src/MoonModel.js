// MoonModel.js
import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import lroc from './lroc_color_poles_8k.jpg';
import ldem from './ldem_3_8bit.jpg';
import nakamura from './nakamurasmlocations.json';

import * as d3 from 'd3'; // Ensure you import D3

const colorScale = d3.scaleOrdinal([
  t => `rgba(0,102,255,${Math.sqrt(1 - t)})`, 
  t => `rgba(0,120,0,${Math.sqrt(1 - t)})`,
  t => `rgba(255,200,2,${Math.sqrt(1 - t)})`, 
  t => `rgba(255,42,4,${Math.sqrt(1 - t)})`
]);

export default function MoonModel() {
  const globeRef = useRef();

  useEffect(() => {
    const moon = Globe()
      .globeImageUrl(lroc)
      .bumpImageUrl(ldem)
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGraticules(false)
      .showAtmosphere(true)
      .atmosphereColor("grey")
      .atmosphereAltitude(0.2)
      .labelText(d => `${d.label}`)
      .labelColor(() => "black")
      .labelSize(2.5)
      .labelDotRadius(0.3)
      .labelLabel(d => `
        <div>Moonquake No. <b>${d.label}</b></div>
        <div> Magnitude : <b>${d.magnitude}</b></div>
        <div> Lat, Long : <b>${d.lat}</b>\u00B0, <b>${d.lng}</b>\u00B0</div>
        <div>Date: <i>${new Date(d.date).toLocaleDateString()}</i></div>
        <div>Time: <i>${d.time}</i></div>
      `)
      .ringColor(d => colorScale(d.scale))
      .ringMaxRadius(d => 6 * (d.magnitude))
      .ringPropagationSpeed(d => 2)
      .ringRepeatPeriod(d => 1 / (d.magnitude) * 200 + 100);

    moon(globeRef.current);

    fetch(nakamura).then(r => r.json()).then(landingSites => {
      moon.labelsData(landingSites);
      moon.ringsData(landingSites);
    });

  }, []);

  return <div ref={globeRef}/>;
}

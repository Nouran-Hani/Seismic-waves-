// MoonModel.js
import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import lroc from './lroc_color_poles_8k.jpg';
import ldem from './ldem_3_8bit.jpg';
import * as d3 from 'd3'; // Ensure you import D3

const colorScale = d3.scaleOrdinal([
  t => `rgba(0,102,255,${Math.sqrt(1 - t)})`, 
  t => `rgba(0,120,0,${Math.sqrt(1 - t)})`,
  t => `rgba(255,200,2,${Math.sqrt(1 - t)})`, 
  t => `rgba(255,42,4,${Math.sqrt(1 - t)})`
]);

export default function MoonModel({ sentSpeed, sentLat, sentLng, sentDate, sentTime }) {
  const globeRef = useRef();

   // Function to handle vibration and play sound
   const vibratepattern = (n, audioPath) => {
    const canVibrate = navigator.vibrate;
    if (canVibrate) {
      navigator.vibrate(500 * (n + 1));  // Vibrate based on input
    }
    play(audioPath, n);
  };

  // Function to play sound
  const play = (audioPath, ms) => {
    const beep = new Audio(audioPath);
    beep.loop = true;
    beep.play();
    setTimeout(() => {
      beep.pause();  // Stop playing after the timeout
    }, 500 * (ms + 1));
  };

  useEffect(() => {
    const moon = Globe()
      .width(637)
      .globeImageUrl(lroc)
      .bumpImageUrl(ldem)
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showGraticules(false)
      .showAtmosphere(true)
      .atmosphereColor("gray")
      .atmosphereAltitude(0.2)
      // .labelText(d => `${d.label}`)
      .labelColor(() => "black")
      .labelSize(2.5)
      .labelDotRadius(0.3)
      .labelLabel(d => `
        <div> Magnitude: <b>${sentSpeed}</b></div>
        <div> Lat, Long: <b>${sentLat}</b>\u00B0, <b>${sentLng}</b>\u00B0</div>
        <div>Date: <i>${new Date(sentDate).toLocaleDateString()}</i></div>
        <div>Time: <i>${sentTime}</i></div>
      `)
      .onLabelClick(d => vibratepattern(sentSpeed, './vibrate_sound.wav'))
      .ringColor(d => colorScale(sentSpeed)) // instead of the scale d.scale
      .ringMaxRadius(d => 6 * (sentSpeed))
      .ringPropagationSpeed(d => 2)
      .ringRepeatPeriod(d => 1 / (sentSpeed) * 200 + 100);

    // Attach the globe to the DOM element
    moon(globeRef.current);

    // Fetch the moonquake data from a public directory
    // fetch('./nakamurasmlocations.json')
    //   .then(response => response.json())
    //   .then(landingSites => {
    //     moon.labelsData(landingSites);
    //     moon.ringsData(landingSites);
    //   })
    //   .catch(err => console.error('Failed to load moonquake data:', err));
  }, []);

  return (
    // Provide some height for the globe container
    <div ref={globeRef} style={{ width: '100%', height: '100vh' }} />
  );
}

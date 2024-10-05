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
    .labelColor(() => "black")
      .labelSize(2.5)
      .labelDotRadius(0.3)
      .labelLabel(() => `
        <div> Magnitude: <b>${sentSpeed}</b></div>
        <div> Lat, Long: <b>${sentLat}</b>\u00B0, <b>${sentLng}</b>\u00B0</div>
        <div>Date: <i>${new Date(sentDate).toLocaleDateString()}</i></div>
        <div>Time: <i>${sentTime}</i></div>
        `)
        .onLabelClick(() => vibratepattern(sentSpeed, './vibrate_sound.wav'))
        .ringColor(() => colorScale(sentSpeed))
        .ringMaxRadius(() => 6 * sentSpeed)
        .ringPropagationSpeed(() => 2)
        .ringRepeatPeriod(() => 1 / sentSpeed * 200 + 100);
        
        // Attach the globe to the DOM element
        moon(globeRef.current);
        
  if (sentSpeed && sentLat && sentLng && sentDate && sentTime) {
    // Create labels and rings data dynamically
    const labels = {
      "lat": sentLat,
      "lng": sentLng,
      "magnitude": sentSpeed,
      "date": sentDate,
      "time": sentTime,
      "scale": 0
    };

    const rings = {
      "lat": sentLat,
      "lng": sentLng,
      "magnitude": sentSpeed,
      "scale": 0
    };

    moon.labelsData([labels]);
    moon.ringsData([rings]);
  

    console.log('Label:', labels);
    console.log('Ring:', rings);
  }
  }, [sentSpeed, sentLat, sentLng, sentDate, sentTime]);
  

  return (
    <div ref={globeRef} style={{ width: '100%', height: '100vh' }} />
  );
}

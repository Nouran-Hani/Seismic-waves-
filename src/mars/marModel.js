// MoonModel.js
import React, { useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import marsimg from './marsimg.jpg';
import * as d3 from 'd3'; // Ensure you import D3

const colorScale = d3.scaleOrdinal([
    t => `rgba(0,102,255,${Math.sqrt(1 - t)})`, 
    t => `rgba(0,120,0,${Math.sqrt(1 - t)})`,
    t => `rgba(255,200,2,${Math.sqrt(1 - t)})`, 
    t => `rgba(255,42,4,${Math.sqrt(1 - t)})`
]);

export default function MarsModel({ sentSpeed, sentLat, sentLng, sentDate, sentTime }) {
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
        .atmosphereAltitude(0.2)
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

        mars(globeRef.current);
    }

    useEffect(() => {
        marsModel()
    }, []);

    return (
    <div ref={globeRef}/>
);
}
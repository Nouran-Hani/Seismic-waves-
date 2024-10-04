// App.js
import React, { useState } from 'react';
import Header from './components/header';
import MoonModel from './moon/MoonModel';
import MarsModel from './mars/marModel';

export default function App() {

  const [planet, setPlanet] = useState('moon'); // Default selected option
  const [speed, setSpeed] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const handleOptionChange = (event) => {
    setPlanet(event.target.value); // Update the selected option
  };

  const [imageUrl, setImageUrl] = useState(null); // State to store image URL

  const uploadFile = () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    {planet === 'moon' ? 
      (fetch('https://www.nasa.great-eagle.net/upload_mseed_lunar', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.image) {
          setImageUrl('data:image/png;base64,' + data.image);
          setSpeed(data.speed)
          setLat(data.lat)
          setLng(data.lng)
          setDate(data.date)
          setTime(data.time)

        } else {
          console.error('Error:', data.error);
        }
      })
      .catch(error => console.error('Error:', error)))

      : (fetch('https://www.nasa.great-eagle.net/upload_mseed_mars', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.image) {
          setImageUrl('data:image/png;base64,' + data.image);
          setSpeed(data.speed)
          setLat(data.lat)
          setLng(data.lng)
          setDate(data.date)
          setTime(data.time)
        } else {
          console.error('Error:', data.error);
        }
      })
      .catch(error => console.error('Error:', error))
    )}
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.columnsContainer}>
        <div style={styles.columnLeft}>
          <main style={styles.main}>
            <input type="file" id="fileInput" style={{...styles.input, marginRight: 10}} />
            <button onClick={uploadFile} style={styles.input}>Upload</button>

            <div>
              <label style={styles.label}>
                <input
                  type="radio"
                  value="moon"
                  checked={planet === 'moon'}
                  onChange={handleOptionChange}
                />
                Moon
              </label>

              <label style={styles.label}>
                <input
                  type="radio"
                  value="mars"
                  checked={planet === 'mars'}
                  onChange={handleOptionChange}
                />
                Mars
              </label>
            </div>

            {imageUrl && <img id="image" alt="Uploaded" src={imageUrl} />}
          </main>
        </div>
        <div style={styles.columnRight}>
          {planet === 'moon' ? <MoonModel sentSpeed={speed} sentLat={lat} sentLng={lng} sentDate={date} sentTime={time}/>
          : <MarsModel sentSpeed={speed} sentLat={lat} sentLng={lng} sentDate={date} sentTime={time}/>}
        </div>
      </div>
    </div>
  );
}

// Styles for layout
const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage: "url('//unpkg.com/three-globe/example/img/night-sky.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -1,
  },

  columnsContainer: {
    display: 'flex',
    flex: 1, // Make the container take the full remaining space
  },

  columnLeft: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  columnRight: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid rgba(1, 14, 54, 0.5)',
    height: '99vh',
  },
  main: {
    marginLeft: 15,
    paddingTop: "100px",
  },
  input: {
    marginLeft: 15,
    backgroundColor: 'rgba(167, 177, 207, 0.85)',
    padding: 5,
    fontSize: 15,
    color: '#010e36',
    fontWeight: 'bold',
    borderRadius: 10,
    marginBottom: '10px'
  },
  
  label: {
    fontSize: 20,
    color: '#fff',
    margin: 20,
    marginBottom: '10px'
  }
};

// App.js
import React, { useState } from 'react';
import Header from './components/header';
import MoonModel from './moon/MoonModel';
import MarsModel from './mars/marModel';

export default function App() {
  const [imageUrl, setImageUrl] = useState(null); // State to store image URL

  const uploadFile = () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    fetch('https://www.nasa.great-eagle.net/upload_mseed', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.image) {
          setImageUrl('data:image/png;base64,' + data.image);
        } else {
          console.error('Error:', data.error);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.columnsContainer}>
        <div style={styles.columnLeft}>
          <main style={styles.main}>
            <input type="file" id="fileInput" style={styles.fileInput} />
            <button onClick={uploadFile} style={styles.uploadButton}>Upload</button>
            {imageUrl && <img id="image" alt="Uploaded" src={imageUrl} />}
          </main>
        </div>
        <div style={styles.columnRight}>
          <MarsModel />
        </div>
      </div>
    </div>
  );
}

// Styles for layout
const styles = {
  container: {
    height: '100vh', // Use 100vh to cover the full height of the viewport
    width: '100vw', // Use 100vw to cover the full width of the viewport
    position: 'absolute', // Ensure it covers the entire screen without any other containers affecting it
    top: 0, // Positioning
    left: 0, // Positioning
    backgroundImage: "url('//unpkg.com/three-globe/example/img/night-sky.png')",
    backgroundSize: 'cover', // Cover the entire container with the background image
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent repetition of the image
    zIndex: -1, // Optional: Send it behind other content
  },
  columnsContainer: {
    display: 'flex',
    flex: 1, // Make the container take the full remaining space
  },
  columnLeft: {
    flex: 1, // 50% of the screen
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  columnRight: {
    flex: 1, // 50% of the screen
    // padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    border: '3px solid yellow',
    height: '100vh',
  },
  main: {
    marginLeft: 10,
    paddingTop: "100px",

  },
  fileInput: {
    backgroundColor: '#a7b1cf',
    padding: 5,
    fontSize: 15,
    color: '#010e36',
    fontWeight: 'bold',
    borderRadius: 10,
    marginRight: 10
  },
  uploadButton: {
    backgroundColor: '#a7b1cf',
    padding: 5,
    fontSize: 15,
    color: '#010e36',
    fontWeight: 'bold',
    borderRadius: 10,
    boxShadow: 'none'
  }
};

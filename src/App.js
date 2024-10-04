// App.js
import React, { useState } from 'react';
import Header from './components/header';
import starsBG from './assets/images/starsBG.jpg';
import MoonModel from './MoonModel';  // The component for the 3D Moon model

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
      <div style={styles.rightHalf}>
        <main style={styles.main}>
          <input type="file" id="fileInput" style={styles.fileInput} />
          <button onClick={uploadFile} style={styles.uploadButton}>Upload</button>
          {imageUrl && <img id="image" alt="Uploaded" src={imageUrl} />}
        </main>
      </div>
      <div style={styles.leftHalf}>
        {/* Integrate the 3D Moon Model */}
        <MoonModel />
      </div>
    </div>
  );
}

// Styles for layout
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundImage: "url('//unpkg.com/three-globe/example/img/night-sky.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
    width: '100%'
  },
  leftHalf: {
    flex: 1, // 50% of the screen
    backgroundColor: '#000', // Dark background for contrast
  },
  rightHalf: {
    flex: 1, // 50% of the screen
    padding: '20px',
  },
  main: {
    paddingTop: "100px",
    marginLeft: 10,
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

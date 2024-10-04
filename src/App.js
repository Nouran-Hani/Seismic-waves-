import React, { useState } from 'react';
import Header from './components/header';
import starsBG from './assets/images/starsBG.jpg'
// import MarsAndMoon from './pages/mars';

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
          // You can also display error message in UI here
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: 0,
      backgroundImage: `url(${starsBG})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
    }}>
      <Header/>
      <main style={{
        paddingTop: "100px",
        marginLeft: 10,
      }}>

        <input type="file" id="fileInput"
          style={{ backgroundColor: '#a7b1cf',
          padding: 5,
          fontSize: 15,
          color: '#010e36',
          fontWeight: 'bold',
          borderRadius: 10,
          marginRight: 10
        }} />

        <button 
        onClick={uploadFile}
        style={{ backgroundColor: '#a7b1cf',
          padding: 5,
          fontSize: 15,
          color: '#010e36',
          fontWeight: 'bold',
          borderRadius: 10,
          boxShadow: 'none'
        }}>
          Upload
        </button>
        {imageUrl && ( // Conditionally render image if URL is available
          <img id="image" alt="Uploaded" src={imageUrl} />
        )}

      </main>
    </div>
  );
}
import React from "react";

export default function Header() {

    return (
        <div style={styles.headerContainer}>
            <h1 style={styles.title}>Hocus Focus</h1>
            <h1 style={{...styles.title, marginRight: '2%', textAlign: 'center'}}>
                Explore the Universe
            </h1>
        </div>
    )
}

const styles = {
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0, // Added right to stretch across the width
      backgroundColor: 'rgba(1, 14, 54, 0.5)',
      display: 'flex',
      padding: '0 2%', // Add horizontal padding for flexibility
      zIndex: 1000,
    },
    title: {
        color: '#fff',
        // fontFamily: 'Courier',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
};
  
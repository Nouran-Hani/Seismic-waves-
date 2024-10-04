import React from "react";

export default function Header() {

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: '87%',
            width: '100%',
            backgroundColor: '#010e36',
            }}>
            <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <h1 style={{
                    color: '#fff',
                    marginLeft: '2%',
                    // fontFamily: 'Courier',
                    }}>
                    Hocus Focus
                </h1>
                <h1 style={{
                    color: '#fff',
                    marginRight: '3%',
                    fontFamily: 'Courier',
                    }}>
                    Explor the space
                </h1>
            </div>
        </div>
    )
}
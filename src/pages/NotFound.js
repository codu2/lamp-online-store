import React from 'react';

const NotFound = () => {
    const notFound = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const notFound_img = {
        width: '600px',
        height: '500px',
        objectFit: 'cover',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };

    const notFound_p = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#eee'
    };

    return (
      <div style={notFound}>
          <img src="img/404.jpg" alt="404 img" style={notFound_img}/>
          <h1 style={notFound_p}>404 not found</h1>
      </div>
    );
  };
  
  export default NotFound;
  
import React from 'react';

const Setso: React.FC =()=>{
    return ( 
<div style={{
background: 'blue',
padding:'20px',
textAlign:'center',
animation:'blink 1s infinite',
fontFamily:'Arial, sans-serif',
color:'white'
}}>
<style>
        {`@keyframes blink { 50% { opacity: 0; } }`}
      </style>
      <h1 style={{ fontStyle: 'italic' }}>
        FSDFISDFJSAI
        </h1> 
        <img src="/xd.png" alt="Puto" width={200} />
</div>
);
}

export default Setso;
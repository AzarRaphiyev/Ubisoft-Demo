import React from 'react'

function SystemRequit({ obj, systemReq }) {
    const requirements = obj?.systemRequirements?.[systemReq];
  
    if (!requirements) {
      return <p className='text-red-500'>System requirements not available.</p>;
    }
  
    return (
      <div className='flex flex-col gap-10'>
        <div className='flex gap-4'>
          <h3>Operating System:</h3>
          <p>{requirements.os}</p>
        </div>
        <div className='flex gap-4'>
          <h3>CPU:</h3>
          <p>{requirements.cpu}</p>
        </div>
        <div className='flex gap-4'>
          <h3>RAM Memory:</h3>
          <p>{requirements.ram}</p>
        </div>
        <div className='flex gap-4'>
          <h3>GPU:</h3>
          <p>{requirements.gpu}</p>
        </div>
        <div className='flex gap-4'>
          <h3>Storage:</h3>
          <p>{requirements.storage}</p>
        </div>
      </div>
    );
  }
  

export default SystemRequit

import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <ClipLoader size={50} color={"#123abc"} loading={true} />
    </div>
  );
};

export default LoadingSpinner;
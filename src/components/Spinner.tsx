import React from 'react';
import './Spinner.css'; // Assuming you save the CSS in a file named Spinner.css

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner-inner" />
      </div>
    </div>
  );
};

export default Spinner;

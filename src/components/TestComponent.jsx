import React from 'react';

import Logo from '../images/logo.svg';

function TestComponent() {
  return (
    <div className="container">
      <div>
        <img className="logo" src={Logo} alt="" />
        <h1 className="title">coming soon</h1>
      </div>
    </div>
  );
}

export default TestComponent;

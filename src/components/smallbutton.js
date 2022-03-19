import React, { Component } from 'react';

import './smallbutton.css';

export default function SmallButton(props) {
  return (
    <div className="smallButton">
      <span>{props.name}</span>
    </div>
  );
}
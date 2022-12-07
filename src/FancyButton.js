import React from 'react';
import './FancyButton.css'


export const FancyButton = (props) => {
  const {onClick, children, ...other} = props;

  return (
    <button onClick={onClick} className="btn"  {...other}>{children}</button>
  );
};


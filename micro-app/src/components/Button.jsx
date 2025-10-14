import React from "react";

const Button = ({ label="Click me from the host app", onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;

// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';


//temp in-line styling until bootstrap global 
const navBarStyle: React.CSSProperties = {
  backgroundColor: 'blue',
  overflow: 'hidden'
};
//temp in-line styling until bootstrap global 
const linkStyle: React.CSSProperties = {
  float: 'left',
  display: 'block',
  color: 'yellow',
  textAlign: 'center',
  padding: '14px 16px',
  textDecoration: 'none'
};
const NavBar = () => {
  return (
    <nav style={navBarStyle}>
      <ul>
      <Link to="/journey" style={linkStyle}>Journey</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      <Link to="/leaderboard" style={linkStyle}>Leaderboard</Link>
      </ul>
    </nav>
  );
}

export default NavBar;

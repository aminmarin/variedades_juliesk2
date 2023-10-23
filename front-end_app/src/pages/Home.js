import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import '../styles/App.css';

function Home() {
  return(
    <div>
      <Header />
      <Link to="/about"></Link>
    </div>
  );
}

export default Home;
import scenarioIcon from '../resources/Field.png';
import trainingIcon from '../resources/Gym.png';
import statsIcon from '../resources/Stats.png'; 
import React, { useState } from 'react';
import './Menu.css'; 
import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate(); 
    const [active, setActive] = useState('/');
  
    const handleMenuClick = (path) => {
      setActive(path);
      navigate(path); 
      console.log(`Navigated to ${path}`);
    };
  
    const getClassName = (path) => {
      return `menu-item ${active === path ? 'active' : ''}`;
    };
  
    return (
      <div className="menu-container">
        <div className={getClassName('/')} onClick={() => handleMenuClick('/')}>
          <img src={scenarioIcon} alt="" />
        </div>
       
         <div className={getClassName('/training')} onClick={() => handleMenuClick('/training')}>
          <img src={trainingIcon} alt="Training" />
        </div> 
        <div className={getClassName('/stats')} onClick={() => handleMenuClick('/stats')}>
          <img src={statsIcon} alt="Stats" />
        </div>
      </div>
    );
  }

  export default Menu;
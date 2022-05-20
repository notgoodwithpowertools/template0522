import React from 'react'
import { NavLink } from 'react-router-dom'

import '../css/NavMenu.css'
import Image from './Image.jsx';
import logout_img from '../images/nav/logout.png';
import user_img from '../images/nav/man-24-128-white.png';
import info_img from '../images/nav/information.png';

const NavMenu = ({ onLogout }) => {

  const activeStyle = {

    color: 'white',
    backgroundColor: '#E21E31',
    borderBottomStyle: 'solid',
    borderBottomColor: '#E21E31',

  }

  const getActiveState = (state) => {

    return state ? activeStyle : undefined

  }

  return (

    <nav>
      <div className='nav'>
        <ul className='nav_ul'>
          <li className='nav_li'><NavLink to="/" style={({isActive}) => getActiveState(isActive)}><Image src={user_img} height={25} width={25} /><div className='nav_text'>User</div></NavLink></li>
          <li className='nav_li'><NavLink to="/comp1" style={({isActive}) => getActiveState(isActive)}><Image src={user_img} height={25} width={25} /><div className='nav_text'>Comp1</div></NavLink></li>
          <li className='nav_li'><NavLink to="/comp2" style={({isActive}) => getActiveState(isActive)}><Image src={user_img} height={25} width={25} /><div className='nav_text'>Comp2</div></NavLink></li>
          <li className='nav_li'><NavLink to="/about" style={({isActive}) => getActiveState(isActive)}><Image src={info_img} height={25} width={25} /><div className='nav_text'>About</div></NavLink></li>
          <li className='nav_li'><NavLink to="/logout" style={({isActive}) => getActiveState(isActive)}><Image src={logout_img} height={25} width={25} /><div className='nav_text'>Logout</div></NavLink></li>
          {/* <li className='nav_li'><NavLink to="/comp2" activeStyle={activeStyle}><Image src={user_img} height={25} width={25} /><div className='nav_text'>Items</div></NavLink></li> */}
          {/* <li className='nav_li'><NavLink to="/about" activeStyle={activeStyle} exact={true} ><Image src={info_img} height={25} width={25} /><div className='nav_text'>About</div></NavLink></li> */}
          {/* <li className='nav_li'><NavLink to="/login" activeStyle={activeStyle} onClick={() => onLogout()}><Image src={logout_img} height={25} width={25} /><div className='nav_text'>Logout</div></NavLink></li> */}
          {/* <li className='nav_li'><button to="#" onClick={ () => onLogout() }><div className='nav_text'>Logout</div></button></li> */}
        </ul>
      </div>
    </nav>

  )

}

export { NavMenu as default }

import React,{useState,useContext, useEffect} from 'react'
import './Header.css'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";

function Header({id,name,addData}) {
    function MouseOver(event) {
        event.target.style.background = 'linear-gradient(to right, #b33c3c, #ff5349)';
        event.target.style.color = 'white';
        event.target.style.border = 'white';
    }
    function MouseOut(event){
        event.target.style.background="";
        event.target.style.color = '';
        event.target.style.border = '';
    }
    const navigate = useNavigate(); 
    const goHome = () =>{
        navigate('/home/' + id);
    }
  return (
    <div className='header'>
        <div className='header_left'>
          <Link to="/"><LogoutIcon className="svg_icon"/></Link>
          <HomeIcon onClick={goHome} className='svg_icon' />
        </div>
        <h1>{name}</h1>
        <div className='header_right'>
            <button onMouseOver={MouseOver} onMouseOut={MouseOut} className='header__button' onClick={addData}>
                add data
            </button>
        </div>
    </div>
  )
}

export default Header
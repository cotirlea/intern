import React,{useState} from 'react'
import './MainPage.css'
import  Table  from './Table'
import { useNavigate } from "react-router-dom";


function UserMain({id,boards}) {
    const navigate = useNavigate();
    const [title,setTile] = useState('')

    const handleTitle = (item) =>{
        setTile(item)
    }

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

    const submit = () =>{
        if(title === ''){
            alert('nimic nu a fost selectat')
        }
        else{
            navigate('/controller/' + id + '/' + title);
        }
    }
  return (
    <div className='login'>
      <div className='login_container'>
        <h1>Main</h1>
            <Table boards={boards} select={title} handleSelect={handleTitle} />
            <button onMouseOver={MouseOver} onMouseOut={MouseOut} type='submit' onClick={submit} className='login_confirm'>submit</button>
      </div>
    </div>
  )
}

export default UserMain
import React,{} from 'react'
import './Table.css'

function Table({boards,select,handleSelect}) 
{
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
  return (   
    <div className='list'>
      {
        boards.map(item =>(
          <div onClick={() =>handleSelect(item)} onMouseOver={MouseOver} onMouseOut={MouseOut}  className={ item === select ? 'list_elem_selected' :'list_elem'}>{item}</div>
        ))
      }
    </div>
  )
}

export default Table
import React from 'react'
import DeskIcon from '@mui/icons-material/Desk';
import './Tile.css'

function Tile({checked}) {
  const getState = () =>{
        if(checked === -1){
            return 'normal_tile'
        }
        else if (checked === 0){
            return 'flageed_tile'
        }
        else{
            return 'checked_tile'
        }
    }
  return (
    <div className={getState()}/>
  )
}

export default Tile
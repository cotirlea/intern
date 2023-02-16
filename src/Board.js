import React from 'react'
import './Board.css'
import Tile from './Tile'

function Board({board,func}) {
    return (
        <div className='board_container'>
            <div className='board_grid'>
            {
                board.map(item => (
                    <div onClick={() =>func(item)}>
                        <Tile
                            checked={item.user_id}
                        />
                    </div>        
                ))
            }
            </div>
        </div>
    )
}

export default Board
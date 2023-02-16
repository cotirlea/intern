import React,{useEffect, useState,useContext} from 'react'
import Board from './Board'
import './ControllerBoard.css'
import { useParams } from 'react-router-dom';
import {db} from "./firebase"
import { collection, query, where, getDocs, doc, setDoc} from "firebase/firestore/lite"; 
import Header from './Header'
import { ActionContext } from './App';

function ControllerBoard() {
  let { id,title } = useParams();
  const [board,setBoard] = useState([])
  const [marked,setMarked] =useState([])
  const [action,setAction] = useContext(ActionContext);


  const add = (item) =>{
    let data = marked
    let new_item = {user_id:0,x:item.x,y:item.y}
    data.push(new_item)
    setMarked(arr => [...data])    
  }

  const remove = (item) =>{
      let data = marked
      const index = data.indexOf(item);
      data.splice(index, 1);
      setMarked(arr => [...data])          
  }

  const update = (item) =>{
    let new_id = null
    if(item.user_id === -1){
      return null;
    }
    const data = marked.map(obj =>{
      if(obj.x === item.x && obj.y === item.y && item){
        if(item.user_id === 0){
          new_id = id
        }
        else{
          new_id = 0
        }
        return {...obj,user_id:new_id}
      }
      return obj;
    })
    setMarked(arr => [...data])
    return new_id
  }

  const isMarked = (mark,x,y) =>{
    for(let i = 0;i<mark.length;i++){
      if(mark[i].x === x && mark[i].y === y){
        return mark[i];
      }
    }
    return null;
  }

  const clickAdmin = (item) =>{
    if(item.user_id > 0){
      return null;
    }
    const data = board.map(obj =>{
            if(obj.x === item.x && obj.y === item.y){
                if(item.user_id === 0){
                  remove(item)
                  return {...obj,user_id: -1};
                }
                else{
                  add(item)
                  return {...obj,user_id: 0};
                }
            }
            return obj;
        })
        setBoard(arr => [...data])
  }

  const clickUser = (item) =>{
    let new_id = update(item)
    if(new_id === null){
      return null;
    }
    const data = board.map(obj =>{
      if(obj.x === item.x && obj.y === item.y){
        return {...obj,user_id: new_id};
      }
      return obj;
    })
    setBoard(arr => [...data])
  }

  async function create(){
      await setDoc(doc(db, "board",title), {
        name:title,
        board:marked
      })      
    }

  const addData = () =>{
    create()
  }

  const initNew = () =>{
    let data = []
        for(let i = 1;i<=16;i++){
          for(let j=1;j<=20;j++){
              let k = {user_id : -1,x: i,y:j}
              data.push(k)
          }
      }
      setBoard(arr => [...data])
  }

  async function initExist(){
    let mark = await getData()
    setMarked(arr => [...mark])    
     let data = []
        for(let i = 1;i<=16;i++){
          for(let j=1;j<=20;j++){
              let k = isMarked(mark,i,j) 
              if(k === null){
                  k = {user_id : -1,x: i,y:j}
              }
              data.push(k)
          }
      }
      setBoard(arr => [...data])
  }

  async function getData(){
    const q = query(collection(db, 'board'), where('name', '==', title));
    const querySnapshot = await getDocs(q);
    let k = []
    querySnapshot.forEach((doc) => {
        k =   doc.data().board
    });
    return k
  }

  const clickTile = (item) =>{
    if(action === 'USER'){
        clickUser(item)
    }
    else{
      clickAdmin(item)
    }
  }

  async function initData(){
    if(action === 'CREATE'){
      initNew()
    }
    else{
      initExist()
    }  
  }

  useEffect(() =>{
    initData();
  },[])
  return (
        <div className='controller'>
            <Header id={id} name={title} addData={addData}/>
            <Board board={board} func={clickTile}/>
        </div>
  )
} 

export default ControllerBoard
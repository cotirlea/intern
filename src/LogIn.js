import React,{useState,useEffect,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import {db} from "./firebase"
import { collection, getDocs} from 'firebase/firestore/lite';
import './LogIn.css'
import { ActionContext } from './App';


function LogIn() {

  const navigate = useNavigate();
  const [list,setList] = useState([]);
  const [{username},setUsername] = useState({username:''});
  const [{password},setPassword] = useState({password:''});

  const [username_input,setUsername_input] = useState('')
  const [password_input,setPassword_input] = useState('')
  const [action,setAction] = useContext(ActionContext);

  const handleUsername = e =>{setUsername({username:e.target.value})}
  const handlePassword = e =>{setPassword({password:e.target.value})}
  
  async function getData(db) {
    const Col = collection(db, 'user');
    const Snapshot = await getDocs(Col);
    const List = Snapshot.docs.map(doc => doc.data());
    await setList(arr => [...List])
  }
  useEffect(() => {
    getData(db)
  }, []);


  const clean = () =>{
    setPassword_input('')
    setUsername_input('')
  }


  const isEmpty = () =>{
    clean();
    let clean_user = true;
    let clean_pass = true;

    if(username.length === 0){
      setUsername_input("username empty")
      clean_user = false;
    }
    if(password.length === 0){
      setPassword_input("password empty")
      clean_pass = false;
    }

    if(clean_user === false || clean_pass === false){
      return false;
    }
    else{
      return true;
    }
  }

  const loginFun = () =>{

    let ans = isEmpty();
    if(ans === false){
      return false;
    }

    let clean_user = false;
    let clean_pass = false;

    for(let i=0;i<list.length;i++){
      if(list[i].username === username){
        clean_user = true;
        if(list[i].password === password){
          if(list[i].admin === false){
            setAction("USER")
          }
          else{
            setAction("EDIT")
          }
          navigate('/home/' + list[i].id);
          
          clean_pass = true;
          return true;
        }
      } 
    }
    
    if(clean_user === false){
      setUsername_input('invalid username');
    }
    if(clean_pass === false){
      setPassword_input('invalid password');
    }

    return false;
  }

  const submit = (event) =>{
    event.preventDefault();
    loginFun();
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

  return (
    <div className='login'>
      <div className='login_container'>
        <h1>Log In</h1>
        <form>
          <input placeholder='username' className={username_input.length === 0? "input-value" : "input-error"}  type="text" onChange={handleUsername} />
          {username_input.length > 0 ?<label className='label_error'>{username_input}</label> : null}
          <input placeholder='password' className={password_input.length === 0? "input-value" : "input-error"} type="password" onChange={handlePassword} />
          {password_input.length > 0 ?<label  className='label_error'>{password_input}</label> : null}
          <button onMouseOver={MouseOver} onMouseOut={MouseOut} type='submit' onClick={submit} className='login_confirm'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default LogIn

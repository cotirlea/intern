import React,{useState,useContext} from 'react'
import './MainPage.css'
import { ActionContext } from './App';
import  Table  from './Table';
import { useNavigate } from "react-router-dom";

function AdminMain({id,boards}) {
    const navigate = useNavigate(); 
    const [{title},setTitle] = useState({title:''});
    const [{create},setCreate] = useState({create:false})
    const [{edit},setEdit] = useState({edit:true})
    const [action,setAction] = useContext(ActionContext);
    const [selected,setSelected] = useState('')

    const handleTitle = e =>{setTitle({title:e.target.value})}

    const handleCreate = e =>{
        setCreate({create:!create})
        setEdit({edit:create})
        setAction('CREATE')
    }
    const handleEdit = e =>{
        setEdit({edit:!edit})
        setCreate({create:edit})
        setAction('EDIT')        
    }

    const handleSelect = (item) =>{
        setSelected(item)
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

    const createCont = () =>{
      if(title === ''){
        alert('titlu nu a fost ales')
      }
      else{
          navigate('/controller/' + id + '/' + title);
      }
    }

    const editCont = () =>{
      if(selected === ''){
        alert('titlu nu a fost ales')        
      }
      else{
          setTitle({title:selected})
          navigate('/controller/' + id + '/' + selected);        
      }
    }

    const submit = () =>{
      if(action === 'CREATE'){
        createCont()
      }
      else{
        editCont()
      }
    }

  return (
    <div className='login'>
      <div className='login_container'>
        <h1>Main</h1>
        <div className="list-container">
          <label> <input type='checkbox' checked={create} onChange={handleCreate} /> Create </label>
          <label> <input type='checkbox' checked={edit} onChange={handleEdit} /> Edit </label>
        </div>
            {action === 'CREATE' ? <input placeholder='title' className="input-value"  type="text" onChange={handleTitle} /> : null} 
            {action === 'EDIT' ? <Table boards={boards} select={selected} handleSelect={handleSelect} /> : null}
            <button onMouseOver={MouseOver} onMouseOut={MouseOut} type='submit' onClick={submit} className='login_confirm'>submit</button>
      </div>
    </div>
  )
}

export default AdminMain
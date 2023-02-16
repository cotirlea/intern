import React,{useState,useContext, useEffect} from 'react'
import './MainPage.css'
import { ActionContext } from './App';
import {db} from "./firebase"
import { collection, query,getDocs} from "firebase/firestore/lite"; 
import AdminMain from './AdminMain';
import UserMain from './UserMain';
import { useParams } from 'react-router-dom';




function MainPage() {
      let { id } = useParams();
    const [boards,setBooards] = useState([])
    const [action,setAction] = useContext(ActionContext);

    async function getBoards(){
        let k = []
        const q = query(collection(db, 'board'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            k.push(doc.data().name)
        });
        setBooards(arr => [...k])
    }

    async function getData(){
        await getBoards()
    }

    useEffect(()=>{
        getData()
    },[])
    return(
        <div>
            {action === 'USER' ? <UserMain id={id} boards={boards} /> : <AdminMain id={id} boards={boards} />}
        </div>
    )
}

export default MainPage
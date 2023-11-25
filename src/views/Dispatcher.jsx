import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { ROLE } from "../constants";
import {getLoginState, removeLoginState} from "../services/auth";
import {useNavigate} from "react-router-dom";
import { getAllUsers, getAllBoxs, getAllOrders, getSingleUser } from '../services/userRequest';


function Dispatcher() {
    const userRole = ROLE.DISPATCHER;
    const [tableTdUser, setTableTdUser] = useState([]);
    const [tableTdBox, setTableTdBox] = useState([]);
    const [tableTdDelivery, setTableTdDelivery] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");


    useEffect(() => {
        async function fetchData() {
            try {
              const userId = window.location.pathname.split('/')[2];
              const response = await getLoginState();
              if (!response || response.error || response.id !== userId) {
                  alert("Access Denied. Please login again");
                  await removeLoginState();
                  navigate('/login', {replace: true});
                  return;
              }
              console.log(userId);
              const userInfo = await getSingleUser(userId);
              const userName = userInfo[0];
              const userData = await getAllUsers();
              const boxData = await getAllBoxs(userRole);
              const orderData = await getAllOrders(userRole);
              setUsername(userName);
              setTableTdUser(userData);
              setTableTdBox(boxData);
              setTableTdDelivery(orderData);
            } catch (e) {
                console.log(e);
                alert("Failed to Fetch Data! Please reach out to our administrator @12345@gmail.com");
            }
        }  
        fetchData();
    }, [userRole]);
      
    return (
        <div className="sb-nav-fixed">
                <NavBar />
                <SideBar role={userRole} username={username} tableTdUser={tableTdUser} tableTdBox={tableTdBox} tableTdDelivery={tableTdDelivery}/>
        </div>
    );
}

export default Dispatcher

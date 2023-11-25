import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { ROLE } from '../constants';
import {  getAllOrders, getActiveOrders, getSingleUser } from '../services/userRequest';
import {getLoginState, removeLoginState} from "../services/auth";
import {useNavigate} from "react-router-dom";


function Customer() {
  
    const userRole = ROLE.CUSTOMER;
    const [tableTdDelivery, setTableTdDelivery] = useState([]);
    const [TdActiveDelivery, setTdActiveDelivery] = useState([]);
    const [TdInactDelivery, setTdInactDelivery] = useState([]);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
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

              const userInfo = await getSingleUser(userId);
              const userName = userInfo[0];
              const orderData = await getAllOrders(userRole, userId);
              const activeOrders = await getActiveOrders(true, userId);
              const inactiveOrders = await getActiveOrders(false, userId);
              setUsername(userName);
              setTdActiveDelivery(activeOrders);
              setTdInactDelivery(inactiveOrders);
              setTableTdDelivery(orderData);
            } catch (e) {
                console.log(e);
                alert("Failed to Fetch Orders Data! Please reach out to our administrator @12345@gmail.com");
            }
        }  
        fetchData();
    }, []);
    

    return (
        <div className="sb-nav-fixed">
            <NavBar />
            <SideBar role={userRole} username={username} tableTdDelivery={tableTdDelivery} TdActiveDelivery={TdActiveDelivery} TdInactDelivery={TdInactDelivery}/>
        </div>
    );
}

export default Customer

import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { ROLE } from '../constants';
import {getLoginState, removeLoginState} from "../services/auth";
import {useNavigate} from "react-router-dom";
import { getAllBoxs, getAllOrders, getSingleUser } from '../services/userRequest';

function Deliverer() {
   
    const userRole = ROLE.DELIVERER;
    const [tableTdBox, setTableTdBox] = useState([]);
    const [tableTdDelivery, setTableTdDelivery] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");


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
              const emailAdd = userInfo[1];
              const boxData = await getAllBoxs(userRole, userId);
              const orderData = await getAllOrders(userRole, userId);
              setUsername(userName);
              setEmail(emailAdd);
              setTableTdBox(boxData);
              setTableTdDelivery(orderData);
            } catch (e) {
                console.log(e);
                alert("Failed to Fetch Deliveries Data! Please reach out to our administrator @12345@gmail.com");
            }
        }  
        fetchData();
    }, []);
    

    return (
        <div className="sb-nav-fixed">
            <NavBar />
            <SideBar role={userRole} username={username} email={email} tableTdBox={tableTdBox} tableTdDelivery={tableTdDelivery}/>
        </div>
    );
}

export default Deliverer

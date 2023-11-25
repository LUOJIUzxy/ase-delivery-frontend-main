import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { getDispatchers } from '../services/mock';

function MainPage() {

    const userRole = "Dispatcher"
    //const userRole = "User"
    
    const tableTdUser = [
        ['','000001', '124@gmail.com', 'Deliverer', '6hdgsety35346', 'xhtryu7835thr', '2022/12/29 23:59:00'],
        ['','000002', '1223@gmail.com', 'Dispatcher', '57hde56hety35346', 'futy835thr', '2022/12/29 23:59:00'],
        ['','000003', '12324@gmail.com', 'Deliverer', '745wysy35346', '56yvrt35thr', '2022/12/29 23:59:00']
    ];
    const tableTdDelivery = [
        ['','000001', 'assigned', 'box_1', '000001', '000001', '2022/12/29 23:59:00'],
        ['','000001', 'delivering', 'box_1', '000002', '000002', '2022/12/29 23:59:00'],
        ['','000003', 'delivered', 'box_2', '000002', '000003', '2022/12/29 23:59:00'],
    ];
    const tableTdBox = [
        ['','52rcwrw4', 'box_1', 'Bolzmannstr.1', '000001', 'open', '2022/12/29 23:59:00'],
        ['','e4gsrt3w4', 'box_2', 'Bolzmannstr.2', '000002', 'closed', '2022/12/29 23:59:00'],
        ['','gsrthety', 'box_3', 'Bolzmannstr.3', '000002', 'closed', '2022/12/29 23:59:00'],
    ];    
   
   
        return (     
            <div className="sb-nav-fixed">
                <NavBar />
                <SideBar role={userRole} tableTdUser={tableTdUser} tableTdDelivery={tableTdDelivery} tableTdBox={tableTdBox}/>
            </div>
        )

    
}
export default MainPage
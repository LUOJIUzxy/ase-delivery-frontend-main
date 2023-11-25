/* eslint-disable no-multi-str */
import React, {useState, useEffect} from 'react';
import Table from './Table';
import {ORDER_STATUS, ROLE} from '../constants';
import ListOnlyTable from './ListOnlyTable';
import QrReader from "react-web-qr-reader";
import {pickUpOrder} from "../services/updateRequest";

//props: username, role:[Dispatcher, Deliverer, Customer], tableTdUser, tableTdBox, tableTdDelivery, TdActiveDelivery, TdInactDelivery
function SideBar(props) {
    
    const tableTypeMap = ['User', 'Box', 'Delivery'];
    const tabelTrUser = ['id','Email', 'Username', 'Role', 'Token'];
    const tabelTrDelivery = ['id', 'Status', 'Target Box', 'Box Address', 'Target Customer', 'Assigned Deliverer', 'QR Code'];
    const tabelTrBox = [ 'id','Box Name', 'Street Name', 'RFID'];

    const tableTrDelivererOrder = [ 'id','Status', 'Target Box', 'Target Customer'];
    const tableTrCustomerOrder = ['id','Status', 'Target Box', 'Box Address','Assigned Deliverer', 'Created Time', 'Updated Time', 'Tracking Number'];

    const [tableType, setTableType] = useState('Delivery');
    
    const [tableTr, setTableTr] = useState(tabelTrDelivery);
    const [tableData, setTableData] = useState(props.tableTdDelivery);

    console.log(props.role);    
    console.log(props.tableTdDelivery);
    console.log(tableData);

    useEffect(() => {
        setTableData(props.tableTdDelivery);
    }, [props.tableTdDelivery]);

    const dispatcherText = ( <div className="card-body">
     You could view all the current {tableType} in the following table. <br />
     You could add a new {tableType} by clicking the Add button on the top left of the table.<br />
     You could edit a current {tableType} by clicking the Edit button in the corresponding row.<br />
     You could delete one or more {tableType}s by ticking the corresponding checkbox and clicking the Delete button.
    </div>);
    const delivererText = ( <div className="card-body">
    You could view all the current {tableType} assigned to you in the following table.<br />
    You could scan QR code by choosing the tab 'Scan QR code" on the left sidebar.<br />
    </div>);
    const customerText = (<div className="card-body">
    You could view all your deliveries in the following table.<br />
    You could sort your deliveries in time order by clicking the tab above Time columns. <br />
    You could search a specific delivery in the search box. <br />
    You could view all active orders by choosing the tab 'Active Deliveries' on the left sidebar.<br />
    You could view all past orders by choosing the tab 'Inactive Deliveries' on the left sidebar.<br />
    </div>);

    /**
     * for qr code scanner
     */
    const [scanQR, setScanQR] = useState(false);
    const [startScan, setStartScan] = useState(false);

    const getNavLink = (role) => {
        return role === ROLE.DISPATCHER ? (
            <div>
                <a className="nav-link" onClick={() => { setTableType(tableTypeMap[2]); setTableTr(tabelTrDelivery); setTableData(props.tableTdDelivery); }}>Manage Deliveries</a>
                <a className="nav-link" onClick={() => { setTableType(tableTypeMap[1]); setTableTr(tabelTrBox); setTableData(props.tableTdBox);  }}>Manage Boxes</a>
                <a className="nav-link" onClick={() => { setTableType(tableTypeMap[0]); setTableTr(tabelTrUser); setTableData(props.tableTdUser); }} >Manage Users</a>
            </div>
        ) : role === ROLE.DELIVERER ? (
            <div>
                <a className="nav-link" onClick={() =>{ setScanQR(false); setStartScan(false); setTableType(tableTypeMap[2]); setTableTr(tableTrDelivererOrder); setTableData(props.tableTdDelivery) }}>Assigned Deliveries</a>
                <a className="nav-link" onClick={() =>{ setScanQR(false); setStartScan(false); setTableType(tableTypeMap[1]); setTableTr(tabelTrBox); setTableData(props.tableTdBox) }} >Assigned Boxes</a>
                <a className="nav-link" onClick={() =>{ setScanQR(true); setStartScan(false); setTableData(props.tableTdDelivery)}}>Scan QR Code</a>
            </div>
        ) : (
            <div>
                <a className="nav-link" onClick={() =>{ setTableTr(tableTrCustomerOrder); setTableData(props.tableTdDelivery) }}>All Deliveries</a>
                <a className="nav-link" onClick={() =>{ setTableTr(tableTrCustomerOrder); setTableData(props.TdActiveDelivery) }}>Active Deliveries</a>
                <a className="nav-link" onClick={() =>{ setTableTr(tableTrCustomerOrder); setTableData(props.TdInactDelivery) }}>Inactive Deliveries</a>
            </div>
        );
    };

    const getTable = (role) => {
        return role === ROLE.DISPATCHER ? (<Table tr={tableTr} td={tableData} type={tableType}/>)
        : (<ListOnlyTable tr={tableTr} td={tableData} type={tableType}/>)
    }

    useEffect(() => {
        
    });

    const getCardBody = (role) => {
        return role === ROLE.DISPATCHER ? dispatcherText
        : role === ROLE.DELIVERER ? delivererText
        : customerText
    }

    /**
     * for qr code scan handling
     */

    const handleError = (error) => {
        alert("Something wrong happens with the qrcode scanner or the webcam!")
        console.log(error);
    }
    const handleScan = (result) => {
        async function pickUp(delivererId, data) {
            const trackCode = data.trackCode;
            const order = tableData.find(arr => {
                return arr[7] === trackCode;
            });
            if (!order || order.length === 0) {
                alert("Failed to pick up the order! The order may be illegal!");
            } else {
                const response = await pickUpOrder(delivererId, order[0]);
                if (response.error) {
                    alert(response.message);
                } else {
                    let data = {}
                    if (response.status === ORDER_STATUS.PickedUp) {
                        alert("Order with id " + response.id + " has been picked-up successfully");
                    }
                }
            }
        }

        if (result && result.data) {
            console.log(result);
            const body = JSON.parse(result.data);
            // const delivererId = body.deliverer.id;
            const email = body.deliverer.email;
            // extract current delivererId from url
            const url = window.location.href;
            const currentEmail = props.email;
            if (!email || !currentEmail || email !== currentEmail) {
                console.log(currentEmail);
                console.log(email);
                setStartScan(false);
                alert("This delivery is not assigned to you!")
            } else {
                const id = url.split("deliverer/")[1];
                setStartScan(false);
                pickUp(id, body);
            }
        }
    }

    return(
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Side Navigation</div>
                                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                        Activities
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        {getNavLink(props.role)}
                                    </nav>
                                </div>     
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Logged in as:</div>
                                {props.role}
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        {
                            props.role === ROLE.DELIVERER && scanQR ?
                                <div className="container-fluid px-4">
                                    <div>
                                        <span> Scan QR Code for Delivery</span>
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        {
                                            startScan?
                                                <QrReader
                                                        style={{height: 240, width: 320}}
                                                        delay={500}
                                                        onError={handleError}
                                                        onScan={handleScan}
                                                />
                                                :
                                                <button type="button" onClick={() => {setStartScan(true);}}>Start Scan</button>
                                        }
                                    </div>
                                </div>
                                :
                                <div className="container-fluid px-4">
                                    <h1 className="mt-4">Welcome {props.username} !</h1>
                                    <ol className="breadcrumb mb-4">
                                        <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                        <li className="breadcrumb-item active">Tables</li>
                                    </ol>
                                    <div className="card mb-4">
                                            {getCardBody(props.role)}
                                    </div>
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <i className="fas fa-table me-1"></i>
                                            Manage {tableType} Table
                                        </div>
                                        <div className="card-body">
                                            {getTable(props.role)}
                                        </div>
                                    </div>
                                </div>
                        }
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2023</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
}

export default SideBar
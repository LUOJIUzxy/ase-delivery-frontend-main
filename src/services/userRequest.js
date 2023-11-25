import { callREST, HTTP_METHOD } from "./http";
import { ROLE } from "../constants";
import { USER_API, BOX_API, ORDER_API } from "../constants";
import { htmlPrefilter } from "jquery";

const getAllUsers = async() => {
    const response = callREST(
        HTTP_METHOD.GET,
        USER_API.LIST_ALL_USERS
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting all users", err);
        });
    } else {
        var tableTdUser = [];  
        await response.then((data) => {
            data.forEach( (element, index)  => {  
                //let userEach = Object.values(element);       
                //userEach.unshift('');
                //console.log(userEach);
                //tableTdUser[index] = userEach;
                tableTdUser.push(['', element.id, element.email, element.username, element.role, element.token, '', '']);
            });
        });
        console.log(tableTdUser);
        return tableTdUser;
    }
}

const getSingleUser = async(userId) => {

    const response = callREST(
        HTTP_METHOD.GET,
        USER_API.LIST_SINGLE_USER + userId,
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting all users", err);
        });
    } else {
        let tableTdUser = [];
        let username;
        let email;
        await response.then(data => {
            tableTdUser.push(Object.values(data));
            //tableTdUser.push("", data.email, data.username, data.role, data.token);
            console.log(tableTdUser);
            console.log(data.username)
            username = data.username;
            email = data.email;
        })
        return [username, email];
    }    
}

const getAllBoxs = async(role, userId = null) => {
    const url = role === ROLE.DISPATCHER ? BOX_API.LIST_ALL_BOXES
        : BOX_API.LIST_ALL_BOXES + userId;
    const response = callREST(
        HTTP_METHOD.GET,
        url, 
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting all boxes", err);
        });
    } else {
        let tableTdBox = [];
        await response.then((data) => {
            data.forEach( (element)  => {         
                let eachBox = role === ROLE.DISPATCHER ? ['', element.id,element.name, element.addr, element.rfid, '', '','']
                : [ element.id, element.name, element.addr, element.rfid, '', '', '', ''];
                console.log(eachBox);
                tableTdBox.push(eachBox);
            });
        });
        console.log(tableTdBox);
        return tableTdBox;
    }
}

const getSingleBox = async(boxId) => {

    const response = callREST(
        HTTP_METHOD.GET,
        BOX_API.LIST_SINGLE_BOX + boxId,
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting all users", err);
        });
    } else {
        var tableTdBox = [];
        await response.then(data => {
            tableTdBox.push("",data.id, data.name, data.address, data.boxStatus, data.rfid);
            console.log(tableTdBox);
        })
        return tableTdBox;
    }    
}

const getAllOrders = async(role, userId = null) => {
    const url = role === ROLE.DISPATCHER ? ORDER_API.LIST_ALL_ORDERS
        : role === ROLE.DELIVERER ? ORDER_API.DELIVERER_LIST + userId
        : ORDER_API.CUSTOMER_LIST + userId;
    const response = callREST(
        HTTP_METHOD.GET,
        url,
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting all boxes", err);
        });
    } else {
        var tableTdDelivery = [];   
        if (role === ROLE.DISPATCHER) {   
            await response.then((data) => {
                data.forEach( (element)  => {    
                    console.log(element);
                    let eachDelivery = ['', element.id, element.status, element.box.name, element.box.addr, element.customer.email, element.deliverer.email, element.qrCode];
                    tableTdDelivery.push(eachDelivery);
                });
            });
            
        } else if (role === ROLE.DELIVERER) {
            await response.then((data) => {
                data.forEach( (element)  => {
                    // add track code but not used
                    tableTdDelivery.push([element.id, element.status, element.box.name, element.customer.email, '', '','', element.trackCode]);
                    //add QR code image string
                    
                    //get all non-repetitive boxes
                    //tableTdBox.push([element.box.id, element.box.name, element.box.addr, element.box.boxStatus, element.box.rfid]);
                });
            });     
        } else {
            await response.then((data) => {
                data.forEach( (element)  => {    
                    console.log(element);
                    //{"id":"63d7c2b52df5c34ddbe94a99","status":"Ordered","createdAt":1675084469897,"changedAt":1675084469897,"customer":{"id":"63d76a8b982f9143e56af4bd","email":"test3@gmail.com","username":"customer","role":"customer","token":"f784xjmc"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"936d0380-1d95-4adf-b34a-4296d039b892"}
                    //['ID', 'Status', 'Target_Box', 'Target_Customer', 'Created Time', 'Updated Time', 'Tracking Number'];
                    const dateCreated= new Date(element.createdAt);
                    const formatCreated = dateCreated.getDate()+ "/"+(dateCreated.getMonth()+1)+ "/"+dateCreated.getFullYear()+" "+dateCreated.getHours()+":"+dateCreated.getMinutes()+":"+dateCreated.getSeconds();
                    const dateUpdated= new Date(element.changedAt);
                    const formatUpdated = dateUpdated.getDate()+ "/"+(dateUpdated.getMonth()+1)+ "/"+dateUpdated.getFullYear()+" "+dateUpdated.getHours()+":"+dateUpdated.getMinutes()+":"+dateUpdated.getSeconds();             
                    let eachDelivery = [element.id, element.status, element.box.name, element.box.addr, element.deliverer.email, formatCreated, formatUpdated, element.trackCode];
                    tableTdDelivery.push(eachDelivery);
                });
            });
        }
        return tableTdDelivery;
    }
}

const getActiveOrders = async(isActive, userId) => {
   
    const response = callREST(
        HTTP_METHOD.GET,
        ORDER_API.CUSTOMER_LIST + userId
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting all boxes", err);
        });
    } else {
        if(isActive) {
            var TdActiveDelivery = [];   
            await response.then((data) => {
                data.forEach( (element)  => {    
                    if (element.status !== "Finished"){
                    //{"id":"63d7c2b52df5c34ddbe94a99","status":"Ordered","createdAt":1675084469897,"changedAt":1675084469897,"customer":{"id":"63d76a8b982f9143e56af4bd","email":"test3@gmail.com","username":"customer","role":"customer","token":"f784xjmc"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"936d0380-1d95-4adf-b34a-4296d039b892"}
                    //['ID', 'Status', 'Target_Box', 'Target_Customer', 'Created Time', 'Updated Time', 'Tracking Number'];
                        const dateCreated= new Date(element.createdAt);
                        const formatCreated = dateCreated.getDate()+ "/"+(dateCreated.getMonth()+1)+ "/"+dateCreated.getFullYear()+" "+dateCreated.getHours()+":"+dateCreated.getMinutes()+":"+dateCreated.getSeconds();
                        const dateUpdated= new Date(element.changedAt);
                        const formatUpdated = dateUpdated.getDate()+ "/"+(dateUpdated.getMonth()+1)+ "/"+dateUpdated.getFullYear()+" "+dateUpdated.getHours()+":"+dateUpdated.getMinutes()+":"+dateUpdated.getSeconds();             
                        let eachDelivery = [element.id, element.status, element.box.name, element.box.addr, element.deliverer.email, formatCreated, formatUpdated, element.trackCode];
                        TdActiveDelivery.push(eachDelivery);
                    }
                });
            });
            return TdActiveDelivery;
        } else {
            var TdInactDelivery = [];   
            await response.then((data) => {
                data.forEach( (element)  => {    
                    if (element.status === "Finished"){
                    //{"id":"63d7c2b52df5c34ddbe94a99","status":"Ordered","createdAt":1675084469897,"changedAt":1675084469897,"customer":{"id":"63d76a8b982f9143e56af4bd","email":"test3@gmail.com","username":"customer","role":"customer","token":"f784xjmc"},"deliverer":{"id":"63d76a8b982f9143e56af4bc","email":"test2@gmail.com","username":"deliverer","role":"deliverer","token":"w9zap1br"},"qrCode":"test","box":{"id":"63d76a8b982f9143e56af4be","name":"box","addr":"Garching","rfid":"1234567890","boxStatus":0},"trackCode":"936d0380-1d95-4adf-b34a-4296d039b892"}
                    //['ID', 'Status', 'Target_Box', 'Target_Customer', 'Created Time', 'Updated Time', 'Tracking Number'];
                        const dateCreated= new Date(element.createdAt);
                        const formatCreated = dateCreated.getDate()+ "/"+(dateCreated.getMonth()+1)+ "/"+dateCreated.getFullYear()+" "+dateCreated.getHours()+":"+dateCreated.getMinutes()+":"+dateCreated.getSeconds();
                        const dateUpdated= new Date(element.changedAt);
                        const formatUpdated = dateUpdated.getDate()+ "/"+(dateUpdated.getMonth()+1)+ "/"+dateUpdated.getFullYear()+" "+dateUpdated.getHours()+":"+dateUpdated.getMinutes()+":"+dateUpdated.getSeconds();             
                        let eachDelivery = [element.id, element.status, element.box.name, element.box.addr, element.deliverer.email, formatCreated, formatUpdated, element.trackCode];
                        TdInactDelivery.push(eachDelivery);
                    }
                });
            });
            return TdInactDelivery;
        }
    }
}

const getSingleOrder = async(orderId) => {

    const response = callREST(
        HTTP_METHOD.GET,
        ORDER_API.LIST_SINGLE_ORDER + orderId,
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting all users", err);
        });
    } else {
        var tableTdDelivery = [];
        await response.then(data => {
            tableTdDelivery.push("",data.id, data.status, data.box.id, data.customer.id, data.deliverer.id);           
            console.log(tableTdDelivery);
        })
        return tableTdDelivery;
    }    
}
export {
    getAllBoxs,
    getSingleBox,
    getAllUsers,
    getSingleUser,
    getAllOrders,
    getActiveOrders,
    getSingleOrder
}
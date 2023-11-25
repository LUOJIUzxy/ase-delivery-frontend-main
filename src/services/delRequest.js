import { callREST, HTTP_METHOD } from "./http";
import { USER_API, BOX_API, ORDER_API } from "../constants";

const delUser = async(ids) => {
    let url = USER_API.DELETE_USERS;
    ids.forEach( (element, index)  => { 
        if (index !== ids.length - 1) {
            url += element + ',';
        } else {
            url += element;           
        }
    });
    const response = callREST(
        HTTP_METHOD.DELETE,
        url,
    );

    await response.then((json) => {
        if (json.error) {
            alert(json.message);
            console.log("Error at deleting user");
        
        } else {    
            //await response.then((json) => {
            alert("delete successfully!")
            const tableTdUser = Object.values(json);
                    //tableTdUser.push(Object.values(element));
            //});
            console.log(tableTdUser);
            return tableTdUser;
        }
    });
}

const delBox = async(ids) => {
    //method, url, data = null, header = null
    let url = BOX_API.DELETE_BOXES;
    ids.forEach( (element, index)  => { 
        if (index !== ids.length - 1) {
            url += element + ',';
        } else {
            url += element;           
        }
    });
    const response = callREST(
        HTTP_METHOD.DELETE,
        url,
    );

    await response.then((json) => {
        if (json.error) {
            alert(json.message);
            console.log("Error at deleting box");
        
        } else {    
            //await response.then((json) => {
            alert("delete successfully!")
            const tableTdBox = Object.values(json);
                    //tableTdUser.push(Object.values(element));
            //});
            console.log(tableTdBox);
            return tableTdBox;
        }
    });
}

const delDelivery = async(ids) => {
    //method, url, data = null, header = null
    let url = ORDER_API.DELETE_ORDERS;
    ids.forEach( (element, index)  => { 
        if (index !== ids.length - 1) {
            url += element + ',';
        } else {
            url += element;           
        }
    });
    const response = callREST(
        HTTP_METHOD.DELETE,
        url,
    );
    await response.then((json) => {
        if (json.error) {
            alert(json.message);
            console.log("Error at deleting delivery");
        
        } else {    
            alert("delete successfully!")
            const tableTdDelivery = Object.values(json);
                
            console.log(tableTdDelivery);
            return tableTdDelivery;
        }
    });
}

export {
    delBox,
    delDelivery,
    delUser,
}
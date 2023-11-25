import { callREST, HTTP_METHOD } from "./http";
import {USER_API, BOX_API, ORDER_API, ORDER_STATUS} from "../constants";

const pickUpOrder = async(id, orderId) => {
    const response = callREST(
        HTTP_METHOD.PUT,
        ORDER_API.PICK_UP_ORDER + id + "?id=" + orderId
    )

    return response;
}

const editUser = async(id, token = null, role = null) => {
    //method, url, data = null, header = null
    const data = role === ""  ? {token: token}
        : token === "" ? {role: role}
        : {
            role: role,
            token: token
        };
    const response = callREST(
        HTTP_METHOD.PUT,
        USER_API.UPDATE_USER + id,
        JSON.stringify(data),
        {
            "Content-Type": "application/json; charset-UTF-8",
        }
    );
    await response.then((json) => {
        if (json.error) {
            alert(json.message);
            console.log("Error at updating user");
        
        } else {    
            //await response.then((json) => {
            alert("update successfully!")
            const tableTdUser = Object.values(json);
                    //tableTdUser.push(Object.values(element));
            //});
            console.log(tableTdUser);
            return tableTdUser;
        }
    });
}

const editBox = async(id, boxName = null, address = null, rfid = null) => {
    //method, url, data = null, header = null
    const response = callREST(
        HTTP_METHOD.PUT,
        BOX_API.UPDATE_BOX + id,
        JSON.stringify({
            name: boxName,
        }),
        {
            "Content-Type": "application/json; charset-UTF-8",
        }
    );
    await response.then((json) => {
        if (json.error) {
            alert(json.message);
            console.log("Error at updating box");
        
        } else {    
            //await response.then((json) => {
            alert("update successfully!")
            const tableTdUser = Object.values(json);
                    //tableTdUser.push(Object.values(element));
            //});
            console.log(tableTdUser);
            return tableTdUser;
        }
    });
}

const editDelivery = async(id, targetBox = null, customerEmail = null, delivererEmail = null) => {
    //method, url, data = null, header = null
    const data = (targetBox === "" && customerEmail === "")  ? {delivererId: delivererEmail}
        : (customerEmail === "" && delivererEmail === "") ? {targetBox: targetBox}
        : (delivererEmail === "" && targetBox === "") ? {customerId: customerEmail}
        : (targetBox !== "" && customerEmail !== "" && delivererEmail === "") ? {targetBox: targetBox, customerId: customerEmail}
        : (targetBox === "" && customerEmail !== "" && delivererEmail !== "") ? {delivererId: delivererEmail, customerId: customerEmail}
        : (targetBox !== "" && customerEmail === "" && delivererEmail !== "") ? {delivererId: delivererEmail, targetBox: targetBox}
        :  { targetBox: targetBox, customerId: customerEmail, delivererId: delivererEmail};
    const response = callREST(
        HTTP_METHOD.PUT,
        ORDER_API.UPDATE_ORDER + id,
        JSON.stringify(data),
        {
            "Content-Type": "application/json; charset-UTF-8",
        }
    );
    await response.then((json) => {
        if (json.error) {
            alert(json.message);
            console.log("Error at updating delivery");
        
        } else {    
            //await response.then((json) => {
            alert("update successfully!")
            const tableTdUser = Object.values(json);
                    //tableTdUser.push(Object.values(element));
            //});
            console.log(tableTdUser);
            return tableTdUser;
        }
    });
}

export {
    editBox,
    editDelivery,
    editUser,
    pickUpOrder
}
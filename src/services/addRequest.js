import { callREST, HTTP_METHOD } from "./http";
import { USER_API, BOX_API, ORDER_API } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { generateQrCode } from './qr'

const addUser = async(email, username, role, password) => {
    //method, url, data = null, header = null
    const response = callREST(
        HTTP_METHOD.POST,
        USER_API.ADD_USER,
        JSON.stringify({
            email: email,
            username: username,
            role: role,
            password: password,
        }),
        {
            "Content-Type": "application/json; charset-UTF-8",
        }
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at adding a new user", err);
        });
    } else {
        var tableTdUser = [];     
        await response.then((json) => {
            tableTdUser = Object.values(json);
            console.log(tableTdUser);
                //tableTdUser.push(Object.values(element));
        });
        console.log(tableTdUser);
        return tableTdUser;
    }
}

const addBox = async(boxName, address, rfid) => {
    //method, url, data = null, header = null
    const response = callREST(
        HTTP_METHOD.POST,
        BOX_API.ADD_BOX,
        JSON.stringify({
            name: boxName,
            addr: address,
            rfid: rfid
        }),
        {
            "Content-Type": "application/json; charset-UTF-8",
        }
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at adding a new box", err);
        });
    } else {
        var tableTdBox = [];     
        await response.then((json) => {
            tableTdBox = Object.values(json);
            console.log(tableTdBox);
                //tableTdUser.push(Object.values(element));
        });
        console.log(tableTdBox);
        return tableTdBox;
    }
}

//targetBox = boxName
const addDelivery = async(targetBox, customerEmail, delivererEmail) => {
    //method, url, data = null, header = null
    //8-digit, for now:32 -> slicing first 8 digits
    const trackCode = uuidv4().substring(0, 7);
    let body = {
        customer: {
            email: customerEmail,
        },
        deliverer: {
            email: delivererEmail,
        },
        trackCode: trackCode
    };
    // get a unique qr code url
    const qrCode = await generateQrCode(JSON.stringify(body));
    body.qrCode = qrCode;

    const response = callREST(
        HTTP_METHOD.POST,
        ORDER_API.ADD_ORDER + targetBox,
        JSON.stringify(body),
        {
            "Content-Type": "application/json; charset-UTF-8",
        }
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at adding a new delivery", err);
        });
    } else {
        let tableTdDelivery = [];
        await response.then((json) => {
            tableTdDelivery = Object.values(json);
            console.log(tableTdDelivery);
                //tableTdUser.push(Object.values(element));
        });
        console.log(tableTdDelivery);
        return tableTdDelivery;
    }
}

export {
    addBox,
    addDelivery,
    addUser,
}
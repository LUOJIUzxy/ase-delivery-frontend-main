import { callREST, HTTP_METHOD } from "./http";

// get user data
const getDispatchers = async () => {
    const response = await callREST(
        HTTP_METHOD.GET,
        "/dispatchers"
    );
   return response;
}
// get user data
const getUsers = async () => {
    const response = await callREST(
        HTTP_METHOD.GET,
        "/customers"
    );
   return response;
}

// get user data
const getDeliverers = async () => {
    const response = await callREST(
        HTTP_METHOD.GET,
        "/deliverers"
    );
   return response;
}

export {
    getDispatchers,
    getUsers,
    getDeliverers
}

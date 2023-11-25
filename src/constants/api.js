const AUTH_API = {
    GET_PUBLIC_KEY: "/auth/pkey",
    LOGIN: "/auth/jwe",
    ROOT: "/auth/",
    GET_LOGIN_STATE: "/auth/jwt",
    DELETE_LOGIN_STATE: "/auth/clean"
}

const USER_API = {
    LIST_ALL_USERS: "/user/list",
    LIST_SINGLE_USER: "/user/find/",
    ADD_USER: "/user/add",
    UPDATE_USER: "/user/update/",
    DELETE_USERS: "/user/delete?id="
}

const BOX_API = {
    LIST_ALL_BOXES: "/box/list/",
    LIST_SINGLE_BOX: "/box/find/",
    ADD_BOX: "/box/add/",
    UPDATE_BOX: "/box/update/",
    DELETE_BOXES: "/box/delete?id="
}

const ORDER_API = {
    LIST_ALL_ORDERS: "/order/list/",
    LIST_SINGLE_ORDER: "/order/find/",
    CUSTOMER_LIST: "/order/list/customer/",
    DELIVERER_LIST: "/order/list/deliverer/",
    ADD_ORDER: "/order/add/",
    UPDATE_ORDER: "/order/update/",
    DELETE_ORDERS: "/order/delete?id=",
    PICK_UP_ORDER: "/order/pickup/"
}

const CSRF_API = {
    AUTHENTICATION_SERVICE: "/auth/csrf",
    DELIVERY_SERVICE: "delivery/csrf"
}

export {
    AUTH_API,
    USER_API,
    BOX_API,
    ORDER_API,
    CSRF_API
}

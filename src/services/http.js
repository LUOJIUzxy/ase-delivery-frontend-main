const HTTP_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

//const host = process.env.REACT_APP_ENV==='production'? "http://3.76.82.97:8080": "http://localhost:8080";
const host = process.env.REACT_APP_ENV==='production'? "https://3.76.82.97:8080": "https://localhost:8080";

async function callREST(method, url, data = null, header = null) {
    let options = {
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        redirect: "follow",
        refererPolicy: "origin-when-cross-origin",
        method: method
    };

    console.log(process.env.REACT_APP_BASE_URL);

    // append request body
    if (data) {
        options.body = data;
    }

    // append request header
    if (header) {
        options.headers = header;
    }

    const response = await fetch(host + url, options);
    return await response.json();
}

export {
    HTTP_METHOD,
    callREST
}

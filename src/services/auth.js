import { Jose } from "jose-jwe-jws";
import { callREST, HTTP_METHOD } from "./http";
import {AUTH_API, CSRF_API, XSRF_TOKEN} from "../constants";

const getEncryptedPassword = async (password) => {
    const response = callREST(
        HTTP_METHOD.GET,
        AUTH_API.GET_PUBLIC_KEY
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error at getting public key", err);
        });
    } else {
        let encryptedPwd = "";
        await response.then(key => {
            return Jose.Utils.importRsaPublicKey({
                "e": parseInt(key.e),
                "n": key.n
            }, "RSA-OAEP");
        }).then(async rsaKey => {
            const cryptographer = await new Jose.WebCryptographer();
            const encryptor = await new Jose.JoseJWE.Encrypter(cryptographer, rsaKey);
            encryptedPwd = await encryptor.encrypt(`{"password":"${password}"}`).then(result => {
                return result;
            });
        });
        return encryptedPwd;
    }
}

const login = async (username, encryptedPwd) => {
    const response = callREST(
        HTTP_METHOD.POST,
        AUTH_API.LOGIN,
        JSON.stringify({
            username: username,
            password: encryptedPwd
        }),
        {
                "Content-Type": "application/json"
        }
    );
    if (response.error) {
        await response.catch(err => {
            // TODO: message notifier
            console.log("Error when login", err);
        });
    } else {
        let data = {}
        await response.then((json) => {
            data = json;
        });
        return data;
    }
}

const getLoginState = async () => {
    const response = callREST(
        HTTP_METHOD.GET,
        AUTH_API.GET_LOGIN_STATE
    );
    let data = undefined;
    await response.then((json) => {
        data = json;
    });
    return data;
}

const removeLoginState = async () => {
    const response = callREST(
        HTTP_METHOD.DELETE,
        AUTH_API.DELETE_LOGIN_STATE
    );
    await response.then((data) => {
        console.log(data);
    });
}

export {
    getEncryptedPassword,
    login,
    getLoginState,
    removeLoginState
}

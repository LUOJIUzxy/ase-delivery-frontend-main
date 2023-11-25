import fetchIntercept from 'fetch-intercept';
import {callREST, HTTP_METHOD} from "../services/http";
import {AUTH_API, CSRF_API, XSRF_TOKEN} from "../constants";

export const unregister = fetchIntercept.register({
    request: async (url, config) => {
        // Modify the url or config here
        console.log(url);
        console.log(config);

        function wrapHeaders(config, token_name, token_value) {
            console.log(token_value);
            let options = {
                ...config
            };

            let headers = {};
            if (config.headers) {
                headers = Object.assign({}, config.headers);
            }
            headers[token_name] = token_value;

            options.headers = headers;

            return options;
        }

        if (config.method !== HTTP_METHOD.GET) {

            // Add corresponding csrf token
            let token_name = XSRF_TOKEN.DELIVERY;
            if (url.includes(AUTH_API.ROOT)) {
                // Append AUTH-XSRF-TOKEN
                token_name = XSRF_TOKEN.AUTH;
            }

            let csrfToken;
            if (document.cookie) {
                csrfToken = document.cookie.split(token_name + "=")?.[1].split(";")?.[0];
            }
            if (!csrfToken) {
                const response = callREST(
                    HTTP_METHOD.GET,
                    token_name === XSRF_TOKEN.DELIVERY? CSRF_API.DELIVERY_SERVICE: CSRF_API.AUTHENTICATION_SERVICE
                );
                if (response.error) {
                    await response.catch(err => {
                        // TODO: message notifier
                        console.log("Error at getting csrf token", err);
                    });
                } else {
                    await response.then((data) => {
                        csrfToken = document.cookie.split(token_name + "=")?.[1];
                        console.log(csrfToken);
                        return [url, wrapHeaders(config, token_name, csrfToken)];
                    });
                }
            } else {
                return [url, wrapHeaders(config, token_name, csrfToken)];
            }
        } else {
            return [url, config];
        }
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
});
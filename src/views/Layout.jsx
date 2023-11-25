import { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { ROLE } from "../constants";
import { getLoginState } from "../services/auth";

function Layout() {
    const navigate = useNavigate();

    // call when the layout component is rendered
    useEffect(() => {
        async function fetchCurrentLoginState() {
            try {
                const response = await getLoginState();
                if (!response || response.error) {
                    alert("Access Denied. Please login again");
                    navigate('/login', {replace: true});
                } else {
                    switch (response.role) {
                        case ROLE.DISPATCHER:
                            navigate('/dispatcher/' + response.id);
                            break;
                        case ROLE.DELIVERER:
                            navigate('/deliverer/' + response.id);
                            break;
                        case ROLE.CUSTOMER:
                            navigate('/customer/' + response.id);
                            break;
                        default:
                            navigate('/login', {replace: true});
                            break;
                    }
                }
            } catch (e) {
                // clear jwt
                console.log(e);
                navigate('/login', {replace: true});
            }
        }

        fetchCurrentLoginState();
    }, []);

    return (
        <div>
            <Outlet/>
        </div>
    );
}

export default Layout

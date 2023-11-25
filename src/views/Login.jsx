import { useState } from 'react'
import { getEncryptedPassword, login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../constants";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function onLogin(event) {
        event.preventDefault();
        const pwd = await getEncryptedPassword(password);
        if (pwd) {
            const response = await login(username, pwd);
            switch (response.role) {
                case ROLE.DISPATCHER:
                    console.log(response.id);
                    navigate('/dispatcher/' + response.id);
                    break;
                case ROLE.DELIVERER:
                    navigate('/deliverer/' + response.id);
                    break;
                case ROLE.CUSTOMER:
                    navigate('/customer/' + response.id);
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <div className="bg-light">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3
                                            className="text-center font-weight-light my-4">ASE Delivery Login</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={onLogin}>
                                                <div className="form-floating mb-3">
                                                    {/*<input className="form-control" id="inputEmail" type="email"*/}
                                                    {/*       placeholder="name@example.com"*/}
                                                    {/*       onChange={(e) => setEmail(e.target && e.target.value ? e.target.value : "")}/>*/}
                                                    {/*<label htmlFor="inputEmail">Email address</label>*/}
                                                    <input className="form-control" id="inputUsername"
                                                           placeholder="Username"
                                                           onChange={(e) => setUsername(e.target && e.target.value ? e.target.value : "")}/>
                                                    <label htmlFor="inputUsername">Username</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" id="inputPassword" type="password"
                                                           placeholder="Password"
                                                           onChange={(e) => setPassword(e.target && e.target.value ? e.target.value : "")}/>
                                                    <label htmlFor="inputPassword">Password</label>
                                                </div>
                                                <div className="form-check mb-3">
                                                    <input className="form-check-input" id="inputRememberPassword"
                                                           type="checkbox" value=""/>
                                                    <label className="form-check-label" htmlFor="inputRememberPassword">Remember
                                                        Password</label>
                                                </div>
                                                <div
                                                    className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <a className="small" href="password.html">Forgot Password?</a>
                                                    <button className="btn btn-primary" type="submit">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small"><a href="register.html">Need an account? Sign up!</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2022</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Login

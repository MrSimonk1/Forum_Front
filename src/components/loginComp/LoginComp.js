import React, {useRef, useState} from 'react';
import "./loginCSS.css"
import {useNavigate} from "react-router-dom";
import http from "../../plugins/http";

const LoginComp = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    const refs = {
        username: useRef(),
        password: useRef()
    }

    function login() {
        const user = {
            username: refs.username.current.value,
            password: refs.password.current.value
        }

        http.post(user, "login")
            .then((res) => {
                if (!res.success) {
                    setMessage(res.message);
                }
                if (res.success) {
                    setMessage(null);
                    navigate(`/profile/${res.user._id}/${res.user.username}`);
                }
            })
    }

    return (
        <div className="login-main">
            <div className="login">
                <div className="login-inputs">
                    <input ref={refs.username} type="text" placeholder="Username"/>
                    <input ref={refs.password} type="password" placeholder="Password"/>
                    {message && <div className="message-success-false">{message}</div>}
                    <button onClick={login}>Login</button>
                    <div className="not-registered">
                        Not registered?
                        <br/>
                        Register <span className="not-registered-span"
                                       onClick={() => navigate("/register")}>
                                    here.
                                </span>
                    </div>
                </div>
                <img src="https://volleybox.net/media/img/ilustrations/volleyball-forum.png?1.4" alt=""/>
            </div>
        </div>
    );
};

export default LoginComp;
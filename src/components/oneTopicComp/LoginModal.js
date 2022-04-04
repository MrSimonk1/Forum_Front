import React, { useRef } from "react";
import styles from "./LoginModalStyle.module.css";
import {IoMdClose} from "react-icons/io";
import http from "../../plugins/http";
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../../contexts/MyContext";

const LoginModal = ({setShowModal}) => {

    const username = useRef();
    const password = useRef();
    const [message, setMessage] = useState(null);
    const {setLoggedInPerson, setNotificationCount} = useContext(MyContext);

    function login() {
        const user = {
            username: username.current.value,
            password: password.current.value
        }

        http.post(user, "login")
            .then((res) => {
                if (!res.success) {
                    setMessage(res.message);
                }
                if (res.success) {
                    setMessage(null);
                    setLoggedInPerson(res.user);
                    
                    http.get("getNotifications")
                        .then((res) => {
                            console.log(res);
                            if (res.success) {
                                setNotificationCount(res.notSeenCount)
                            }
                    })
                }
            })
    }

    return (
        <div className={styles.modal_bg}>
            <div className={styles.modal_body}>
                <div className={styles.close_modal}>
                    <IoMdClose onClick={() => setShowModal(false)}/>
                </div>
                <h3>Login</h3>
                <input type="text" ref={username} placeholder="Username"></input>
                <input type="password" ref={password} placeholder="Password"></input>
                {message && <div>{message}</div>}
                <button className={styles.login_btn}
                        onClick={login}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default LoginModal;
import React, {useState} from 'react';
import {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import http from "../../plugins/http";
import styles from "./ProfileStyle.module.css";
import { useContext } from 'react';
import { MyContext } from '../../contexts/MyContext';

const ProfileInfoComp = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const {setLoggedInPerson, setNotificationCount} = useContext(MyContext);

    useEffect(() => {
        http.get("userProfileInfo")
            .then((res) => {
                if (res.success) {
                   setUser(res.user);
                   console.log(res);  
                }
                if (!res.success) {
                    navigate("/login");
                }              
            });    
    }, [])

    function dateConverter(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString("lt-LT");
    }

    function logout() {

        setNotificationCount(0);

        http.get("logout")
            .then((res) => {
                if (res.success) {
                    setLoggedInPerson(null);
                    navigate("/");
                }
            })
    }

    return (
        <div>
            {user &&
            <div className={styles.userInfo}>
                <img className={styles.userImage} src={user.image} alt=""/>
                <h2>{user.username}</h2>
                <button className={styles.edit_btn}>Edit profile</button>
                <div className={styles.stats}>
                    <div>Created: {dateConverter(user.dateRegistration)}</div>
                    <div>Total topics: {user.totalTopics}</div>
                    <div>Total comments: {user.totalComments}</div>
                </div>
                <button className={styles.create_btn} onClick={() => navigate("/create-topic")}>Create topic</button>
                <button className={styles.logout_btn} onClick={logout}>Log out</button>
            </div>}
        </div>
    );
};

export default ProfileInfoComp;
import React, {useState} from 'react';
import {useEffect} from "react";
import http from "../../plugins/http";
import styles from "./ProfileStyle.module.css";

const ProfileInfoComp = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        http.get("userProfileInfo")
            .then((res) => {
                setUser(res.user);
                console.log(res);
            });    
    }, [])

    function dateConverter(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString("lt-LT");
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
                    <div>Total posts: {user.totalPosts}</div>
                    <div>Total comments: {user.totalComments}</div>
                </div>
                <button className={styles.create_btn}>Create topic</button>
            </div>}
        </div>
    );
};

export default ProfileInfoComp;
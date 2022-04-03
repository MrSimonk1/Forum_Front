import React, { useState } from "react";
import styles from "./NotificationStyle.module.css";
import {IoMdNotificationsOutline} from "react-icons/io";
import { useContext } from "react";
import { MyContext } from "../../contexts/MyContext";
import NotificationListComp from "./NotificationListComp";
import http from "../../plugins/http";

const NotificationComp = () => {

    const [showNotifications, setShowNotifications] = useState(false);
    const {notificationCount, setNotificationCount} = useContext(MyContext);

    function showNotificationNumber() {
        if (notificationCount > 0) {
            return (
                 <div className={styles.notification_count}>{notificationCount}</div>
            ) 
        }       
    }   
    
    function openOrCloseNotifications() {
        if (showNotifications) {
            setShowNotifications(false);

            http.get("seenNotification")
                .then((res) => {
                    if (res.success) {
                        setNotificationCount(0);
                    }
            })
        }

        if (!showNotifications) {
            setShowNotifications(true);

        }
    }
    
    return (
        <div className={styles.notification_icon}>
            {showNotificationNumber()}
            <IoMdNotificationsOutline onClick={openOrCloseNotifications}/>
            {showNotifications && <NotificationListComp setShowNotifications={setShowNotifications}/>}
        </div>
    )
}

export default NotificationComp;
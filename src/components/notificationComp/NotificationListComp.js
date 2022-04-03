import React, { useEffect } from "react";
import styles from "./NotificationStyle.module.css";
import SmallLoader from "../reusable/SmallLoader";
import { useState } from "react";
import http from "../../plugins/http";
import OneNotificationItem from "./OneNotificationItem";

const NotificationListComp = ({setShowNotifications}) => {

    const [notificationsList, setNotificationsList] = useState(null);

    useEffect(() => {
        http.get("getNotifications")
            .then((res) => {
                if (res.success) {
                    setNotificationsList(res.notifications);
                }            
        })
    }, [])

    return (
        <div className={styles.notification_list}>
                {!notificationsList && <SmallLoader/>}
                {notificationsList && notificationsList.length === 0 && <div>No notifications</div>}
                {notificationsList && notificationsList.length !== 0 && <div>
                        {notificationsList.map(x => <div key={x._id}><OneNotificationItem item={x} setShowNotifications={setShowNotifications}/></div>)}
                    </div>}
        </div>
    )
}

export default NotificationListComp;
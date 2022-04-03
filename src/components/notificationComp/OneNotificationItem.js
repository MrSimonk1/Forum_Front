import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotificationStyle.module.css";
import { useContext } from "react";
import { MyContext } from "../../contexts/MyContext";
import http from "../../plugins/http";

const OneNotificationItem = ({item, setShowNotifications}) => {

    const navigate = useNavigate();
    const {setNotificationCount} = useContext(MyContext);

    function displayDate(timestamp) {
        const date = new Date(timestamp);

        return date.toLocaleDateString("lt-LT") + " " + date.toLocaleTimeString("lt-LT");
    }

    function goToTopic() {
        setShowNotifications(false);
        navigate(`/topic/${item.topicCommented}/${item.commentedTopicTitle}`);
        http.get("seenNotification")
                .then((res) => {
                    if (res.success) {
                        setNotificationCount(0);
                    }
            })
    }

    return (
        <div className={item.isSeen ? `${styles.one_item_seen}` : `${styles.one_item_not_seen}`}>
            User <span className={styles.commenter}>{item.commentBy}</span>  {" "}
            commented on your topic <span className={styles.title}
                                            onClick={goToTopic}
                                    >"{item.commentedTopicTitle}"</span> 
            at <span className={styles.date}>{displayDate(item.commentedDate)}</span> .
        </div>
    )
}

export default OneNotificationItem;
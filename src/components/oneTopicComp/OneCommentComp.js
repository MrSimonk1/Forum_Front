import React, { useEffect, useState } from "react";
import http from "../../plugins/http";
import styles from "./OneTopicStyle.module.css";


const OneCommentComp = ({index, comment}) => {

    console.log(index, comment);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const info = {
            username: comment.commentBy
        }

        http.post(info, "commenterInfo")
            .then((res) => {
                console.log(res);
                if (res.success) {
                    setUser(res.user);
                }
            })
    }, []);

    function displayCommenter() {
        if (user) {
            return (
                <div>
                    <img className={styles.userImage} src={user.image}/>
                    <div>Registered: {displayDate(user.dateRegistration)}</div>
                    <div>Total topics: {user.totalTopics}</div>
                </div>
            )
        }
    }

    function displayDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString("lt-Lt");

    }

    function displayTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString("lt-LT");
    }

  


    return (
        <div>
            <div className={styles.comment_top}>
                <div className={styles.grow1}>
                    {comment.commentBy}
                </div>
                <div className={`${styles.date_position} ${styles.grow2}`}>
                    <div>{displayDate(comment.commentDate)} {displayTime(comment.commentDate)}</div>
                    <div>#{index + 1}</div>
                </div>
            </div>
            <div className={styles.comment_main}>
                <div className={`${styles.grow1} ${styles.user_info}`}>{displayCommenter()}</div>
                <div className={`${styles.grow2} ${styles.comment}`}>{comment.comment}</div>
            </div>
        </div>
    )
}

export default OneCommentComp;
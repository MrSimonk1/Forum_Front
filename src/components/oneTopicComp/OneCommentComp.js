import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../plugins/http";
import styles from "./OneTopicStyle.module.css";


const OneCommentComp = ({profile, index, comment, page}) => {

    const date = new Date(comment.commentDate);
    const dateDate = date.toLocaleDateString("lt-Lt");
    const dateTime = date.toLocaleTimeString("lt-LT");
    const navigate = useNavigate();

    console.log(page)

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
            const date = new Date (user.dateRegistration);
            const dateOfRegistration = date.toLocaleDateString("lt-LT");
            return (
                <div>
                    <img className={styles.userImage} src={user.image}/>
                    <div>Registered: {dateOfRegistration}</div>
                    <div>Total topics: {user.totalTopics}</div>
                    <div>Total comments: {user.totalComments}</div>
                </div>
            )
        }
    }

    return (
        <div>
            <div className={styles.comment_top}>
                <div className={styles.grow1}>
                    {profile ? <p className={styles.topic_commented_title}
                                    onClick={() => navigate(`/topic/${comment.topicCommented}/${comment.topicCommentedTitle}`)}>
                                 {comment.topicCommentedTitle}
                               </p> 
                               : 
                               comment.commentBy}
                </div>
                <div className={`${styles.date_position} ${styles.grow2}`}>
                    <div>{dateDate} {dateTime}</div>
                    <div>#{index + 1 + (Number(page) * 10 -10)}</div>
                </div>
            </div>
            <div className={styles.comment_main}>
                <div className={`${styles.grow1} ${styles.user_info}`}>{displayCommenter()}</div>
                <div id='text' className={`${styles.grow2} ${styles.comment}`}>{comment.comment}</div>
            </div>
        </div>
    )
}

export default OneCommentComp;
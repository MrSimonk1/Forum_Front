import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllTopicsStyle.module.css";

const OneTopicPreview = ({info}) => {

    const navigate = useNavigate();

    function returnDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString("lt-LT") + " " + date.toLocaleTimeString("lt-LT");
    }

    function goToSingleTopic() {
        navigate(`/topic/${info._id}/${info.title}`);
    }

    return (
        <div className={styles.topic_preview}>
            <div className={styles.grow4}>
                <span className={styles.title}
                      onClick={goToSingleTopic}>
                    {info.title}
                </span> 
                <span className={styles.text}>
                    <br/> by {info.createdBy}
                </span>
                
            </div>
            <div className={`${styles.grow1} ${styles.replies} ${styles.text}`}>{info.commentsCount}</div>
            <div className={styles.grow2}>
                    <span className={styles.date}>
                    {returnDate(info.latestCommentDate)}
                    </span> <br/> 
                    <span className={styles.text}>
                        by {info.latestCommentBy}
                    </span>
                </div>
        </div>
    )
}

export default OneTopicPreview;
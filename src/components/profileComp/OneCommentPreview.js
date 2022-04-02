import React, { useEffect, useState } from "react";
import http from "../../plugins/http";
import styles from "./ProfileStyle.module.css";

const OneCommentPreview = ({comment}) => {

    const [topic, setTopic] = useState(null);

    useEffect(() => {
        http.get(`getOneTopic/${comment.topicCommented}`)
            .then((res) => {
                console.log(res);
                if (res.success) {
                    setTopic(res.topic);
                }
            })
    }, [])

    return (
        <div>
            {topic && <div className={styles.my_comment_preview}>
                <div className={styles.comment_title}>{topic.title}</div>
                <div className={styles.comment}>{comment.comment}</div>
            </div>}
            
        </div>
    )
}

export default OneCommentPreview;
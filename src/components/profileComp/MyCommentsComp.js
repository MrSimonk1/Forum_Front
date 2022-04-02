import React, { useEffect, useState } from 'react';
import styles from "./ProfileStyle.module.css";
import http from '../../plugins/http';
import SmallLoader from '../reusable/SmallLoader';
import OneCommentPreview from './OneCommentPreview';
import OneCommentComp from '../oneTopicComp/OneCommentComp';

const MyCommentsComp = () => {

    const [comments, setComments] = useState(null);

    useEffect(() => {
        http.get("getCommentsOfOneUser")
            .then((res) => {
                if (res.success) {
                    setComments(res.comments);
                }
            })
    }, [])

    return (
        <div className={styles.my_comments}>
            <div className={styles.comments_info_bar}>
                <div className={styles.topic_title}>Topic</div>
                <div className={styles.comment}>My comment</div>
            </div>
            {!comments && <SmallLoader/>}
            {comments && comments.length === 0 && <h4>You have not commented on any topic</h4>}
            {comments && comments.length !== 0 && <div className={styles.p10}>
                {comments.map((x, index) => <div key={x._id}><OneCommentComp index={index} comment={x}/></div>)}
            </div>}
        </div>
    );
};

export default MyCommentsComp;

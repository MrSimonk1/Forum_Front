import React, { useEffect, useState } from 'react';
import styles from "./ProfileStyle.module.css";
import http from '../../plugins/http';
import SmallLoader from '../reusable/SmallLoader';
import OneCommentPreview from './OneCommentPreview';
import OneCommentComp from '../oneTopicComp/OneCommentComp';
import PaginationMain from '../paginationComp/PaginationMain';

const MyCommentsComp = () => {

    const [comments, setComments] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);

    useEffect(() => {
        http.get(`getCommentsOfOneUser/${page}`)
            .then((res) => {
                if (res.success) {
                    setComments(res.comments);
                    setCount(res.count);
                }
            })
    }, [])

    function changePage(newPage) {
        setPage(newPage);

        http.get(`getCommentsOfOneUser/${newPage}`)
        .then((res) => {               
             if (res.success) {
                console.log(res);
                setComments(res.comments);
                setCount(res.count);
            }
        })
    }

    return (
        <div className={styles.my_comments}>
            <div className={styles.comments_info_bar}>
                <div className={styles.topic_title}>Topic</div>
                <div className={styles.comment}>My comment</div>
            </div>
            <PaginationMain page={page} count={count} changePage={changePage}/>
            {!comments && <SmallLoader/>}
            {comments && comments.length === 0 && <h4>You have not commented on any topic</h4>}
            {comments && comments.length !== 0 && <div className={styles.p10}>
                {comments.map((x, index) => <div key={x._id}><OneCommentComp index={index} comment={x}/></div>)}
            </div>}
        </div>
    );
};

export default MyCommentsComp;

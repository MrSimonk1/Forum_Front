import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../plugins/http";
import styles from "./OneTopicStyle.module.css";
import TitleComp from "./TitleComp";
import OneCommentComp from "./OneCommentComp";
import WriteCommentComp from "./WriteCommentComp";
import PaginationMain from "../paginationComp/PaginationMain";

const OneTopicComp = () => {

    const [topic, setTopic] = useState(null);
    const [comments, setComments] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);

    const {id} = useParams();
    
    useEffect(() => {
        http.get(`getOneTopic/${id}`)
            .then((res) => {
                if (res.success) {
                    console.log(res.topic);
                    setTopic(res.topic);
                } 
            })
        
        http.get(`getCommentsOfOneTopic/${id}/${page}`)
            .then((res) => {
                console.log(res);
                if  (res.success) {
                    setComments(res.comments);
                    setCount(res.count);
                }
            })
    }, [])

    function changePage(newPage) {
        setPage(newPage);

        http.get(`getCommentsOfOneTopic/${id}/${newPage}`)
            .then((res) => {
                console.log(res);
                if  (res.success) {
                    setComments(res.comments);
                    setCount(res.count);
                }
            })
    }

    function displayComments(comments) {
        return (
            <div className={styles.bg_comments}>
                        {comments.map((x, i) => <div key={x._id}><OneCommentComp profile={false} index={i} page={page} comment={x}/></div>)}
            </div>
        )
    }

    return (
        <div>
            {topic && comments && 
                <div className={styles.bg}>
                    <TitleComp title={topic.title}/>
                    <PaginationMain page={page} count={count} changePage={changePage}/>
                    {displayComments(comments)}
                    <WriteCommentComp topicId={id} setComments={setComments} commentCount={count} setPage={setPage} setCount={setCount}/>
                </div>
            }            
        </div>        
    )
}

export default OneTopicComp;
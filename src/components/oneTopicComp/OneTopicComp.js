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

    const {id} = useParams();
    
    useEffect(() => {
        http.get(`getOneTopic/${id}`)
            .then((res) => {
                if (res.success) {
                    console.log(res.topic);
                    setTopic(res.topic);
                } 
            })
        
        http.get(`getCommentsOfOneTopic/${id}`)
            .then((res) => {
                console.log(res);
                if  (res.success) {
                    setComments(res.comments);
                }
            })
    }, [])

    function displayComments(comments) {
        return (
            <div className={styles.bg_comments}>
                        {comments.map((x, i) => <div key={x._id}><OneCommentComp index={i} comment={x}/></div>)}
            </div>
        )
    }

    return (
        <div>
            {topic && comments && 
                <div className={styles.bg}>
                    <TitleComp title={topic.title}/>
                    hello
                    {displayComments(comments)}
                    <WriteCommentComp topicId={id} setComments={setComments}/>
                </div>
            }            
        </div>        
    )
}

export default OneTopicComp;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../plugins/http";

const OneTopicComp = () => {

    const [topic, setTopic] = useState(null);
    const [comments, setComments] = useState(null);

    const {id} = useParams();
    
    useEffect(() => {
        http.get(`getOneTopic/${id}`)
            .then((res) => {
                if (res.success) {
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

    return (
        <div>
                one topic comp hello
        </div>
    )
}

export default OneTopicComp;
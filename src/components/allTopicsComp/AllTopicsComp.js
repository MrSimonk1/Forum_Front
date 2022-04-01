import React, { useEffect } from "react";
import styles from "./AllTopicsStyle.module.css";
import {useState} from "react";
import http from "../../plugins/http";
import OneTopicPreview from "./OneTopicPreview";

const AllTopicsComp = () => {

    const [topics, setTopics] = useState(null);

    useEffect(() => {
        http.get("getTopics")
            .then((res) => {
                setTopics(res.topics)
            })
    }, [])

    return (
        <div className={styles.bg}>
            <div className={styles.all_previews}>
                <div className={styles.info_bar}>
                    <div className={styles.grow4}>Topic</div>
                    <div className={`${styles.grow1} ${styles.replies}`}>Replies</div>
                    <div className={styles.grow2}>Latest reply</div>
                </div>
            {topics && topics.map(x => <div key={x._id}><OneTopicPreview info={x}/></div>)}
            </div>
           
            
        </div>
    )
}

export default AllTopicsComp;
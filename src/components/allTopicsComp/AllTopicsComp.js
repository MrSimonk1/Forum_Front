import React, { useEffect } from "react";
import styles from "./AllTopicsStyle.module.css";
import {useState} from "react";
import http from "../../plugins/http";
import OneTopicPreview from "./OneTopicPreview";
import SmallLoader from '../reusable/SmallLoader';


const AllTopicsComp = ({url}) => {

    const [topics, setTopics] = useState(null);

    useEffect(() => {
        http.get(`${url}`)
            .then((res) => {
                setTopics(res.topics)
            })
    }, [])

    function display() {
        if (!topics) {
            return (
               <SmallLoader/> 
            )           
        }
        if (topics && topics.length !== 0) {
            return (
                <div>
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
        if (topics && topics.length === 0) {
            return (
                <div>
                    <div className={styles.all_previews}>
                        <div className={styles.info_bar}>
                            <div className={styles.grow4}>Topic</div>
                            <div className={`${styles.grow1} ${styles.replies}`}>Replies</div>
                            <div className={styles.grow2}>Latest reply</div>
                        </div>
                        <div className={styles.empty}>
                            <h4>You have not created any topics</h4>
                            <button>Create topic</button>
                        </div>
                    </div>
                </div>   
            )
        }
    }

    return (
        <div className={styles.bg}>
            {display()}           
        </div>
    )
}

export default AllTopicsComp;
import React from "react";
import styles from "./CreateTopicStyle.module.css";
import { useRef } from "react";
import http from "../../plugins/http";

const CreateTopicComp = () => {

    const refs = {
        title: useRef(),
        comment: useRef()
    }
    
    function create() {
        const titleInfo = {
            title: refs.title.current.value,
            comment: refs.comment.current.value
        }

        http.post(titleInfo, "create-topic")
            .then((res) => {
                if (res.success) {
                    const id = res.id;

                    const commentInfo = {
                        topicId: id,
                        comment: refs.comment.current.value
                    }

                    http.post(commentInfo, "comment")
                        .then((res) => {
                            console.log(res)
                        })
                }
            })
    }

    return (
        <div className={styles.create_bg}>
                <div className={styles.container}>
                    <input ref={refs.title} type="text" placeholder="Topic name"></input>
                    <textarea ref={refs.comment} placeholder="Initial message"></textarea>
                    <button onClick={create}>Create topic</button>
                </div>
        </div>
    )
}

export default CreateTopicComp;
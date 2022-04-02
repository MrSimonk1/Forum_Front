import React, { useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../contexts/MyContext";
import styles from "./OneTopicStyle.module.css";
import http from "../../plugins/http";

const WriteCommentComp = ({topicId, setComments}) => {

    const { loggedInPerson } = useContext(MyContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    const commentRef = useRef();
    const scrollBottomRef = useRef();

    function writeComment() {

        const info = {
            comment: commentRef.current.value,
            topicId: topicId
        }

        http.post(info, "write-comment")
            .then((res) => {
                if (!res.success) {
                    setMessage(res.message);
                    setTimeout(() => {
                        setMessage(null);
                    }, 1500)  
                }
                if (res.success) {
                    http.get(`getCommentsOfOneTopic/${topicId}`)
                        .then((res) => {
                            console.log(res);
                            if  (res.success) {
                                setMessage(res.message);
                                setTimeout(() => {setMessage(null)}, 1500)                            
                                setComments(res.comments);
                                document.querySelector("textarea").value = "";
                                setTimeout(function () {
                                    scrollBottomRef.current.scrollIntoView({top: 100, behavior: "smooth"});
                                }, 100);                               
                        }
                    })
                }
            })
        }

    function displayTextarea() {
        if (loggedInPerson) {
            return (
                <div className={styles.comment_field_bg}>
                       <textarea ref={commentRef}></textarea> 
                       <button ref={scrollBottomRef} onClick={writeComment}>Comment</button>
                       {message && <h4>{message}</h4>}
                </div>
            )
        }

        if (!loggedInPerson) {
            return (
                <div className={styles.comment_field_bg}>
                       <h4>You are not logged in</h4>
                       <h4>Only registered users can leave a comment</h4> 
                       <button onClick={() => navigate("/login")}>Login</button>
                </div>
            )
        }

    }

    return (
        <div>
            {displayTextarea()}
        </div>
    )
}

export default WriteCommentComp;
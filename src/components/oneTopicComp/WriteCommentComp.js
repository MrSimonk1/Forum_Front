import React, { useRef, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../contexts/MyContext";
import styles from "./OneTopicStyle.module.css";
import http from "../../plugins/http";
import LoginModal from "./LoginModal";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const WriteCommentComp = ({topicId, setComments, commentCount, setPage, setCount}) => {

    const { loggedInPerson } = useContext(MyContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const commentRef = useRef();
    const scrollBottomRef = useRef();

    function goToLastPage() {
        if (commentCount) {
            if (commentCount < 10) {
                const count = 1;
                return count
            }
            if (commentCount >= 10) {
                const count = Math.floor(commentCount / 10);

                return count + 1;
            }
            
        }
    }

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
                    http.get(`getCommentsOfOneTopic/${topicId}/${goToLastPage()}`)
                        .then((res) => {
                            console.log(res);
                            if  (res.success) {
                                setMessage(res.message);
                                setTimeout(() => {setMessage(null)}, 1500)                            
                                setComments(res.comments);
                                setCount(res.count);
                                setPage(goToLastPage);            
                                document.querySelector("textarea").value = "";
                                setTimeout(function () {
                                    scrollBottomRef.current.scrollIntoView({top: 100, behavior: "smooth"});
                                }, 100);
                                socket.emit("getComments", topicId);
                                socket.on("setComments", res => {
                                    setComments(res);
                                })
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
                       <button ref={scrollBottomRef} 
                               onClick={writeComment}
                               className={styles.login_button}>
                           Comment
                       </button>
                       {message && <h4>{message}</h4>}
                </div>
            )
        }

        if (!loggedInPerson) {
            return (
                <div className={styles.comment_field_bg}>
                       <h4>You are not logged in</h4>
                       <h4>Only registered users can leave a comment</h4> 
                       <button className={styles.login_button} onClick={() => setShowLoginModal(true)}>Login</button>
                       {showLoginModal && <LoginModal setShowModal={setShowLoginModal}/>}
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
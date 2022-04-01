import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../contexts/MyContext";
import styles from "./OneTopicStyle.module.css";

const WriteCommentComp = () => {

    const { loggedInPerson } = useContext(MyContext);
    const navigate = useNavigate();

    function displayTextarea() {
        if (loggedInPerson) {
            return (
                <div className={styles.comment_field_bg}>
                       <textarea></textarea> 
                       <button>Comment</button>
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
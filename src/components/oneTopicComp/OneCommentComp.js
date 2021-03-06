import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../plugins/http";
import styles from "./OneTopicStyle.module.css";
import YoutubeVideoComp from "./YoutubeVideoComp";
import SmallLoader from "../reusable/SmallLoader";


const OneCommentComp = ({profile, index, comment, page}) => {

    const date = new Date(comment.commentDate);
    const dateDate = date.toLocaleDateString("lt-Lt");
    const dateTime = date.toLocaleTimeString("lt-LT");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userRegistration, setUserRegistration] = useState(null);

    useEffect(() => {
        const info = {
            username: comment.commentBy
        }

        http.post(info, "commenterInfo")
            .then((res) => {
                if (res.success) {
                    setUser(res.user);
                    const date = new Date(res.user.dateRegistration);
                    const dateOfRegistration = date.toLocaleDateString("lt-LT");
                    setUserRegistration(dateOfRegistration);
                }
            })
    }, []);

    function checkForYoutubeVideoAndImage(commentInfo) {
        const arrayOfWords = commentInfo.split(" ");

        let arrayOfYoutubeVideos = [];

        arrayOfWords.map(x => {
            if (x.includes("youtube.com/watch")) {                
                arrayOfYoutubeVideos.push(x);
            }
        });

        let arrayOfImageLinks = [];

        arrayOfWords.map(y => {
            if (y.includes("jpeg") || y.includes("jpg") || y.includes("gif") || y.includes("png")) {
                arrayOfImageLinks.push(y);
            }
        })  

        function youtube_parser(url){
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[7].length==11) ? match[7] : false;
        }

        if (arrayOfYoutubeVideos.length > 0 && arrayOfImageLinks.length > 0) {
            return (
                <div className={styles.additional_content}>
                    {arrayOfYoutubeVideos.map((x, i) => <div key={i}>
                        <YoutubeVideoComp id={youtube_parser(x)}/>
                    </div>)}
                    {arrayOfImageLinks.map((x, i) => <img key={i} src={x}/>)}
                </div>
            )
        }

        if (arrayOfYoutubeVideos.length > 0 && arrayOfImageLinks.length === 0) {
            return (
                <div className={styles.additional_content}>
                    {arrayOfYoutubeVideos.map((x, i) => <div key={i}>
                        <YoutubeVideoComp id={youtube_parser(x)}/>
                    </div>)}
                </div>
            )
        }

        if (arrayOfYoutubeVideos.length === 0 && arrayOfImageLinks.length > 0) {
            return (
                <div className={styles.additional_content}>
                    {arrayOfImageLinks.map((x, i) => <img key={i} src={x}/>)}
                </div>
            )
        }
    }

    function displayCommentBody() {
        return (
            <div>
                <div className={styles.comment_top}>
                <div className={styles.written_by}>
                    {profile ? <p className={styles.topic_commented_title}
                                    onClick={() => navigate(`/topic/${comment.topicCommented}/${comment.topicCommentedTitle}`)}>
                                 {comment.topicCommentedTitle}
                               </p> 
                               : 
                               comment.commentBy}
                </div>
                <div className={`${styles.date_position}`}>
                    <div>{dateDate} <span className={styles.xs_d_none}>{dateTime}</span> </div>
                    <div>#{index + 1 + (Number(page) * 10 -10)}</div>
                </div>
            </div>
            <div className={styles.comment_main}>
                <div className={`${styles.grow1} ${styles.user_info}`}>
                    <div>
                        <img className={styles.userImage} src={user.image}/>
                        <div>Registered: {userRegistration}</div>
                        <div>Total topics: {user.totalTopics}</div>
                        <div>Total comments: {user.totalComments}</div>
                    </div>
                </div>
                <div id='text' className={`${styles.comment} ${styles.grow2}`}>
                    <div className={styles.comment_text}>
                     {comment.comment}
                    </div>
                    <div>
                        {checkForYoutubeVideoAndImage(comment.comment)}
                    </div>                   
                </div>              
            </div>
        </div>         
        )
    }

    return (
        <div>
            {user && displayCommentBody()} 
            {!user && <SmallLoader/>}         
        </div>
    )
}

export default OneCommentComp;
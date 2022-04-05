import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllTopicsStyle.module.css";
import {AiOutlineStar, AiTwotoneStar} from "react-icons/ai";
import { useContext } from "react";
import { MyContext } from "../../contexts/MyContext";

const OneTopicPreview = ({info}) => {

    const navigate = useNavigate();
    const {setFavoriteCounter} = useContext(MyContext);
    const [favorite, setFavorite] = useState(
        JSON.parse(localStorage.favoriteTopics).find((x) => x === info._id)
    );

    function returnDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString("lt-LT") + " " + date.toLocaleTimeString("lt-LT");
    }

    function goToSingleTopic() {
        navigate(`/topic/${info._id}/${info.title}`);
    }

    function displayFavorite(info) {

        function setToFavorite() {
            let favoriteTopics = JSON.parse(localStorage.favoriteTopics);
            setFavorite(!favorite);
            if (!favorite) {
                favoriteTopics.push(info._id);
            } else {
                favoriteTopics = favoriteTopics.filter((x) => x !== info._id);
            }
            localStorage.setItem("favoriteTopics", JSON.stringify(favoriteTopics));
            setFavoriteCounter(JSON.parse(localStorage.favoriteTopics).length);
        }

        if (!favorite) {
           return (
            <div className={styles.favoriteStarEmpty}>
                <AiOutlineStar onClick={setToFavorite}/>
            </div>
            ) 
        }

        if (favorite) {
            return (
                <div className={styles.favoriteStarEmpty}>
                    <AiTwotoneStar onClick={setToFavorite}/>
                </div>
                ) 
        }      
    }

    return (
        <div className={styles.topic_preview}>
            <div className={styles.grow4}>
                <span className={styles.title}
                      onClick={goToSingleTopic}>
                    {info.title}
                </span> 
                <span className={styles.text}>
                    <br/> by {info.createdBy}
                </span>                
            </div>
            <div className={`${styles.replies} ${styles.text}`}>{info.commentsCount}</div>
            <div className={styles.grow2}>
                    <span className={styles.date}>
                    {returnDate(info.latestCommentDate)}
                    </span> <br/> 
                    <span className={styles.text}>
                        by {info.latestCommentBy}
                    </span>
            </div>
            {displayFavorite(info)}
        </div>
    )
}

export default OneTopicPreview;
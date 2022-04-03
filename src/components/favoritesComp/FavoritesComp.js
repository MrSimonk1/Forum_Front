import React, { useEffect, useState } from "react";
import http from "../../plugins/http";
import styles from "../allTopicsComp/AllTopicsStyle.module.css";
import SmallLoader from "../reusable/SmallLoader";
import PaginationMain from "../paginationComp/PaginationMain";
import OneFavoritePreview from "./OneFavoritePreview";
import { useNavigate } from "react-router-dom";

const FavoritesComp = () => {

    const [favorites, setFavorites] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(null);
    const favoritesArray = JSON.parse(localStorage.favoriteTopics);

    const navigate = useNavigate();

    useEffect(() => {
        fnSetFavorites();
    }, [])

    function fnSetNewFavorites() {

        const newFavoritesArray = JSON.parse(localStorage.favoriteTopics);

        const object = {
            page: page,
            array: newFavoritesArray
        }

        http.post(object, "getFavorites")
            .then((res) => {
                if (res.success) {
                   setFavorites(res.topics);
                   setCount(res.count) 
                   console.log(res);
                }
            })
    }

    function fnSetFavorites() {
        const object = {
            page: page,
            array: favoritesArray
        }

        http.post(object, "getFavorites")
            .then((res) => {
                if (res.success) {
                   setFavorites(res.topics);
                   setCount(res.count) 
                   console.log(res);
                }
            })
    }

    function changePage(newPage) {
        setPage(newPage);

        const newFavoritesArray = JSON.parse(localStorage.favoriteTopics);

        const object = {
            page: newPage,
            array: newFavoritesArray
        }

        http.post(object, "getFavorites")
            .then((res) => {
                if (res.success) {
                setFavorites(res.topics);
                setCount(res.count) 
                }
            })
    }

    function display() {
        if (!favorites) {
            return (
               <SmallLoader/> 
            )           
        }
        if (favorites && favorites.length !== 0 && count !== null) {
            return (
                <div>
                    <div className={styles.all_previews}>
                        <div className={styles.info_bar}>
                            <div className={styles.grow4}>Topic</div>
                            <div className={`${styles.grow1} ${styles.replies}`}>Replies</div>
                            <div className={styles.grow2}>Latest reply</div>
                            <div className={styles.empty_div}></div>
                        </div>
                        <PaginationMain page={page} count={count} changePage={changePage}/>
                        {favorites && favorites.map(x => <div key={x._id}><OneFavoritePreview fnSetNewFavorites={fnSetNewFavorites} info={x}/></div>)}
                    </div>
                </div>   
            )
        }
        if (favorites && favorites.length === 0) {
            return (
                <div>
                    <div className={styles.all_previews}>
                            <div className={styles.info_bar}>
                            <div className={styles.grow4}>Topic</div>
                            <div className={`${styles.grow1} ${styles.replies}`}>Replies</div>
                            <div className={styles.grow2}>Latest reply</div>
                        </div>
                        <div className={styles.empty}>
                            <h4>You don't have any favorite topics</h4>
                            <button onClick={() => navigate("/")}>See all topics</button>
                        </div>
                    </div>
                </div>   
            )
        }
    }

    return (
        <div>   
            {display()}
        </div>
    )
}

export default FavoritesComp;
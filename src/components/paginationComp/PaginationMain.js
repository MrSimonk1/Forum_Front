import React from "react";
import styles from "./PaginationStyle.module.css";

const PaginationMain = ({page, count, changePage}) => {

    function returnPagination() {
        if (count <= 10) {
            return (
                <div className={styles.pagination_bg}>Page: 1</div>
            )
        }
        if (count > 10) {
            let counter = count / 10;
            let remainder = count % 10;
            let arr = [];

            if (remainder === 0) {
                for (let i = 0; i < counter; i++) {
                    arr.push(i+1)
                  }  
            }
            if (remainder !== 0) {
                for (let i = 0; i < counter; i++) {
                    arr.push(i+1)
                  }  
            }

            return (
                <div className={styles.pagination_bg}>
                    <div className={styles.pagination_main}>
                        <div className={`${styles.previous} ${styles.hover}`}
                             onClick={() => changePreviousPage()}
                        >Previous</div>
                        {arr.map(x => <div key={x} className={ page === x ? `${styles.border_top_bot_right} ${styles.hover} ${styles.bg_light}` 
                                                    : 
                                                   `${styles.border_top_bot_right} ${styles.hover}`}
                                                    onClick={() => changeCustomPage(x)}
                        >{x}</div>)}
                        <div className={`${styles.next} ${styles.hover}`}
                             onClick={() => changeNextPage(arr)}  
                        >Next</div>
                    </div>
                </div>
            )             
        }
    }

    function changeCustomPage(clickedPage) {
        if (clickedPage !== page) {
            changePage(clickedPage)
        }
    }

    function changeNextPage(arrayOfPages) {
        if (page < arrayOfPages[arrayOfPages.length-1]) {
            changePage(page + 1);
        }       
    }

    function changePreviousPage() {
        if (page > 1) {
            changePage(page - 1);
        }
    }

    return (
        <div>
            {returnPagination()}
        </div>
        
    )
}

export default PaginationMain;
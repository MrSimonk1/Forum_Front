import React, { useRef } from "react";
import styles from "./ProfileStyle.module.css";
import {IoMdClose} from "react-icons/io";
import http from "../../plugins/http";
import { useState } from "react";

const ModalChangePic = ({setShowModal, reloadProfile}) => {

    const pictureRef = useRef();
    const [message, setMessage] = useState(null);

    function changePicture() {
        const obj = {
            picture: pictureRef.current.value
        }

        http.post(obj, "change-picture")
            .then((res) => {
                if (!res.success) {
                    setMessage(res.message);
                }
                if (res.success) {
                    setMessage(null);
                    setShowModal(false);
                    reloadProfile();
                }
            })
    }

    return (
        <div className={styles.modal_bg}>
            <div className={styles.modal_body}>
                <div className={styles.close_modal}>
                    <IoMdClose onClick={() => setShowModal(false)}/>
                </div>
                <h3>Change pictute</h3>
                <input ref={pictureRef} placeholder="URL"></input>
                <button className={styles.change_btn}
                        onClick={changePicture}>
                    Change
                </button>
                {message && <div>{message}</div>}
            </div>
        </div>
    )
}

export default ModalChangePic;
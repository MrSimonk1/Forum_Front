import React from 'react';
import "./toolbarCSS.css";
import {useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../../contexts/MyContext';
import http from '../../plugins/http';
import NotificationComp from '../notificationComp/NotificationComp';

const ToolbarComp = () => {

    const navigate = useNavigate();
    const {loggedInPerson, favoriteCounter, setNotificationCount} = useContext(MyContext);

    function goToProfile() {
        http.get("check-logged-in")
            .then((res) => {
                if (res.success) {
                    navigate(`/profile/${loggedInPerson._id}/${loggedInPerson.username}`);

                    http.get("getNotifications")
                        .then((res) => {
                            if (res.success) {
                                setNotificationCount(res.notSeenCount)
                            }
                    })
                }
                if (!res.success) {
                    navigate("/login");
                }
            })
    }

    function displayToolbar() {
        return (
            <div className="toolbar">
                <div className="toolbar-right" onClick={() => navigate("/")}>
                    Forum
                </div>
                <div className="toolbar-left">
                    <div onClick={() => navigate("/favorites")}>Favorites {favoriteCounter > 0 && favoriteCounter}</div>
                    {loggedInPerson && <NotificationComp/>}
                    {loggedInPerson ? <div onClick={() => goToProfile()}>Profile</div> : <div onClick={() => navigate("/login")}>Login</div>}
                </div>
            </div>
        )
    }

    return (
        <div>
            {displayToolbar()}
        </div>
    );
};

export default ToolbarComp;
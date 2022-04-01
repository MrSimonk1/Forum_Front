import React from 'react';
import "./toolbarCSS.css";
import {useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../../contexts/MyContext';

const ToolbarComp = () => {

    const navigate = useNavigate();
    const {loggedInPerson} = useContext(MyContext);

    function displayToolbar() {
        return (
            <div className="toolbar">
                <div className="toolbar-right" onClick={() => navigate("/")}>
                    Forum
                </div>
                <div className="toolbar-left">
                    <div>Favorites</div>
                    {loggedInPerson ? <div onClick={() => navigate(`/profile/${loggedInPerson._id}/${loggedInPerson.username}`)}>Profile</div> : <div onClick={() => navigate("/login")}>Login</div>}
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
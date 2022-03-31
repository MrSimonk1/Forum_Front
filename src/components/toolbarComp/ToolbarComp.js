import React from 'react';
import "./toolbarCSS.css";
import {useNavigate} from "react-router-dom";

const ToolbarComp = () => {

    const navigate = useNavigate();

    function displayToolbar() {
        return (
            <div className="toolbar">
                <div className="toolbar-right">
                    Forum
                </div>
                <div className="toolbar-left">
                    <div>Favorites</div>
                    <div onClick={() => navigate("/login")}>Login</div>
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
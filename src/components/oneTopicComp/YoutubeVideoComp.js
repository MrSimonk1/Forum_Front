import React from "react";
import PropTypes from "prop-types";
import styles from "./OneTopicStyle.module.css";

const YoutubeVideoComp = ({id}) => {

    return (
        <div>
            <iframe
            className={styles.frame}
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            />
        </div>
    )
}

YoutubeVideoComp.propTypes = {
    id: PropTypes.string.isRequired
  };

export default YoutubeVideoComp;
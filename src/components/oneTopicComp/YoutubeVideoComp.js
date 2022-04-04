import React from "react";
import PropTypes from "prop-types";

const YoutubeVideoComp = ({id}) => {

    return (
        <div>
            <iframe
            width="200"
            height="100"
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
import React from 'react';

function ProgressBar({
    percentage,
    fillColor,
    baseColor
}) {
    const progressBarClass = {
        height: "28px",
        width: "100%",
        backgroundColor: baseColor,
        borderRadius: "15px"
    }
    const innerBar = {
        height: "28px",
        width: `calc(100% * ${percentage})`,
        backgroundColor: fillColor,
        borderRadius: "15px"
    }

    return (
        <div style={progressBarClass}>
            <div style={innerBar}></div>
        </div>
    );
}

export default ProgressBar;
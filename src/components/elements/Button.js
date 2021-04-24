import React from 'react';

function Button({
    height,
    width,
    fontSize,
    text,
    handleClick
}) {
    const customClass = {
        "height": height,
        "width": width,
        "fontSize": fontSize,
    }

    return (
        <div 
            className="main-button" 
            style={customClass}
            onClick={e => handleClick(e)}>
            {text}
        </div>
    )
}

export default Button;

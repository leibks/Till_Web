import React from 'react';

function Button({
    height,
    width,
    fontSize,
    text,
    handleClick,
    borderRadius
}) {
    const customClass = {
        "height": height,
        "width": width,
        "fontSize": fontSize,
        "borderRadius": borderRadius
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

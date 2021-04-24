import React from 'react'

function InfoCard({
    cardTitle,
    contents
}) {
    return (
        <div className="info-card">
            <div className="card-header">{cardTitle}</div>
            <div className="card-content">
                {contents.map(content => {
                    return (
                        <div key={content.name} className="single-content">
                            <span>{content.name}</span>
                            <div className="content-text">{content.text}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

} 

export default InfoCard;
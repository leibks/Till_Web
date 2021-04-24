import React from 'react';
import BoyProfileSample from "../../assets/images/boy-profile-sample.svg";
import GirlProfileSample from "../../assets/images/girl-profile-sample.svg";

function UserNav({
    customStyles,
    user,
    userId,
    userType,
    isSelect,
    setSelectFunction
}) {

    return (
        <div 
            className={`user-nav ${customStyles}  ${isSelect ? "select-item" : ""}`}
            onClick={(e) => setSelectFunction(user)}
        >
            <div className={`user-img`}>
                <img 
                    alt={userId} 
                    src={user.gender === "MALE" ? BoyProfileSample : GirlProfileSample}>
                </img>
            </div>
            <div className="user-name"> 
                {user.firstName} {user.lastName} 
            </div>
        </div>
    )
}

export default UserNav;
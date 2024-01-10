import React from 'react';
import defaultPicture from '../assets/profile.png';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { user } = props;
    const { username, displayName, image } = user;
    let imageSource = defaultPicture;
    if(user.image){
        imageSource = user.image;
    }
    return (
        <Link to={`/user/${user.username}`} className='list-group-item list-group-item-action'>
            <img className='rounded-circle' width={32} height={32} alt={`${user.username} profile`} src={imageSource}></img>
           <span className='p-2'> 
           {displayName}@{username}
           </span>
            </Link>
    );
};

export default UserListItem;
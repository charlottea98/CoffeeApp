import React from 'react';
import classes from './profileView.module.scss';
import PrimaryButton from '../../common/buttons/PrimaryButton/PrimaryButton';
import SongCardPresenter from '../../common/SongCard/SongCardPresenter';
import ProfilePostsPresenter from './ProfilePostsPresenter';

import { DEFAULT_PROFILE_PICTURE_URL } from '../../../utility/utility';

interface Props {
    user: any;
    onClickEditProfile: any;
    numberOfposts: any;
    followers: any;
    following: any;
}

const ProfileView: React.FC<Props> = ({
    user,
    onClickEditProfile,
    numberOfposts,
    followers,
    following,
}) => {
    return (
        <div className={classes.ProfileViewContainer}>
            <div className={classes.ProfileView}>
                <div className={classes.profileInfoContainer}>
                    <img
                        className={classes.ProfileImg}
                        src={
                            user.profilePictureURL
                                ? user.profilePictureURL
                                : DEFAULT_PROFILE_PICTURE_URL
                        }
                        alt="Profile picture"
                    />

                    <div className={classes.profileInfo}>
                        <div className={classes.NameButtonContainer}>
                            <h2 className={classes.Name}>{user.username}</h2>

                            <div className={classes.Button}>
                                <PrimaryButton
                                    text="Edit profile"
                                    onButtonClick={onClickEditProfile}
                                    buttonColor="editProfileBtn"
                                />
                            </div>
                        </div>
                        
                        <ul className={classes.List}>
                            <li>
                                <b>{numberOfposts}</b> posts
                            </li>
                            <li>
                                <b>{followers}</b> followers
                            </li>
                            <li>
                                <b>{following}</b> following
                            </li>
                        </ul>

                        <div className={classes.Song}>
                            <SongCardPresenter songId={user.favoriteSong}></SongCardPresenter>
                        </div>

                        <div className={classes.About}>
                            <h3>{user.name}</h3>

                            <p>{user.biography}</p>
                        </div>
                    </div>
                </div>

                <ProfilePostsPresenter />
            </div>

            
        </div>
    );
};

export default ProfileView;

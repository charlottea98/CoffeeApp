import React, { useEffect, useState } from 'react';

import PostCardHomeView from './PostCardHomeView';
import PostCardDiscoverView from './PostCardDiscoveryView';
import { Post, PostCardInfo } from '../../../utility/types';
import { getUserInfo, getSongInfo } from '../../../utility/firestoreCommunication';
import { SpotifyAPI } from '../../../utility/spotifyCommunication';



interface Props {
    postInfo: Post,
    pageToViewOn: "home page" | "discovery page"
}

const PostCardPresenter : React.FC<Props> = ({pageToViewOn, postInfo}) => {
    const [postCardInfo, setPostCardInfo] = useState<PostCardInfo | undefined>(undefined);
    const [currentLoggedInUserLikesPost, setCurrentLoggedInUserLikesPost] = useState<boolean>(false);

    let postCardView;

    useEffect(() => {
        getUserInfo(postInfo.postedBy)
            .then(publisherInfo => {
                let infoAboutPublisher = {
                    profilePicture: publisherInfo?.profilePictureURL,
                    username: publisherInfo?.username
                };

                getSongInfo(postInfo.song)
                    .then(songInfo => {
                        SpotifyAPI.getArtistDetails(songInfo?.artists[0])
                            .then(artistInfo => {
                                let infoAboutSong = {
                                    title: songInfo?.title,
                                    artists: [artistInfo.name],
                                    albumCover: songInfo?.albumCoverMediumURL,
                                }
                                setPostCardInfo({
                                    caption: postInfo.caption,
                                    rating: postInfo.rating,
                                    tags: postInfo.tags,
                                    postImageURL: postInfo.postImageURL,
                                    songTitle: infoAboutSong.title, 
                                    artists: infoAboutSong.artists, 
                                    albumCover: infoAboutSong.albumCover,
                                    usernameOfPublisher: infoAboutPublisher.username,
                                    profilePictureOfPublisher: infoAboutPublisher.profilePicture,
                                    likes: postInfo.likes,
                                    comments: postInfo.comments,
                                    date: postInfo.date,
                                })
                            })
                    })
            });
    }, []);
    
    const likeButtonClickHandler = () => {
        setCurrentLoggedInUserLikesPost(!currentLoggedInUserLikesPost);
    }

    if (pageToViewOn === 'home page') {
        postCardView = (
            <PostCardHomeView 
                postCardInfo = {postCardInfo} 
                currentLoggedInUserLikesPost = {currentLoggedInUserLikesPost}
                likeButtonClickHandler = {likeButtonClickHandler}
            />
        );
    } else { // pageToViewOn === 'discovery page'
        postCardView = <PostCardDiscoverView postCardInfo={postCardInfo} />;
    }

    return postCardView;
}

export default PostCardPresenter;
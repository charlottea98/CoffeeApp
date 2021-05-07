import React from 'react';
import { Post } from '../../../utility/types';
import classes from './postCard.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComments as farFaComments } from '@fortawesome/free-regular-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';

import ThreeDotsButton from '../../common/buttons/ThreeDotsButton/ThreeDotsButtonPresenter';
import SongCard from '../SongCard/SongCardPresenter';
import { useLoggedInUser } from '../../../contexts/LoggedInUserContext';

interface Props {
    postCardInfo: Post | undefined,
    changeViewPost: Function,
    viewPost: any
}

const PostCardDiscoveryView : React.FC<Props> = ({postCardInfo, changeViewPost, viewPost}) => {
    const loggedInUser = useLoggedInUser();

    let filledRatingArray:any = [];
    let nonFilledRatingArray:any = [];

    if (postCardInfo) {
        for (let i = 0; i < postCardInfo.rating; i++) {
            filledRatingArray.push(i);
        }

        for (let i = postCardInfo.rating; i < 5; i++) {
            nonFilledRatingArray.push(i);
        }
    }

    return loggedInUser && postCardInfo ? (
        <div className={classes.PostCardDiscovery}>
            <div className={classes.layer1}>
                <div className={classes.publisherInfoContainer}>
                    <img src={postCardInfo?.profilePictureOfPublisher} />
                    {postCardInfo?.usernameOfPublisher}
                </div>
                <div className={classes.viewPost} onClick={()=> {changeViewPost()}}>
                    {viewPost?(
                        <p>Close post</p>
                    ):(
                    <p>View post</p>
                    )}
                </div>
            </div>
            <div 
                className={classes.postImage}
                style = {{
                    "backgroundImage": `url(${postCardInfo?.postImageURL})`
                }}
            />
            <SongCard song = {postCardInfo?.song} />

            <div className={classes.reviewContainer}>
                <div className={classes.ratingContainer}>
                    {
                        filledRatingArray.map(() => (
                            <div>
                                <FontAwesomeIcon icon={faMusic} color="#FEC46E" />
                            </div>
                        ))
                    }
                    {
                        nonFilledRatingArray.map(() => (
                            <div>
                                <FontAwesomeIcon icon={faMusic} color="#FEC46E" opacity="0.25" />
                            </div>
                        ))
                    }
                </div>
                <div className={classes.tagsContainer}>
                    {
                        postCardInfo?.tags.map(tag => (
                            <div className={classes.tag}>{tag}</div>
                        ))
                    }
                </div>
            </div>
            {viewPost?(
                <div className={classes.interactionContainer}>
                <div className={classes.likeAndCommentContainer}>
                    <div
                        style = {{
                            "color": postCardInfo.likes.includes(loggedInUser.email) ? "#fec46e" : "#232323"
                        }}
                        onClick = {() => console.log(loggedInUser.email, postCardInfo.id)}
                    >
                        <FontAwesomeIcon icon={postCardInfo.likes.includes(loggedInUser.email) ? faHeart : farFaHeart} />
                    </div>
                    <div><FontAwesomeIcon icon={farFaComments} /></div>
                </div>
                <div className={classes.numberOfLikes}>{postCardInfo?.likes} likes</div>

                <div className={classes.captionAndComments}>
                    <div>
                        <span className={classes.userNameInComment}>{postCardInfo?.usernameOfPublisher}</span>
                        {postCardInfo?.caption}
                    </div>
                    
                    <div>
                        <span className={classes.userNameInComment}>johanlam</span>
                        Cool bild!⭐
                    </div>

                    <div>
                        <span className={classes.userNameInComment}>isakpet</span>
                        Niiiice låt🎵
                    </div>

                    {/* {postCardInfo?.comments.map(comment => (
                        <div>
                        <span className={classes.userNameInComment}>{comment.postedBy}</span>
                        {comment.comment}
                    </div>
                    ))} */}
                </div>
            </div>
            ):(<div></div>)}
            
        </div>
    ) : null;
}

export default PostCardDiscoveryView;
import React from 'react';
import classes from './publishPage.module.scss';
import { faSearch, faPlusCircle, faMusic} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongCardPresenter from '../../common/SongCard/SongCardPresenter';
import ImageUploaderPresenter from '../../common/FileUploader/ImageUploaderPresenter';

interface Props {
    isSearching: any,
    switchSearchMode: Function,
    searchSong: Function,
    songPostId: string,
    handleChange: Function,
    searchInput: any,
    captionInput:any,
    tagsArray:String[],
    imageURL:any,
    ratingInput:any,
    handleSubmit:Function,
    errorMessage:any,
    handleCancel:Function,
    addToTags: Function,
    tagsInput: string,
    handlePostPictureChange: (imageURL: string) => void,
    searchResults:any[],
    typing: boolean,
    handleClose: Function
}

const PublishPageView : React.FC<Props> = ({
    isSearching, 
    switchSearchMode, 
    searchSong, 
    songPostId, 
    handleChange, 
    searchInput, 
    captionInput, 
    tagsArray,
    imageURL, 
    ratingInput, 
    handleSubmit, 
    errorMessage, 
    handleCancel, 
    addToTags,
    tagsInput,
    handlePostPictureChange,
    searchResults,
    typing,
    handleClose
}) => {
    const ratings = [1, 2, 3, 4, 5];

    return <div className={classes.mainDiv}>
        <div className={classes.title}>
            Create post
        </div>
        <div className={classes.postBox}>
            <div className={classes.postImage}>
                <div className={classes.headers}>Post picture</div>
                {/* <input className={classes.input} onChange={e => {handleChange(e, 'image');}}/> */}
                <ImageUploaderPresenter onFileChange={handlePostPictureChange} imageCategory="posts" />

            </div>
            <div className={classes.postCaption}>
                <div className={classes.headers}>Caption</div>
                <input className={classes.input} onChange={e => {handleChange(e,'caption');}}/>
            </div>
            <div className={classes.headers}>Tags</div>
            <div className={classes.postSong}>
                <div className={classes.addTags}>
                    <input 
                        type="text" 
                        className={classes.input}
                        onChange={e => handleChange(e,'tags')}
                        value={tagsInput}
                    />
                    <div className={classes.icon}>
                        <FontAwesomeIcon icon={faPlusCircle} onClick={()=>{addToTags()}} cursor='pointer' size='1x'></FontAwesomeIcon>
                    </div>
                </div>
                <div className={classes.tagsContainer}>
                    {tagsArray.map((tag, idx) => (
                        <div className={classes.tag} key={idx}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className={classes.headers}>Song</div>
                {isSearching?(
                    <div className={classes.showSong}>
                        <SongCardPresenter songId = {songPostId} />
                        <div className={classes.songButton} onClick={()=>switchSearchMode()}>Change song</div>
                    </div>
                ):(
                <div className={classes.hideSong}>
                    {typing ? (
                         <div className={classes.outsideContainer} onClick={()=>handleClose()}/>
                    ): (null)}
                    <input className={classes.input} onChange={e => {handleChange(e,'song');}} onClick={e=>{ handleChange(e,'song');}}/>
                    {typing ? (
                        <div className={classes.SearchResultsList}>
                        {searchResults.map(result => {
                            return <div className={classes.SearchListItems} onClick={()=> searchSong(result.id)}>
                                <img src={result.albumImage} className={classes.SearchItemImage}></img>
                                <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                                <div className={classes.SearchItemTitle}>
                                    {result.title}
                                </div>
                                {console.log(result)}
                            </div>
                        })}
                        </div>
                    ):(
                        null
                    )}
                    </div>
                )}
            </div>
            <div className={classes.postRatings}>
                {ratings.map((rating, idx) => (
                    <div 
                        key = {idx}
                        className={classes.ratingsButton}
                        tabIndex={rating}
                        onClick={() => handleChange(rating, 'rating')}
                    >{rating}</div>
                )
                )}
            </div>
            <div className={classes.postPublish}>
                <div className={classes.cancelButton} onClick={()=>handleCancel()}>Cancel</div>
                <div className={classes.publishButton} onClick={()=>handleSubmit(imageURL, captionInput, songPostId, ratingInput, tagsArray)}>Publish</div>
            </div>
        </div>
        {
            errorMessage!==''?(
                <div className={classes.publishedInfo}>
                    {errorMessage}
                </div>
            ):(
                <div>
                </div>
            )
        }
    </div>;
}

export default PublishPageView;
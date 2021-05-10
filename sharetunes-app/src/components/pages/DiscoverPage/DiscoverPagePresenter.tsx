import React, { useEffect, useState } from 'react';
import { useLoggedInUser, useLoggedInUserUpdate } from '../../../contexts/LoggedInUserContext';
import LogoutButton from '../../common/buttons/LogoutButton/LogoutButton';
import firestore from '../../../firestore';
import { SpotifyAPI } from '../../../utility/spotifyHandler';
import { DatabaseHandler } from '../../../utility/databaseHandler';

import classes from './discoverPage.module.scss';
import DiscoverPageView from './DiscoverPageView';
import { useDatabase } from '../../../contexts/DatabaseContext';
import { faMusic} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ProgressLoader} from '../../common/ProgressLoader/ProgressLoader';

const DiscoverPage: React.FC = () => {
    const loggedInUser = useLoggedInUser();
    const [loading, setLoading] = useState<boolean>(false);
    const { posts } = useDatabase();
    const [topSongs, setTopSongs] = useState<string[]>([]);
    const [recommendedSongs, setRecommendedSongs] = useState<string[]>([])

    const getSpotifyPopularPlaylist = () => {
        SpotifyAPI.getPlaylistDetails('37i9dQZEVXbMDoHDwVN2tF').then(body => {
            let tracks = body?.tracks?.items;
            let topTracks = [];
            let countValidTracks = 0;

            if (tracks !== undefined) {
                for (var i = 0; countValidTracks < 5; i++) {
                    if (tracks[i]?.track.preview_url) {
                        topTracks.push(tracks[i]?.track.id);
                        DatabaseHandler.addNewSong(tracks[i]?.track.id);
                        countValidTracks++;
                    }
                }
                setTopSongs(topTracks);
            }
        });

        SpotifyAPI.getPlaylistDetails('37i9dQZF1DXcecv7ESbOPu').then(body => {
            let tracks = body?.tracks?.items;
            let recommendedTracks = [];
            let countValidTracks = 0;

            if (tracks !== undefined) {
                for (var i=0; countValidTracks < 5; i++) {
                    if (tracks[i]?.track.preview_url){
                        recommendedTracks.push(tracks[i]?.track.id);
                        DatabaseHandler.addNewSong(tracks[i]?.track.id);
                        countValidTracks++;
                    }
                }
                setRecommendedSongs(recommendedTracks);
            }
        })
    };

    const sortDatabse = () => {
        posts.sort(function(a,b){return b.likes.length - a.likes.length});
        setTimeout(()=>{setLoading(false);}, 5000);
    }

    useEffect(() => {
        setLoading(true);
        getSpotifyPopularPlaylist();
        sortDatabse();
    }, []);

    return (
        <div className={classes.DiscoverPage}>
            {loading ? (
                <div className={classes.loader}>
                    <FontAwesomeIcon icon={faMusic} className={classes.loadericon}></FontAwesomeIcon>
                </div>
            ): (
                <>
                <DiscoverPageView user={loggedInUser} 
                posts={posts} 
                topSongs={topSongs} 
                recommendedSongs={recommendedSongs}
                    />
                <LogoutButton/>
                </>
            )}
        </div>
    );
};

export default DiscoverPage;

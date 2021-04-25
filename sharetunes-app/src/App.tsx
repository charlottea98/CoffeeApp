import React, { useEffect, useState } from 'react';
import LoginPage from './components/pages/LoginPage/LoginPage';
import firestore from './firestore';
import firebase from 'firebase';

import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PublishButton from './components/common/buttons/PrimaryButton/PrimaryButton';
import LogInButton from './components/common/buttons/SecondaryButton/secondaryButton';
import Menu from './components/common/Menu/Menu';
import DiscoverPage from './components/pages/DiscoverPage/DiscoverPage';
import ProfilePage from './components/pages/ProfilePage/ProfilePage';
import FeedPage from './components/pages/HomePage/HomePage';

import LoggedInUserProvider from './contexts/LoggedInUserContext';

const App: React.FC = () => {
    const [profileData, setProfileData] = useState<Object>({});
    const [user, setUser] = useState<string | firebase.User>('');

    useEffect(() => {
        firestore
            .collection('users')
            .get()
            .then((snapshot) => {
                // console.log(snapshot.docs);
                snapshot.docs.forEach((doc) => {
                    // console.log(doc.data());
                    setProfileData(doc.data());
                });
            });
    }, []);

    return (
        <LoggedInUserProvider>
            <Router>
                <Switch>
                    <Route exact path='/discover'>
                        <Menu />
                        <DiscoverPage />
                    </Route>
                    <Route exact path="/profile">
                        <Menu />
                        <ProfilePage userObj={profileData} />
                    </Route>
                    <Route exact path="/feed">
                        <Menu />
                        <FeedPage />
                    </Route>
                    <Route exact path={['/', '/login']}>
                    <LoginPage user = {user} setUser = {setUser}/>      
                    </Route>
                </Switch>
            </Router>
        </LoggedInUserProvider>
    );
};

export default App;
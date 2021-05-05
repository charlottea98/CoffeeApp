import React from 'react';
import { useHistory } from 'react-router';
import MessageToUserPage from './MessageToUserPagePresenter';

const PageNotFoundPresenter: React.FC = () => {
    const history = useHistory();

    return (
        <MessageToUserPage 
            emotion="sad" 
            message="The page you're looking for doesn't exist!"
            actionButtonFunc = {() => {
                history.push('/login')
            }}
            actionButtonText = "Take me to the login page"
        />
    )
}

export default PageNotFoundPresenter;
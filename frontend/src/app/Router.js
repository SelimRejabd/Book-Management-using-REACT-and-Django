import React from 'react';
import { createBrowserRouter } from '@curi/react-dom';
import HomeScreen from './screens/HomeScreen';


const Router = () => {
    const router = createBrowserRouter([
        {
            path : '/',
            element : <HomeScreen />
        }
    ])
    return (
        <div>
            
        </div>
    );
};

export default Router;
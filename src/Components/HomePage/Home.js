import React from 'react';
import AddApost from '../AddAPost/AddApost';
import Allposts from '../AllPosts/Allposts';
import TopPost from '../TopPost/TopPost';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <AddApost></AddApost>
            <TopPost></TopPost>
            <Allposts></Allposts>
        </div>
    );
};

export default Home;
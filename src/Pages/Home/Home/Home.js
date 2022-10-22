import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummury from '../../Shared/NewsSummury/NewsSummury';

const Home = () => {
    const allNews = useLoaderData();
    return (
        <div>
            <h2>This is Home Component {allNews.length}</h2>
            {
                allNews.map(news => <NewsSummury
                key={news._id}
                news={news}
                ></NewsSummury>)
            }
        </div>
    );
};

export default Home;
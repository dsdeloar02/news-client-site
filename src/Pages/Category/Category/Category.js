import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummury from '../../Shared/NewsSummury/NewsSummury';

const Category = () => {
    const allNews = useLoaderData();
    return (
        <div>
            <h2>This is Category{allNews.length}</h2>
            {
                allNews.map(news => <NewsSummury
                key={news._id}
                news={news}
                ></NewsSummury>)
            }
        </div>
    );
};

export default Category;
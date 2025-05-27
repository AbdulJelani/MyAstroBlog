import React, { useEffect, useState } from 'react';
import './BlogList.css'

export default function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://public-api.wordpress.com/wp/v2/sites/abdulblog28.wordpress.com/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            });
    }, []);

    function stripHtml(html) {
        return html.replace(/<[^>]*>/g, '');
    }

    function truncateText(text, maxLength = 30) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    }

    return (
        <div className="subContainer">
            {posts.map(item => {
                const excerptText = stripHtml(item.excerpt.rendered);
                const shortExcerpt = truncateText(excerptText, 100);
                const featuredImage = item?.jetpack_featured_media_url || 'https://picsum.photos/seed/picsum/200/300';
                return (
                    <div
                        key={item.id}
                        className="mainCard"
                        onClick={() => window.location.href = `/blog/${item.id}`}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            id="image"
                            src={featuredImage}
                            alt={item.title.rendered}
                            loading="lazy"
                        />
                        <div className="text">
                            <h2 dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h2>
                            <p id="shortText">{shortExcerpt}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

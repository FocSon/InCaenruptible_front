import React from 'react';
import "./Post.css";

const Post = (properties) => {
    const {title, content} = properties;

    return (
        <div>
            <div className="post-content">
                <div className="media"/>

                <div className="text">
                    <h1>{title}</h1>
                    <h4>{content}</h4>
                </div>
            </div>

            <div className="post-separateur"/>
        </div>
    );
};

export default Post;

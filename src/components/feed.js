import React from "react";
import {Link} from "react-router-dom";
import TagList from "components/tagList";

const Feed = ({ articles }) => {
    return (
        <div>
            {articles.map((article, index) => (
                <div className="article-preview" key={index}>
                    <div className="article-meta">
                        <Link to={`/profiles/${article.author.username}`}>
                            <img src={article.author.image} alt="img" />
                        </Link>
                        <div className="info">
                            <Link
                                className="author"
                                to={`/profiles/${article.author.username}`}
                            >
                                {article.author.username}
                            </Link>
                            <span className="date">{article.createdAt}</span>
                        </div>
                    </div>
                    <Link to={`/profiles/${article.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>
                        <TagList tags={article.tagList} />
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Feed;
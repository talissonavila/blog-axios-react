import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import blogFetch from "../axios/config"

import "./Post.css"

const Post = () => {
    const { id } = useParams();

    const [posts, setPosts] = useState({});

    const getPost = useCallback(async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`);
            const data = response.data;
            setPosts(data);
        } catch (error) {
            console.log(error)
        }
    }, [id])

    useEffect(() => {
        getPost();
    }, [getPost]);


    return (
        <div className="post-container">
            {!posts.title ? (
                <p>Carregando...</p>
            ) : (
                <div className="post">
                    <h2>{posts.title}</h2>
                    <p>{posts.body}</p>
                </div>
            )}
        </div>
    )
}

export default Post
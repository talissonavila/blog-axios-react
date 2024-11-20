import { useState } from "react";
import { useNavigate } from "react-router-dom";

import blogFetch from "../axios/config";

import "./NewPost.css"

const NewPost = () => {
    const navigate = useNavigate();

    const [title, setTtitle] = useState('');
    const [body, setBody] = useState('');

    const createPost = async (event) => {
        event.preventDefault();

        const post = { title, body, userId: 1}
        
        await blogFetch.post("/posts", {
            body: post,
        });
        
        navigate("/");
    };

    return (
        <div className="new-post">
            <h2>Inserir novo post: </h2>
            <form onSubmit={(event) => createPost(event)}>
                <div className="form-control">
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Digite aqui o título do post"
                        onChange={(event) => setTtitle(event.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Conteúdo:</label>
                    <textarea
                        type="text"
                        name="body"
                        id="body"
                        placeholder="Digite aqui o conteúdo do post"
                        onChange={(event) => setBody(event.target.value)}
                    />
                </div>
                <input type="submit" value="Criar Post" className="btn" />
            </form>
        </div>
    )
}

export default NewPost
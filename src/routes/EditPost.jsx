import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import blogFetch from "../axios/config";

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const { id } = useParams();

    const getPost = useCallback(async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`)
            const data = response.data
            setTitle(data.title);
            setBody(data.body)
        } catch (error) {
            console.log(error)
        }
    }, [id]);

    const editPost = async (e) => {
        e.preventDefault();
        const post = {title, body, userId: 1}
        await blogFetch.put(`/posts/${id}`, {
            body: post,
        })
    }

    useEffect(() => {
        getPost();
    }, [getPost])

    return (
        <div className="edit-post">
            <h2>Editando: {title}</h2>
            <form onSubmit={(event) => editPost(event)}>
                <div className="form-control">
                    <label htmlFor="title">Título: </label>
                    <input 
                    type="text" 
                    name="title" 
                    id="title" placeholder="Insira aqui o título" 
                    onChange={(event) => setTitle(event.target.value)}
                    value={title || ""}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Conteúdo: </label>
                    <textarea 
                    name="body" 
                    id="body" 
                    placeholder="Insira aqui o conteúdo"
                    onChange={(event) => setBody(event.target.value)}
                    value={body || ""}
                    ></textarea>
                </div>
                <input type="submit" className="btn" value="Editar post"/>
            </form>
        </div>
    )
}

export default EditPost
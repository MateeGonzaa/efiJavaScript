import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api/posts";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { showError, showSuccess } from "../components/ToastProvider";

export default function PostsList() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      showError("Error", "No se pudieron cargar los posts");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este post?")) return;
    try {
      await deletePost(id);
      showSuccess("Eliminado", "Post eliminado correctamente");
      loadPosts();
    } catch {
      showError("Error", "No se pudo eliminar");
    }
  };

  return (
    <div className="p-4 grid">
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.titulo}
          subTitle={`Categoría: ${post.categoria}`}
          className="col-12 md:col-4 m-2"
        >
          <p>{post.contenido}</p>
          <div className="flex justify-content-between mt-3">
            <Link to={`/posts/${post.id}`} className="p-button p-button-text">Ver</Link>
            <Button label="Eliminar" className="p-button-danger" onClick={() => handleDelete(post.id)} />
          </div>
        </Card>
      ))}
    </div>
  );
}

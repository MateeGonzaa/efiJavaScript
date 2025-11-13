// src/pages/PostDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPostById } from "../api/posts";
import { getReviewsByPost, addReview, deleteReview } from "../api/reviews";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { showSuccess, showError } from "../components/ToastProvider";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const loadPost = async () => {
    setLoadingPost(true);
    try {
      const data = await getPostById(id);
      setPost(data);
    } catch (err) {
      console.error(err);
      showError("Error", "No se pudo cargar el post");
    } finally {
      setLoadingPost(false);
    }
  };

  const loadReviews = async () => {
    setLoadingReviews(true);
    try {
      const data = await getReviewsByPost(id);
      setReviews(data || []);
    } catch (err) {
      console.error(err);
      showError("Error", "No se pudieron cargar los comentarios");
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadPost();
    loadReviews();
    // eslint-disable-next-line
  }, [id]);

  const onAddReview = async (formData) => {
    if (!isAuthenticated) {
      showError("Acceso", "Debes iniciar sesión para comentar");
      navigate("/login");
      return;
    }
    const payload = {
      contenido: formData.contenido,
      autor: user?.email || "Anónimo",
    };
    setSubmitting(true);
    try {
      await addReview(id, payload);
      showSuccess("Comentario agregado", "Gracias por tu aporte");
      reset();
      loadReviews();
    } catch (err) {
      console.error(err);
      showError("Error", "No se pudo agregar el comentario");
    } finally {
      setSubmitting(false);
    }
  };

  const onDeleteReview = async (reviewId) => {
    if (!confirm("¿Eliminar este comentario?")) return;
    try {
      await deleteReview(reviewId);
      showSuccess("Eliminado", "Comentario eliminado");
      loadReviews();
    } catch (err) {
      console.error(err);
      showError("Error", "No se pudo eliminar el comentario");
    }
  };

  if (loadingPost) {
    return (
      <div className="flex justify-content-center align-items-center p-6">
        <ProgressSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-4">
        <h3>Post no encontrado</h3>
        <Button label="Volver" icon="pi pi-arrow-left" onClick={() => navigate(-1)} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card title={post.titulo} subTitle={`Categoría: ${post.categoria}`}>
        <p>{post.contenido}</p>
        <div className="flex gap-2 mt-3">
          <Button label="Volver" icon="pi pi-arrow-left" onClick={() => navigate(-1)} />
          <Link to={`/`} className="p-button p-button-text">
            Ir al inicio
          </Link>
        </div>
      </Card>

      <div className="mt-4">
        <Card title="Comentarios">
          {loadingReviews ? (
            <div className="flex justify-content-center">
              <ProgressSpinner />
            </div>
          ) : (
            <>
              {reviews.length === 0 && <p>No hay comentarios aún. Sé el primero.</p>}
              <div className="grid">
                {reviews.map((r) => (
                  <div key={r.id} className="col-12 md:col-6">
                    <Card className="mb-3" title={r.autor || "Anónimo"}>
                      <p>{r.contenido}</p>
                      <div className="flex justify-content-end">
                        {/* Solo permitir eliminar si sos admin o autor (simple check por email) */}
                        {(user?.email === r.autor || user?.role === "admin") && (
                          <Button
                            icon="pi pi-trash"
                            className="p-button-danger p-button-sm"
                            onClick={() => onDeleteReview(r.id)}
                          />
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Agregar comentario">
          <form onSubmit={handleSubmit(onAddReview)} className="flex flex-column gap-3">
            <InputTextarea
              rows={4}
              placeholder="Escribe tu comentario..."
              {...register("contenido", { required: true })}
            />
            <div className="flex gap-2">
              <Button label="Comentar" icon="pi pi-comment" loading={submitting} />
              <Button
                label="Cancelar"
                className="p-button-secondary"
                type="button"
                onClick={() => reset()}
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../api/posts";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { showError, showSuccess } from "../components/ToastProvider";

export default function PostForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await createPost(data);
      showSuccess("Post creado", "Tu publicación fue creada correctamente");
      reset();
    } catch {
      showError("Error", "No se pudo crear el post");
    }
  };

  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card title="Nuevo Post" className="p-4 w-30rem">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
          <InputText placeholder="Título" {...register("titulo")} />
          <InputText placeholder="Categoría" {...register("categoria")} />
          <InputTextarea placeholder="Contenido" rows={5} {...register("contenido")} />
          <Button label="Publicar" icon="pi pi-send" />
        </form>
      </Card>
    </div>
  );
}

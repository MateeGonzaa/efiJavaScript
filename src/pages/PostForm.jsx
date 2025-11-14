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

  // AQUÍ ESTÁ EL CAMBIO:
  // Mantenemos async/await y el try/catch,
  // pero agregamos la lógica de conversión de tu snippet.
  const onSubmit = async (data) => {
    
    // 1. Preparamos los datos para enviar
    const dataToSend = {
      ...data,
      // 2. Convertimos el campo 'categoria' a número
      // (En tu form usas 'categoria', no 'category_id')
      categoria: parseInt(data.categoria, 10),
    };

    try {
      // 3. Enviamos los datos corregidos (dataToSend)
      await createPost(dataToSend);
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
          {/* Este es el campo que estamos convirtiendo: */}
          <InputText placeholder="Categoría" {...register("categoria")} />
          <InputTextarea placeholder="Contenido" rows={5} {...register("contenido")} />
          <Button label="Publicar" icon="pi pi-send" />
        </form>
      </Card>
    </div>
  );
}
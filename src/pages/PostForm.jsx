import React from "react";
import { useForm, Controller } from "react-hook-form";
import { createPost } from "../api/posts";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { showError, showSuccess } from "../components/ToastProvider";

export default function PostForm() {
  const { control, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const dataToSend = {
      ...data,
      category_id: parseInt(data.category_id, 10),
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

          <Controller
            name="titulo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <span className="p-float-label">
                <InputText id={field.name} {...field} />
                <label htmlFor={field.name}>Título</label>
              </span>
            )}
          />

          
          <Controller
            name="category_id" 
            control={control}
            defaultValue=""
            render={({ field }) => (
              <span className="p-float-label">
                <InputText id={field.name} {...field} />
                <label htmlFor={field.name}>ID de Categoría</label>
              </span>
            )}
          />

          
          <Controller
            name="contenido"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <span className="p-float-label">
                <InputTextarea
                  id={field.name}
                  {...field}
                  rows={5}
                  autoResize
                />
                <label htmlFor={field.name}>Contenido</label>
              </span>
            )}
          />

          <Button label="Publicar" icon="pi pi-send" type="submit" />
        </form>
      </Card>
    </div>
  );
}
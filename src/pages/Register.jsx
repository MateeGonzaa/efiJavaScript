import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/auth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { showSuccess, showError } from "../components/ToastProvider";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      showSuccess("Registro exitoso", "Ahora puedes iniciar sesión");
      reset();
    } catch {
      showError("Error", "No se pudo registrar el usuario");
    }
  };

  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card title="Registro de usuario" className="p-4 w-20rem">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
          <span className="p-float-label">
            <InputText id="name" {...register("name")} />
            <label htmlFor="name">Nombre</label>
          </span>
          <span className="p-float-label">
            <InputText id="email" {...register("email")} />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label">
            <Password id="password" {...register("password")} feedback={false} />
            <label htmlFor="password">Contraseña</label>
          </span>
          <Button label="Registrar" icon="pi pi-user-plus" />
        </form>
      </Card>
    </div>
  );
}

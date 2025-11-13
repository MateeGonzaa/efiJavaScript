import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/auth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { showSuccess, showError } from "../components/ToastProvider";
import "../styles/theme.css";

export default function Register() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      showSuccess("Registro correcto", "Ya puedes iniciar sesión");
      reset();
    } catch {
      showError("Error", "No se pudo registrar");
    }
  };

  return (
    <div className="auth-container">
      <Card title="Registro" className="auth-card">
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <InputText placeholder="Nombre" {...register("name")} />
          <InputText placeholder="Email" {...register("email")} />
          <Password placeholder="Contraseña" {...register("password")} feedback={false} />
          <Button label="Registrar" className="p-button-rounded p-button-primary" />
        </form>
      </Card>
    </div>
  );
}

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { registerUser } from "../api/auth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { showSuccess, showError } from "../components/ToastProvider";
import "../styles/theme.css";

export default function Register() {
  const { register, handleSubmit, reset, control } = useForm();

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
          <InputText placeholder="Nombre de usuario" {...register("username")} />
          <InputText placeholder="Email" {...register("email")} />

          <Controller
            name="password"
            control={control}
            rules={{ required: true }} 
            render={({ field }) => (
              <Password 
                placeholder="Contraseña" 
                {...field} 
                feedback={false} 
              />
            )}
          />
          
          <Button label="Registrar" className="p-button-rounded p-button-primary" />
        </form>
      </Card>
    </div>
  );
}
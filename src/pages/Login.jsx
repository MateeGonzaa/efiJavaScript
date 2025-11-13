import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { showError, showSuccess } from "../components/ToastProvider";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      login(res.access_token);
      showSuccess("Inicio exitoso", "Bienvenido!");
      navigate("/");
    } catch {
      showError("Error", "Credenciales incorrectas");
    }
  };

  return (
    <div className="flex justify-content-center align-items-center h-screen">
      <Card title="Iniciar sesión" className="p-4 w-20rem">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
          <span className="p-float-label">
            <InputText id="email" {...register("email")} />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label">
            <Password id="password" {...register("password")} feedback={false} />
            <label htmlFor="password">Contraseña</label>
          </span>
          <Button label="Ingresar" icon="pi pi-sign-in" />
        </form>
      </Card>
    </div>
  );
}

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
import "../styles/theme.css";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      login(res.access_token);
      showSuccess("Bienvenido", "Inicio de sesión correcto");
      navigate("/");
    } catch {
      showError("Error", "Credenciales inválidas");
    }
  };

  return (
    <div className="auth-container">
      <Card title="Iniciar sesión" className="auth-card">
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <span className="p-float-label">
            <InputText id="email" {...register("email")} />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label">
            <Password id="password" {...register("password")} feedback={false} />
            <label htmlFor="password">Contraseña</label>
          </span>
          <Button label="Ingresar" className="p-button-rounded p-button-primary" />
        </form>
      </Card>
    </div>
  );
}

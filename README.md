# MyL

---

## Repositorios del Proyecto

El proyecto está dividido en un **Frontend** (JavaScript/React) y un **Backend** (API REST con Flask/Python).

| Componente | Descripción | Enlace al Repositorio |
| :--- | :--- | :--- |
| **Frontend** (Interfaz de Usuario) | Desarrollado con JavaScript (React + Vite - PrimeReact). | 🔗 [Repositorio Frontend (JavaScript)](https://github.com/MateeGonzaa/efiJavaScript.git) |
| **Backend** (API Flask) | Sistema de **autenticación, publicaciones y comentarios** gestionado por una **API REST** con **Flask**. | 🔗 [Repositorio Backend (Flask)](https://github.com/Lucasaruza17/efiPython2.git) |

---

---

## Tecnologías Principales

- **React + Vite**
- **PrimeReact** (componentes UI)
- **JWT Decode**
- **React Router DOM**
- **Context API** (manejo de sesión)
- **localStorage**

---

---
## Guía de Instalación y Ejecución

### 1. Clonar los repositorios
Clona tanto el **backend** (Flask) como el **frontend** (JavaScript):

# Clonar backend (API Flask)
git clone [https://github.com/Lucasaruza17/efiPython2.git](https://github.com/Lucasaruza17/efiPython2.git)
cd efiPython2

# Clonar frontend (JavaScript)
git clone [https://github.com/MateeGonzaa/efiJavaScript.git](https://github.com/MateeGonzaa/efiJavaScript.git)
cd efiJavaScript

### 2. Configurar el entorno de Backend (Flask)
Crea y activa un entorno virtual (recomendado):

python -m venv venv
source venv/bin/activate  # En Linux/Mac
venv\Scripts\activate     # En Windows

# Instala las dependencias del backend:
pip install -r requirements.txt

#Si es necesario, instala dependencias específicas que puedan faltar:
pip install flask-login

### 3. Configurar la base de datos
Inicia XAMPP u otro servicio y activa MySQL.

Ingresa a tu gestor de bases de datos (ej. http://localhost/phpmyadmin).

Crea una base de datos llamada:
efiPythonMyL

# Ejecuta las migraciones desde la carpeta del backend (efiPython2):

flask db migrate -m "creación de tablas iniciales"
flask db upgrade

### 4. Ejecutar el servidor Flask
Desde la carpeta del backend (efiPython2):
flask run

Por defecto, el backend se iniciará en:

[http://127.0.0.1:5000](http://127.0.0.1:5000)

### 5. Ejecutar el frontend (JavaScript)
Desde la carpeta del frontend (efiJavaScript):

Bash

npm install
npm run dev
# O el comando de ejecución configurado para el proyecto (ej. npm start)
Por defecto, la interfaz de usuario se abrirá en (el puerto puede variar, ej. 5173, 3000):

http://localhost:5173

# 6. ¡Listo!
Una vez que ambos servidores estén activos, ya podés acceder a MyL para registrar usuarios, iniciar sesión, crear publicaciones y dejar comentarios.

---
---

### 👥 Integrantes del Equipo

| Nombre Completo | Usuario de GitHub |
| :--- | :--- |
| Mateo Gonzalez | [@MateeGonzaa](https://github.com/MateeGonzaa) |
| Lucas Aruza | [@Lucasaruza17](https://github.com/Lucasaruza17) |

---

# MyL

## 👥 Integrantes del Equipo

| Nombre Completo | Usuario de GitHub |
| :--- | :--- |
| Mateo Gonzalez | [@MateeGonzaa](https://github.com/MateeGonzaa) |
| Lucas Aruza | [@Lucasaruza17](https://github.com/Lucasaruza17) |

---

## 🌐 Repositorios del Proyecto

El proyecto está dividido en un **Frontend** (JavaScript/React) y un **Backend** (API REST con Flask/Python).

| Componente | Descripción | Enlace al Repositorio |
| :--- | :--- | :--- |
| **Frontend** (Interfaz de Usuario) | Desarrollado con JavaScript (probablemente React o similar). | 🔗 [Repositorio Frontend (JS)](https://github.com/MateeGonzaa/efiJavaScript.git) |
| **Backend** (API Flask) | Sistema de **autenticación, publicaciones y comentarios** gestionado por una **API REST** con **Flask**. | 🔗 [Repositorio Backend (Flask)](https://github.com/Lucasaruza17/efiPython2.git) |

---

## 🚀 Guía de Instalación y Ejecución

### 🧩 1. Clonar los repositorios
Clona tanto el **backend** (Flask) como el **frontend** (JavaScript):

```bash
# Clonar backend (API Flask)
git clone [https://github.com/Lucasaruza17/efiPython2.git](https://github.com/Lucasaruza17/efiPython2.git)
cd efiPython2

# Clonar frontend (JavaScript)
git clone [https://github.com/MateeGonzaa/efiJavaScript.git](https://github.com/MateeGonzaa/efiJavaScript.git)
cd efiJavaScript

python -m venv venv
source venv/bin/activate  # En Linux/Mac
venv\Scripts\activate     # En Windows

pip install -r requirements.txt

# Ejemplo, si no está en requirements.txt
pip install flask-login

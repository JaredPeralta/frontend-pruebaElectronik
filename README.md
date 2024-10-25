# Frontend - API de Imágenes Favoritas

## Descripción

Este proyecto es el frontend de una aplicación que permite a los usuarios explorar imágenes, marcarlas como favoritas y sincronizarlas con su cuenta cuando inician sesión. Los usuarios no autenticados también pueden guardar imágenes en el localStorage que se sincronizan al iniciar sesión.

## Características

- **Exploración de imágenes:** El usuario puede explorar imágenes mediante un scroll infinito.
- **Marcado de favoritos:** Los usuarios pueden marcar o desmarcar imágenes como favoritas. Los favoritos se guardan en localStorage para usuarios no autenticados.
- **Sincronización de favoritos:** Al iniciar sesión, los favoritos guardados en el localStorage se sincronizan con la base de datos.
- **Autenticación de usuario:** Funcionalidad de inicio y cierre de sesión utilizando JWT.

## Tecnologías

- **React** con **Next.js** para el frontend.
- **Axios** para realizar peticiones HTTP a la API del backend.
- **Tailwind CSS** o estilos en línea para el diseño.
- **Next/Image** para optimizar imágenes cargadas dinámicamente desde la API de Unsplash.

## Requisitos

- Node.js (>= 14.x)
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/frontend-imagenes-favoritas.git

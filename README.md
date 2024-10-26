# Frontend - API de Imágenes Favoritas

## Descripción

Este proyecto es el frontend de una aplicación que permite a los usuarios explorar imágenes, marcarlas como favoritas y sincronizarlas con su cuenta cuando inician sesión. Los usuarios no autenticados también pueden guardar imágenes en el localStorage que se sincronizan al iniciar sesión.

## Características

- **Registro y autenticacion de usuarios:** Se permite el registro de los nuevos usuarios (Contrasena entre 6 y 20 caracteres) y tambien la autenticacion del usuario mediante JWT.
- **Exploración de imágenes:** El usuario puede explorar imágenes mediante un scroll infinito.
- **Marcado de favoritos:** Los usuarios pueden marcar o desmarcar imágenes como favoritas. Los favoritos se guardan en localStorage para usuarios no autenticados.
- **Sincronización de favoritos:** Al iniciar sesión, los favoritos guardados en el localStorage se sincronizan con la base de datos.
- **Caché de Resultados:** Funcionalidad de busqueda y almacenaje en Caché de Resultados.

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
   git clone https://github.com/JaredPeralta/frontend-pruebaElectronik
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Variables de Entorno
Crear un archivo .env en la raíz del proyecto con las siguientes variables:

   ```bash
   Se puede usar la ruta de local host o la ruta del back desplegado:

   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   NEXT_PUBLIC_BACKEND_URL=https://boiling-reaches-39655-8ef592acfacd.herokuapp.com

   Credenciales de la api de unsplash:

   NEXT_PUBLIC_UNSPLASH_URL=https://api.unsplash.com
   NEXT_PUBLIC_UNSPLASH_TOKEN= <token>
   ```
## Uso

1. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre tu navegador en http://localhost:3000.

## Ruta del cliente desplegado en Vercel

```bash
   https://frontend-prueba-electronik.vercel.app/
   ```

## Prueba funcional de los servicios desplegados.

1. Registro y login usuario nuevo:

https://github.com/user-attachments/assets/90e41ab6-a2e6-4d43-ba20-2322e8822ab1

2. Guardado de dos imagenes usuario nuevo: 

https://github.com/user-attachments/assets/6b6af056-2ee4-4509-804c-bba537819d14

3. Salimos de la sesion, scroll infinito, favoritos no logeados y sicronizacion al iniciar sesion:

https://github.com/user-attachments/assets/1bf9986c-f089-451b-953c-f3c8ad99ae18

4 Busqueda de imagenes y almacenamineto en cache:

https://github.com/user-attachments/assets/9e3e9721-a9aa-40a1-8fd1-f52f6877bdc9

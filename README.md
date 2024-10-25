Frontend - API de Imágenes Favoritas
Descripción
Este proyecto es el frontend de una aplicación que permite a los usuarios explorar imágenes, marcarlas como favoritas y sincronizarlas con su cuenta cuando inician sesión. Los usuarios no autenticados también pueden guardar imágenes en el localStorage que se sincronizan al iniciar sesión.

Características
Exploración de imágenes: El usuario puede explorar imágenes mediante un scroll infinito.
Marcado de favoritos: Los usuarios pueden marcar o desmarcar imágenes como favoritas. Los favoritos se guardan en localStorage para usuarios no autenticados.
Sincronización de favoritos: Al iniciar sesión, los favoritos guardados en el localStorage se sincronizan con la base de datos.
Autenticación de usuario: Funcionalidad de inicio y cierre de sesión utilizando JWT.
Tecnologías
React con Next.js para el frontend.
Axios para realizar peticiones HTTP a la API del backend.
Tailwind CSS o estilos en línea para el diseño.
Next/Image para optimizar imágenes cargadas dinámicamente desde la API de Unsplash.
Requisitos
Node.js (>= 14.x)
npm o yarn
Instalación
Clonar el repositorio:
bash
Copiar código
git clone https://github.com/tu-usuario/frontend-imagenes-favoritas.git
Navega al directorio del proyecto:
bash
Copiar código
cd frontend-imagenes-favoritas
Instalar las dependencias:
bash
Copiar código
npm install
Variables de Entorno
Crear un archivo .env.local en la raíz del proyecto con las siguientes variables:

env
Copiar código
NEXT_PUBLIC_BACKEND_URL=<URL del backend>
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=<Tu clave de acceso de Unsplash>
Uso
Iniciar el servidor de desarrollo:
bash
Copiar código
npm run dev
Abre tu navegador en http://localhost:3000.
Despliegue
Este proyecto está configurado para ser desplegado en plataformas como Vercel. Para desplegar, sigue los siguientes pasos:

Iniciar sesión en tu cuenta de Vercel.
Conectar el repositorio de GitHub a Vercel.
Configurar las variables de entorno en Vercel:
NEXT_PUBLIC_BACKEND_URL
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
Desplegar la aplicación.
Arquitectura
Este proyecto utiliza Next.js con una arquitectura de componentes, donde cada vista y funcionalidad principal está dividida en componentes modulares.

pages/: Contiene las páginas de la aplicación (inicio, login, favoritos).
components/: Componentes reutilizables como el Header, InfiniteScroll, y los botones de favoritos.
context/: Gestión de la autenticación con React Context API.

import unsplash from '../utils/unsplash';

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

// Función para agregar una imagen a favoritos en LocalStorage
export const addFavoriteToLocalStorage = (imageId: string) => {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (!favorites.includes(imageId)) {
    favorites.push(imageId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// Función para eliminar una imagen de favoritos en LocalStorage
export const removeFavoriteFromLocalStorage = (imageId: string) => {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  favorites = favorites.filter((id: string) => id !== imageId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Función para verificar si una imagen está en LocalStorage
export const isFavoriteInLocalStorage = (imageId: string): boolean => {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(imageId);
};

// Función asíncrona para obtener las imágenes favoritas almacenadas en el LocalStorage
export const getFavoritesFromLocalStorage = async (): Promise<UnsplashImage[]> => {
  const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

  // Usamos Promise.all para hacer todas las llamadas a la API de Unsplash en paralelo
  const favoritePromises = favoriteIds.map(async (imageId: string) => {
    const response = await unsplash.get(`/photos/${imageId}`);
    return response.data;
  });

  // Esperar a que todas las promesas se resuelvan
  const favorites = await Promise.all(favoritePromises);
  
  return favorites;  // Devolver el array de imágenes favoritas
};


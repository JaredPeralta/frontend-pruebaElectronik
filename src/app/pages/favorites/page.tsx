"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getToken, isAuthenticated } from "../../utils/auth";
import unsplash from "../../utils/unsplash";
import { getFavoritesFromLocalStorage, removeFavoriteFromLocalStorage } from "../../utils/storage";  // Función para eliminar del localStorage

// Interfaz para las imágenes favoritas que vienen del backend
interface FavoriteImage {
  id: number;
  user_id: number;
  image_id: string;
}

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated()) {
        try {
          const token = getToken();
          const response = await axios.get(`${backendUrl}/api/images/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const favoriteIds: FavoriteImage[] = response.data;  // Lista de IDs de las imágenes favoritas
          const favoriteImages: UnsplashImage[] = await Promise.all(
            favoriteIds.map(async (image: FavoriteImage) => {
              try {
                const imageResponse = await unsplash.get(`/photos/${image.image_id}`);
                return imageResponse.data; // Retorna la imagen si la carga es exitosa
              } catch (error) {
                console.error(`Error fetching image with ID ${image.image_id}`, error);
                return null; // Retorna null si la imagen falla al cargarse
              }
            })
          );

          // Filtrar imágenes no válidas (las que retornan null)
          setFavorites(favoriteImages.filter((img) => img !== null));
        } catch (err) {
          console.error("Error fetching favorites", err);
        }
      } else {
        // Si el usuario no está logueado, obtenemos los favoritos desde el localStorage
        const localFavorites = await getFavoritesFromLocalStorage();  // Llamada asíncrona
        setFavorites(localFavorites);
      }
      setLoading(false);  // Dejar de mostrar el loader
    };

    fetchFavorites();
  }, [router]);

  // Función para eliminar una imagen favorita
  const handleRemoveFavorite = async (imageId: string) => {
    if (isAuthenticated()) {
      try {
        const token = getToken();
        await axios.delete(`${backendUrl}/api/images/favorites/${imageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filtrar las imágenes eliminadas
        setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== imageId));
      } catch (err) {
        console.error("Error removing favorite from backend", err);
      }
    } else {
      // Eliminar del localStorage si no está logueado
      removeFavoriteFromLocalStorage(imageId);
      // Filtrar las imágenes eliminadas
      setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== imageId));
    }
  };

  if (loading) {
    return <p>Cargando imágenes favoritas...</p>;
  }

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '10px',
    border: '2px solid green',
    position: 'relative',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '10px',
  };

  const buttonStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h1>Mis Imágenes Favoritas</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div key={fav.id} style={containerStyle}>
              <img src={fav.urls.small} alt={fav.alt_description} style={imgStyle} />
              <button style={buttonStyle} onClick={() => handleRemoveFavorite(fav.id)}>Eliminar</button> {/* Botón de eliminar */}
            </div>
          ))
        ) : (
          <p>No tienes imágenes favoritas guardadas.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;

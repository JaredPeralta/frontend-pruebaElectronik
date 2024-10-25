"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import InfiniteScroll from "../components/InfiniteScroll";
import unsplash from "./utils/unsplash";
import { addFavoriteToLocalStorage, removeFavoriteFromLocalStorage, isFavoriteInLocalStorage } from "./utils/storage"; 
import { isAuthenticated, getToken } from "./utils/auth";
import axios from "axios";
import debounce from "lodash.debounce";

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const Home = () => {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await unsplash.get<UnsplashImage[]>("/photos", {
          params: {
            per_page: 10,
            page: 1,
          },
        });

        const uniqueImages = Array.from(new Set(response.data.map(img => img.id)))
          .map(id => response.data.find(img => img.id === id) as UnsplashImage);

        setImages(uniqueImages);

        if (isAuthenticated()) {
          const token = getToken();
          const favoritesResponse = await axios.get(`${backendUrl}/api/images/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const favoriteIds = favoritesResponse.data.map((fav: { image_id: string }) => fav.image_id);
          setFavorites(favoriteIds);
        } else {
          const localFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
          setFavorites(localFavorites);
        }
      } catch (error) {
        console.error("Error fetching images from Unsplash or loading favorites:", error);
      }
    };

    fetchImages();
  }, []);

  const loadMoreImages = debounce(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await unsplash.get("/photos", {
        params: {
          per_page: 10,
          page: page + 1,
        },
      });

      if (response.data.length === 0) {
        console.log("No more images to load");
        return;
      }

      const uniqueImages = Array.from(new Set(response.data.map(img => img.id)))
        .map(id => response.data.find(img => img.id === id) as UnsplashImage);

      setImages((prevImages) => [...prevImages, ...uniqueImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more images:", error);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const handleToggleFavorite = async (imageId: string) => {
    if (isAuthenticated()) {
      const token = getToken();
      try {
        if (favorites.includes(imageId)) {
          await axios.delete(`${backendUrl}/api/images/favorites/${imageId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites((prevFavorites) => prevFavorites.filter(fav => fav !== imageId));
        } else {
          await axios.post(`${backendUrl}/api/images/favorites`, { imageIds: [imageId] }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites((prevFavorites) => [...prevFavorites, imageId]);
        }
      } catch (error) {
        console.error("Error managing favorite", error);
      }
    } else {
      if (isFavoriteInLocalStorage(imageId)) {
        removeFavoriteFromLocalStorage(imageId);
        setFavorites((prevFavorites) => prevFavorites.filter(fav => fav !== imageId));
      } else {
        addFavoriteToLocalStorage(imageId);
        setFavorites((prevFavorites) => [...prevFavorites, imageId]);
      }
    }
  };

  return (
    <InfiniteScroll loadMore={loadMoreImages}>
      <div style={styles.grid}>
        {images.map((image, index) => (
          <div key={`${image.id}-${index}`} style={favorites.includes(image.id) ? styles.selectedCard : styles.card}>
            <Image 
              src={image.urls.small} 
              alt={image.alt_description} 
              width={400} 
              height={600}
              style={styles.image}
            />
            <button onClick={() => handleToggleFavorite(image.id)} style={styles.button}>
              {favorites.includes(image.id) ? "Desmarcar" : "Marcar como favorito"}
            </button>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};


const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.3s",
  },
  selectedCard: {
    border: '2px solid green',
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transform: "scale(1.05)",
  },
  image: {
    width: "100%",
    borderRadius: "4px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default Home;

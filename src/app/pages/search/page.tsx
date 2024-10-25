"use client";

import { useState } from "react";
import unsplash from "../../utils/unsplash";

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
}

const SearchImagesWithCache = () => {
  const [query, setQuery] = useState(""); // Estado para la consulta de búsqueda
  const [images, setImages] = useState<UnsplashImage[]>([]); // Estado para las imágenes resultantes

  const handleSearch = async () => {
    const cachedResults = sessionStorage.getItem(query); // Buscar en caché
    if (cachedResults) {
      setImages(JSON.parse(cachedResults)); // Usar caché si existe
    } else {
      try {
        const response = await unsplash.get("/search/photos", {
          params: { query, per_page: 10 },
        });
        setImages(response.data.results);
        sessionStorage.setItem(query, JSON.stringify(response.data.results)); // Almacenar en caché
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div>
      <h1>Buscar Imágenes (con Caché)</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar imágenes en Unsplash"
      />
      <button onClick={handleSearch}>Buscar</button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.urls.small} alt={image.alt_description} style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchImagesWithCache;

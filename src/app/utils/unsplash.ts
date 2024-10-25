import axios from 'axios';

const unsplashUrl = process.env.NEXT_PUBLIC_UNSPLASH_URL;
const unsplashToken = process.env.NEXT_PUBLIC_UNSPLASH_TOKEN;

//Conexion a la API de unsplash
const unsplash = axios.create({
  baseURL: `${unsplashUrl}`,
  headers: {
    Authorization: `Client-ID ${unsplashToken}`,
  },
});

export default unsplash;
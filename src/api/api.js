import axios from "axios";

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "24498854-53423749accc3067f6b5cc5fe";

const instnce = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        per_page: 12,
    },
});

const getQuery = (page) => {
    return instnce.get(`/?_page=${page}`)
}

const searchQuery = (page = 1, q) => {
    return instnce.get("/", {
        params: {
            page,
            q,
        }
    })
}

export const ApiService = {
    getQuery,
    searchQuery,
}
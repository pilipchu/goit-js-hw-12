import axios from "axios"

export async function getImages(image, currentPage) {
    const BASE_URL = 'https://pixabay.com'
    const END_POINT = '/api/'
    const url = BASE_URL + END_POINT
    
    const params = {
        key: '43041938-51a06b63921488a862c0fcc6d',
        q: image,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        lang: 'en',
        page: currentPage,
        per_page: 24
    }

    const res = await axios.get(url, { params })
    return res.data
}
import axios from 'axios';

const URL = 'https://pixabay.com/api/'

export async function fetchImgSearch(value, page) {

    try {
        const response = await axios.get(URL, {
            params: {
                key: '29904639-b03e054f5aedc60df22d30ccb',
                q: value,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 40,
                page: page,
            },
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}
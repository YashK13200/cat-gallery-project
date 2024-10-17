import axios from 'axios';

const fetchCats = (page) => {
    return axios.get(`https://api.thecatapi.com/v1/images/search?limit=5&page=${page}&order=Desc`);
};

export default fetchCats;

import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params: {
        key: 'cea63ebd62b54cb186362745fd088bf5'
    }
})
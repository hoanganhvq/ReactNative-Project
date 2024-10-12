import axios from "axios";
const ip = '192.168.1.151:3000';
const ip2 = '192.168.1.4:3000';
const api = 'https://be-rnative.onrender.com'
export const home = async (ip) => {
    // const data = await axios.get(`http://${ip2}/BE_React/home`);
    const data = await axios.get(`${api}/BE_React/home`);
    return data;
};

export const hotelDetail = async (id) => {
    // const data = await axios.get(`http://${ip2}/BE_React/hotel/${id}`);
    const data = await axios.get(`${api}/BE_React/hotel/${id}`);
    return data;
};

export const searchHotel = async (search) => {
    // const data = await axios.get(`http://${ip2}/BE_React/search?key=${search}`);
    const data = await axios.get(`${api}/BE_React/search?key=${search}`);
    return data;
}

export const login = async (email) => {
    // const data = await axios.post(`http://${ip2}/BE_React/login`, { email });
    const data = await axios.post(`${api}/BE_React/login`, { email });
    return data;
};

// export const signUp = async (name, email, photo, yearOfBirth) => {
export const signUp = async (name, email, phone) => {

    // const data = await axios.post(`http://${ip2}/BE_React/signup`, { name, email, phone });
    const data = await axios.post(`${api}/BE_React/signup`, { name, email, phone });
    return data
}

export const getMe = async (token) => {
    // const data = await axios.get(`http://${ip2}/BE_React/me`, {
    //     headers: { Authorization: `Bearer ${token}` }
    // }
    // );
    const data = await axios.get(`${api}/BE_React/me`, {
        headers: { Authorization: `Bearer ${token}` }
    }
    );
    return data;
}

export const findEmail = async (email) => {
    // const data = await axios.post(`http://${ip2}/BE_React/checkUserEmail`, { email });
    const data = await axios.post(`${api}/BE_React/checkUserEmail`, { email });
    return data;
}
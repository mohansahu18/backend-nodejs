const axios = require('axios').default; // legacy way
// console.log(axios);
const fetch = async () => {
    const response = await axios.get('https://api.chucknorris.io/jokes/random')
    console.log("resposse..........,", response);
}
fetch()
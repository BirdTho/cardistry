//import Axios from 'axios';
const Axios = require('axios');

const ELDER_SCROLLS_LEGENDS_API_URL = 'https://api.elderscrollslegends.io/v1';

class ElderScrollsLegendsAPI {
  constructor() {
    this.axiosInstance = Axios.create({
      baseURL: ELDER_SCROLLS_LEGENDS_API_URL,
      responseType: 'json'
    });
  }

  getCards = async (page, pageSize = 20) => {
    return await this.axiosInstance.get('/cards', {
      data: {
        page,
        pageSize,
      },
    });
  };

  getKeywords = async (page, pageSize) => {
    return await this.axiosInstance.get('/keywords', {
      data: {
        page,
        pageSize,
      },
    });
  };
}

//export default ElderScrollsLegendsAPI;

module.exports = ElderScrollsLegendsAPI;

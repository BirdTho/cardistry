import Axios, { AxiosInstance, AxiosResponse, AxiosAdapter } from 'axios';

import localForage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { setupCache } from 'axios-cache-adapter';

const ELDER_SCROLLS_LEGENDS_API_URL = 'https://api.elderscrollslegends.io/v1';

export interface CardData {
  name: string,
  rarity: string,
  type: string,
  subtypes?: string[],
  cost: number,
  power?: number,
  health?: number,
  set: {
    id: string,
    name: string,
    _self: string
  },
  soulSummon: number,
  soulTrap: number,
  text: string,
  attributes: string[],
  keywords?: string[],
  unique: boolean,
  imageUrl: string,
  id: string
}

export interface CardsData {
  cards: CardData[],
  _pageSize: number,
  _totalCount: number,
  _links: string,
}

class ElderScrollsLegendsAPI {
  axiosInstance: AxiosInstance | null;
  promise: Promise<boolean> | null;
  localForage: any;
  cache: any;

  constructor() {
    this.axiosInstance = null;
    this.promise = null;
  }

  /**
   * Jig to call _setup only once. Returns a singleton.
   */
  setup(): Promise<boolean> {
    if (!this.promise) {
      this.promise = this._setup();
    }

    return this.promise;
  }

  _setup = async (): Promise<boolean> => {
    await localForage.defineDriver(memoryDriver);

    this.localForage = localForage.createInstance({
      name: 'ESLApiCache',
      driver: [
        localForage.INDEXEDDB,
        localForage.WEBSQL,
        localForage.LOCALSTORAGE,
        memoryDriver._driver,
      ],
    });

    // To be polite, I am using localforage and a cache adapter for Axios to reduce stress on the API
    // If this were a full-blown server app I would use Redis for caching to save their API.
    // At least if an individual is running this demo a lot
    // it will cache in their browser, if possible, across page reloads.
    this.cache = setupCache({
      maxAge: 3 * 60 * 60 * 1000,
      store: this.localForage,
    });

    this.axiosInstance = Axios.create({
      baseURL: ELDER_SCROLLS_LEGENDS_API_URL,
      responseType: 'json',
      adapter: this.cache.adapter,
    });

    return true;
  };

  /**
   *
   * @param {number} page
   * @param {number=} pageSize
   * @param {string=} query
   * @return {Promise<AxiosResponse<CardsData>>}
   */
  getCards = async (page: number, pageSize: number = 20, query: string = ''): Promise<AxiosResponse<CardsData>> => {
    // Jig to delay request until API caching is set up
    if (!this.axiosInstance) {
      await this.setup();
    }
    if (!this.axiosInstance) {
      throw Error('Could not set up axios instance');
    }
    return await this.axiosInstance.get('/cards?' + query, {
      params: {
        page,
        pageSize,
      },
    });
  };
}

export default new ElderScrollsLegendsAPI();

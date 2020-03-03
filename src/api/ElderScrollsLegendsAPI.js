import Axios from 'axios';
import localForage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import { setupCache } from 'axios-cache-adapter';

const ELDER_SCROLLS_LEGENDS_API_URL = 'https://api.elderscrollslegends.io/v1';

/**
 * @typedef {{
 *   data: T,
 *   status: number,
 *   statusText: string,
 *   headers: *,
 *   config: *,
 * }} AxiosResponse
 */

/**
 * @typedef {{
 *   name: string,
 *   rarity: string,
 *   type: string,
 *   subtypes: Array.<string>,
 *   cost: number,
 *   power: number,
 *   health: number,
 *   set: {
 *     id: string,
 *     name: string,
 *     _self: string
 *   },
 *   soulSummon: number,
 *   soulTrap: number,
 *   text: string,
 *   attributes: Array.<string>,
 *   keywords: Array.<string>,
 *   unique: boolean,
 *   imageUrl: string,
 *   id: string
 * }} CardData
 */

/**
 * @typedef {{
 *   cards: Array.<CardData>,
 *   _pageSize: number,
 *   _totalCount: number,
 *   _links: string,
 * }} CardsData
 */

class ElderScrollsLegendsAPI {
  constructor() {
    this.axiosInstance = null;
    this.promise = null;
  }

  /**
   * Jig to call _setup only once. Returns a singleton.
   * @return {Promise}
   */
  setup() {
    if (!this.promise) {
      this.promise = this._setup();
    }

    return this.promise;
  }

  _setup = async () => {
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
   * @param page
   * @param pageSize
   * @return {Promise<AxiosResponse<CardsData>>}
   */
  getCards = async (page, pageSize = 20) => {
    // Jig to delay request until API caching is set up
    if (!this.axiosInstance) {
      await this.setup();
    }

    return await this.axiosInstance.get('/cards', {
      params: {
        page,
        pageSize,
      },
    });
  };

  getKeywords = async (page, pageSize) => {
    // Jig to delay request until API caching is set up
    if (!this.axiosInstance) {
      await this.setup();
    }
    return await this.axiosInstance.get('/keywords', {
      params: {
        page,
        pageSize,
      },
    });
  };
}

export default new ElderScrollsLegendsAPI();

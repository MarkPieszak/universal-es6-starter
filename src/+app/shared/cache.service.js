import { Inject, Injectable, isDevMode } from '@angular/core';

@Injectable()
export let CacheService = class CacheService {
    constructor(_cache) {
        this._cache = _cache;
    }
    /**
     * check if there is a value in our store
     */
    has(key) {
        let _key = this.normalizeKey(key);
        return this._cache.has(_key);
    }
    /**
     * store our state
     */
    set(key, value) {
        let _key = this.normalizeKey(key);
        this._cache.set(_key, value);
    }
    /**
     * get our cached value
     */
    get(key) {
        let _key = this.normalizeKey(key);
        return this._cache.get(_key);
    }
    /**
     * release memory refs
     */
    clear() {
        this._cache.clear();
    }
    /**
     * convert to json for the client
     */
    dehydrate() {
        let json = {};
        this._cache.forEach((value, key) => json[key] = value);
        return json;
    }
    /**
     * convert server json into out initial state
     */
    rehydrate(json) {
        Object.keys(json).forEach((key) => {
            let _key = this.normalizeKey(key);
            let value = json[_key];
            this._cache.set(_key, value);
        });
    }
    /**
     * allow JSON.stringify to work
     */
    toJSON() {
        return this.dehydrate();
    }
    /**
     * convert numbers into strings
     */
    normalizeKey(key) {
        if (isDevMode() && this._isInvalidValue(key)) {
            throw new Error('Please provide a valid key to save in the CacheService');
        }
        return key + '';
    }
    _isInvalidValue(key) {
        return key === null ||
            key === undefined ||
            key === 0 ||
            key === '' ||
            typeof key === 'boolean' ||
            Number.isNaN(key);
    }
};

CacheService.KEY = 'CacheService';

CacheService.parameters = [
  [Inject('LRU')]
];


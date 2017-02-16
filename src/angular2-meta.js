import { Injectable } from '@angular/core';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

/**
 * A service that can be used to get and add meta tags.
 *
 * @experimental
 */
@Injectable()
export class Meta {
    constructor() {
        this._dom = getDOM();
    }
    /**
     * Adds a new meta tag to the dom.
     *
     *  ### Example
     *
     * ```ts
     * const name: MetaDefinition = {name: 'application-name', content: 'Name of my application'};
     * const desc: MetaDefinition = {name: 'description', content: 'A description of the page'};
     * const tags: HTMLMetaElement[] = this.meta.addTags([name, desc]);
     * ```
     *
     * @param tags
     * @returns {HTMLMetaElement[]}
     */
    addTags(...tags) {
        const presentTags = this._flattenArray(tags);
        if (presentTags.length === 0)
            return [];
        return presentTags.map((tag) => this._addInternal(tag));
    }
    /**
     * Gets the meta tag by the given selector. Returns element or null
     * if there's no such meta element.
     *
     *  ### Example
     *
     * ```ts
     * const meta: HTMLMetaElement = this.meta.getTag('name=description');
     * const twitterMeta: HTMLMetaElement = this.meta.getTag('name="twitter:title"');
     * const fbMeta: HTMLMetaElement = this.meta.getTag('property="fb:app_id"');
     * ```
     *
     * @param selector
     * @returns {HTMLMetaElement}
     */
    getTag(selector) {
        if (!selector)
            return null;
        return this._dom.query(`meta[${selector}]`);
    }
    /**
     * Updates the meta tag with the given selector.
     *
     * *  ### Example
     *
     * ```ts
     * const meta: HTMLMetaElement = this.meta.updateTag('name=description', {name: 'description',
     * content: 'New description'});
     * console.log(meta.content); // 'New description'
     * ```
     *
     * @param selector
     * @param tag updated tag definition
     * @returns {HTMLMetaElement}
     */
    updateTag(selector, tag) {
        const meta = this.getTag(selector);
        if (!meta) {
            // create element if it doesn't exist
            return this._addInternal(tag);
        }
        return this._prepareMetaElement(tag, meta);
    }
    /**
     * Removes meta tag with the given selector from the dom.
     *
     *  ### Example
     *
     * ```ts
     * this.meta.removeTagBySelector('name=description');
     * ```
     *
     * @param selector
     */
    removeTagBySelector(selector) {
        const meta = this.getTag(selector);
        this.removeTagElement(meta);
    }
    /**
     * Removes given meta element from the dom.
     *
     *  ### Example
     *  ```ts
     * const elem: HTMLMetaElement = this.meta.getTag('name=description');
     * this.meta.removeTagElement(elem);
     * ```
     *
     * @param meta meta element
     */
    removeTagElement(meta) {
        if (meta) {
            this._removeMetaElement(meta);
        }
    }
    _addInternal(tag) {
        const meta = this._createMetaElement();
        this._prepareMetaElement(tag, meta);
        this._appendMetaElement(meta);
        return meta;
    }
    _createMetaElement() {
        return this._dom.createElement('meta');
    }
    _prepareMetaElement(tag, el) {
        Object.keys(tag).forEach((prop) => this._dom.setAttribute(el, prop, tag[prop]));
        return el;
    }
    _appendMetaElement(meta) {
        const head = this._dom.getElementsByTagName(this._dom.defaultDoc(), 'head')[0];
        this._dom.appendChild(head, meta);
    }
    _removeMetaElement(meta) {
        const head = this._dom.parentElement(meta);
        this._dom.removeChild(head, meta);
    }
    _flattenArray(input, out = []) {
        if (input) {
            for (let i = 0; i < input.length; i++) {
                const item = input[i];
                if (Array.isArray(item)) {
                    this._flattenArray(item, out);
                }
                else if (item) {
                    out.push(item);
                }
            }
        }
        return out;
    }
};


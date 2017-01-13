import DatabaseHandler from './database';
import fetch from 'fetch';

export default class Service {
    constructor() {
        this.apiUrlPath = 'http://159.203.102.59:3333/';
    }

    loadMoreRequest() {
        fetch(this.apiUrlPath)
            .then(response => {
                return response.json();
            })
            .then(data => {
                DatabaseHandler.addStuff(data);
            })
    }

    loadItem(itemId) {
        fetch(this.apiUrlPath)
            .then(response => {
                return response.json();
            })
            .then(data => {
                DatabaseHandler.addStuff(data);
            })
    }
}
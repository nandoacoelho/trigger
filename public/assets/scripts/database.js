import localForage from 'localforage';

export default class DatabaseHandler {
    constructor() {
        this.dbInstance = localForage.createInstance({
            name: 'testDB'
        });
    }

    addStuff(item) {
        return new Promise((resolve, reject) => {
            this.dbInstance.setItems(item)
                .then(() => {
                    resolve();
                })
        })
    }
}
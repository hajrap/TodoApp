import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

const API = 'http://localhost:9999/api/v1/';

export default class TodoAPI {
    constructor() {
        this.state = {
            isLoaded: false,
            itemsSelected:[],
            items: [],
            error: null,
            callbacks: []
        }
    }

    async getItems() {
        await this.fetchAPI('get')
            .then(result => {
                if(result !=undefined){
                this.state.isLoaded = true;
                this.state.items = result.data;
                }
            });
        return this.state;
    }

    async createNewItem(text) {
        let result = await this.fetchAPI('post', text);
        //this.checkResult(result);
        this.state.items.push(result.data);
        this.changeItems(this.state.items);
        // Append to items (Dont replace)
        return this.state;
    }

    async deleteItem(id) {
        let result = await this.fetchAPI('delete', '', id);
       this.changeItems(this.state.items.filter(item => item.id !== id));
        //return this.checkResult(result);
        return this.checkResult(result);
        // Filter items, don't replace
    }

    async updateItem(id, message) {
        let result = await this.fetchAPI('put', message, id);
        this.state.items.map(item=> {
            if(item.id ===id)
            item.text=message;
            return item;
        });
    
        this.changeItems(this.state.items);
            
        // Update the individual item, and call this.changeItems()
        return this.checkResult(result);
        // Update item in array, dont replace
    }

    async fetchAPI(method, text, id) {
        let APIurl = `${API}items`;
        if (id) APIurl += `/${id}`;

        const options = {
            method,
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            }
        };

        if (text) options.body = JSON.stringify({
            text
        }); 
        return await fetch(APIurl, options)
            .then(res => res.json())
            .catch(err => {
                this.state.error = err.message;
            });
    }

    checkResult(result) {

        if (result.statusCode = 200) {
            return true;
        } else {
            this.state.error = result.message;
            return false;
        }
    }

    onChange(callback) {
        this.state.callbacks.push(callback);
    }

     changeItems(items) {
         this.state.items=items;
         this.state.callbacks.forEach(cb => {
             cb(items)
        });
    }
}
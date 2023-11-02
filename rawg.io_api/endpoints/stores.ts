import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface storesParams {
    page?: number;
    page_size?: number;
}

export class stores {
    rawg: rawg;
    constructor(rawg: rawg) {
        this.rawg = rawg;
    }

    async getStores(params?: storesParams) {
        return await axios.get(urlBuilder(this.rawg, "stores", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("stores", "getStores", err);
            throw error;
        }
        )
    }

    async getStoreDetails(id: number) {
        return await axios.get(urlBuilder(this.rawg, `stores/${id}`))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("stores", "getStoreDetails", err);
            throw error;
        }
        )
    }
}


import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface publishersParams {
    page?: number;
    page_size?: number;
}

export class publishers {
    rawg: rawg;
    constructor(rawg: rawg) {
        this.rawg = rawg;
    }

    async getPublishers(params?: publishersParams) {
        return await axios.get(urlBuilder(this.rawg, "publishers", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("publishers", "getPublishers", err);
            throw error;
        }
        )
    }

    async getPublisherDetails(id: number) {
        return await axios.get(urlBuilder(this.rawg, `publishers/${id}`))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("publishers", "getPublisherDetails", err);
            throw error;
        }
        )
    }
}
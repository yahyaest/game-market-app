import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface platformParams {
    page?: number;
    page_size?: number;
}

export class platforms{
    rawg: rawg;
    constructor(rawg: rawg) {
        this.rawg = rawg;
    }

    async getPlatforms(params?: platformParams) {
        return await axios.get(urlBuilder(this.rawg, "platforms", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("platforms", "getPlatforms", err);
            throw error;
        }
        )
    }

    async getPlatformParent(params?: platformParams) {
        return await axios.get(urlBuilder(this.rawg, "platforms/lists/parents", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("platforms", "getPlatformParent", err);
            throw error;
        }
        )
    }

    async getPlatformDetails(id: number) {
        return await axios.get(urlBuilder(this.rawg, `platforms/${id}`))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("platforms", "getPlatformDetails", err);
            throw error;
        }
        )
    }
}
import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface tagsParams {
    page?: number;
    page_size?: number;
}

export class tags {
    rawg: rawg;
    constructor(rawg: rawg) {
        this.rawg = rawg;
    }

    async getTags(params?: tagsParams) {
        return await axios.get(urlBuilder(this.rawg, "tags", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("tags", "getTags", err);
            throw error;
        }
        )
    }

    async getTagDetails(id: number) {
        return await axios.get(urlBuilder(this.rawg, `tags/${id}`))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("tags", "getTagDetails", err);
            throw error;
        }
        )
    }
}

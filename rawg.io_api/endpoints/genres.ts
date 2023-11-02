import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface genresParams {
    page?: number;
    page_size?: number;
}

export class genres {
    rawg: rawg;
    constructor(rawg: rawg) {
        this.rawg = rawg;
    }

    async getGenres(params?: genresParams) {
        return await axios.get(urlBuilder(this.rawg, "genres", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("genres", "getGenres", err);
            throw error;
        }
        )
    }

    async getGenreDetails(id: number) {
        return await axios.get(urlBuilder(this.rawg, `genres/${id}`))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("genres", "getGenreDetails", err);
            throw error;
        }
        )
    }
}
import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface rolesParams {
    page?: number;
    page_size?: number;
}

export class creators {
    rawg: rawg;
    constructor(rawg: rawg) { 
        this.rawg = rawg;
    }

    async getCreators(params?: rolesParams) {
        return await axios.get(urlBuilder(this.rawg, "creators", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}
        ).catch((err) => {
            let error = new errorBase("creators", "getRoles", err);
            throw error;
        }
        )
    }

    async getCreatorsDetails(id: number) {
        return await axios.get(urlBuilder(this.rawg, `creators/${id}`))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}
        ).catch((err) => {
            let error = new errorBase("creators", "getCreatorsDetails", err);
            throw error;
        }
        )
    }
}
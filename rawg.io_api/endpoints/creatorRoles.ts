import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface creatorRolesParams {
    page?: number;
    page_size?: number;
}


export class creatorRoles {
    rawg: rawg;
    constructor(rawg: rawg) { 
        this.rawg = rawg;
    }

    async getCreatorRoles(params?: creatorRolesParams) {
        return await axios.get(urlBuilder(this.rawg, "creator-roles", params))
        .then(res => {
        if (res.status == 200) {
            return res.data;
        }}).catch((err) => {
            let error = new errorBase("creatorRoles", "getCreatorRoles", err);
            throw error;
        }
        )
    }
}
import axios from "axios";
import { rawg } from "../rawg";
import { errorBase } from "../errors/errorBase";
import { urlBuilder } from "../utils";

interface getGamesParams {
    page?: number;
    page_size?: number;
    search?: string;
    search_precise?: boolean;
    search_exact?: boolean;
    parent_platforms?: string;
    platforms?: string;
    stores?: string;
    developers?: string;
    publishers?: string;
    genres?: string;
    tags?: string;
    creators?: string;
    dates?: string;
    updated?: string;
    platforms_count?: number;
    metacritic?: string;
    exclude_collection?: string;
    exclude_additions?: boolean;
    exclude_parents?: boolean;
    exclude_game_series?: boolean;
    ordering?: 'name'|'released'|'added'|'created'| 'updated'|'rating'|'metacritic'|'-name'|'-released'|'-added'|'-created'| '-updated'|'-rating'|'-metacritic';
}

interface getGameAdditionParams {
    page?: number;
    page_size?: number;
}

export class games {
    rawg: rawg;
    constructor(rawg: rawg) {
        this.rawg = rawg;
    }
    


    async getGames(params?: getGamesParams) {
        return await axios.get(urlBuilder(this.rawg, "games", params))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getGames", err);
                throw error;
            }
            )
    }

    async getGameAdditions(id: number, params?: getGameAdditionParams) {
        return await axios.get(urlBuilder(this.rawg, `games/${id}/additions`, params))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getGameAdditions", err);
                throw error;
            }
            )
    }

    async getCreators(gameId: string, params?: getGameAdditionParams) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/development-team`, params))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getCreators", err);
                throw error;
            }
            )
    }

    async getGameSeries(gameId: string, params?: getGameAdditionParams) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/game-series`, params))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getGameSeries", err);
                throw error;
            }
            )
    }

    async getParentGames(gameId: string, params?: getGameAdditionParams) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/parent-games`, params))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getParentGames", err);
                throw error;
            }
            )
    }

    async getScreenshots(gameId: string, params?: getGameAdditionParams) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/screenshots`, params))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getScreenshots", err);
                throw error;
            }
            )
    }

    async getStores(gameId: string, params?: getGameAdditionParams) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/stores`, params))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getStores", err);
                throw error;
            }
            )
    }

    async  getGameDetails(gameId: string,) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}`))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getGameDetails", err);
                throw error;
            }
            )
    }

    async getAchievements(gameId: string,) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/achievements`))
            .then(res => {
                if (res.status == 200) {
                    return res.data;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getAchievements", err);
                throw error;
            }
            )
    }

    async getTrailers(gameId: string,) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/movies`))
            .then(res => {
                if (res.status == 200) {
                    return res.data.results;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getTrailers", err);
                throw error;
            }
            )
    }

    async getLatestRedditPosts(gameId: string,) {
        return axios.get(urlBuilder(this.rawg, `games/${gameId}/reddit`))
            .then(res => {
                if (res.status == 200) {
                    return res.data.results;
                }
            }).catch((err) => {
                let error = new errorBase("games", "getLatestRedditPosts", err);
                throw error;
            }
            )
    }   
}

import axios from "axios";

export class AxiosManager {
    axios:axios.AxiosInstance
    apiKey:string = sessionStorage.getItem("apiKey") || "";

    constructor() {
        this.axios = new axios.create({
            baseURL: "http://localhost:3000/",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.apiKey,
            },
        });
    }

    async get(url:string) {
        let result
        try{
            result = await this.axios.get(url)
        }catch (e) {
            result = e.response.data
        }
        return result
    }

    async post(url:string, data:any) {
        let result
        try{
            result = await this.axios.post(url, data)
        }catch (e) {
            result = e.response
        }
        return result
    }
}

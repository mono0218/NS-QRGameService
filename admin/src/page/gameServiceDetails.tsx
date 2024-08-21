import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {AxiosManager} from "../lib/AxiosManager.ts";

interface resData {
    success: boolean
    data: {
        gameId:number
        playMoney:number
        adminUserId: string
    }
    error: string | null
}

export default function GameServiceDetails() {
    const [json,setJson] = useState<resData>()
    const [APIKey,setAPIKey] = useState<string>("**********************")
    const id = useParams().id

    const apiKey = sessionStorage.getItem('apiKey');
    if (!apiKey) return  <Navigate to="/login" />

    useEffect(() => {
        const api = new AxiosManager()
        api.post("/system/getGameService",{"gameId":Number(id)}).then((res) => {
            setJson(res.data)
        })
    }, []);

    const onAPIReset = () => {
        const api = new AxiosManager()
        api.post("/system/newGameServiceKey",{"gameId":Number(id)}).then((res) => {
            if (res.data.success) {
                console.log(res.data.data.key)
                setAPIKey(res.data.data.key)
            }
        })
    }

    if (!json) return <h1>Loading</h1>
    if (!json.success) return <h1>Error</h1>

    return (
        <>
            <h1>ゲームID：{json.data.gameId}</h1>
            <h2>管理者UUID：{json.data.adminUserId}</h2>
            <h2>1プレイ分の料金：{json.data.playMoney}</h2>
            <h2>APIキー：{APIKey}</h2>
            <button className="btn btn-warning" onClick={onAPIReset}>APIキーをリセット</button>
        </>
    )
}

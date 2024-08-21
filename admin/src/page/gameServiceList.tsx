import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AxiosManager} from "../lib/AxiosManager.ts";

interface resData {
    success: boolean
    data: Array<resDataArray>
    error: string | null
}

interface resDataArray{
    gameId:number
    playMoney:number
    adminUserId: string
}

export default function GameServiceList() {
    const [json,setJson] = useState<resData>()

    const apiKey = sessionStorage.getItem('apiKey');
    if (!apiKey) return  <Navigate to="/login" />

    useEffect(() => {
        const api = new AxiosManager()
        api.get("/system/getGameServiceList").then((res) => {
            setJson(res.data)
        })
    }, []);

    const onAPIReset = (id:number) => {
        const api = new AxiosManager()
        api.post("/system/newGameServiceKey",{"gameId":id}).then((res) => {
            if (res.data.success) {
                console.log(res.data.data.key)
            }
        })
    }

    if (!json) return <h1>Loading</h1>
    if (!json.success) return <h1>Error</h1>

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table mr-24 ml-24">
                    <thead>
                        <tr>
                            <th>GameID</th>
                            <th>管理者ID</th>
                            <th>プレイ分の料金</th>
                            <th>APIKey</th>
                            <th>リセット</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {json.data.map((data) => {
                            return (
                                <tr>
                                    <th>{data.gameId}</th>
                                    <td>{data.adminUserId}</td>
                                    <td>{data.playMoney}</td>
                                    <td>****************</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={
                                            () => onAPIReset(data.gameId)
                                        }>
                                            リセット
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

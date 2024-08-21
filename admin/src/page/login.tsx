import {useState} from "react";
import {Navigate} from "react-router-dom";
export default function Login() {
    const [api,setApi] = useState("")
    const changeApi = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApi(e.target.value)
    }

    const onDone = () => {
        sessionStorage.setItem("apiKey", api)
        return <Navigate to="/service/list"></Navigate>
    }

    return (
        <>
            <div className="card text-neutral-content w-screen">
                <div className="card-body  text-center gap-8  flex justify-center items-center">
                    <h2 className="card-title">Login</h2>
                    <div>
                        <p className="pb-5">システム管理キーを入力してください</p>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={changeApi}/>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={onDone}>Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

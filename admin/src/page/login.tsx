import {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button, Grid, TextField} from "@mui/material";

export function Login() {
    const [api,setApi] = useState("")
    const changeApi = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApi(e.target.value)
    }

    const onDone = () => {
        sessionStorage.setItem("APIkey", api)
    }

    return (
        <>
            <Grid container alignItems="center" justify="center">
                <Card>
                    <CardContent flex>
                        <h1>Login</h1>
                        <TextField id="outlined-basic" onChange={changeApi}/>
                        <Button variant="contained" onClick={onDone}>Login</Button>
                    </CardContent>
                </Card>
            </Grid>
        </>
    )
}
import {Navigate} from "react-router-dom";

export default function NewGameService() {
  const apiKey = sessionStorage.getItem('apiKey');
  if (!apiKey) return  <Navigate to="/login" />

  return (
    <>
      <input type="text"/>
      <input type="text"/>
      <input type="number"/>
    </>
  )
}

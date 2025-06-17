import {BrowserRouter, Route, Routes} from "react-router-dom";

import SignIn from "./Views/signIn";
import SignUp from "./Views/signup";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/signIn" element={<SignIn/>}></Route>
          <Route path="/user/signUp" element={<SignUp/>}></Route>
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App

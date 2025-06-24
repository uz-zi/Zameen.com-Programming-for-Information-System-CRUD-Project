import {BrowserRouter, Route, Routes} from "react-router-dom";

import SignIn from "./Views/signIn";
import SignUp from "./Views/signup";
import HomePage from "./Views/homePage";
import UploadPosts from "./Views/UploadPosts";
import Profile from "./Views/profile"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/signIn" element={<SignIn/>}></Route>
          <Route path="/user/signUp" element={<SignUp/>}></Route>
          <Route path="/homepage" element={<HomePage/>}></Route>
          <Route path="/UploadPosts" element={<UploadPosts/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App

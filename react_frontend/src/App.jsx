import {BrowserRouter, Route, Routes} from "react-router-dom";

import SignIn from "./Views/signIn";
import SignUp from "./Views/signup";
import HomePage from "./Views/homePage";
import UploadPosts from "./Views/allposts";
import Profile from "./Views/profile"
import ViewPost from "./Views/viewpost"
import Footer from "./Views/footer"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/signIn" element={<><SignIn/><Footer/></>}></Route>
          <Route path="/user/signUp" element={<SignUp/>}></Route>
          <Route path="/homepage" element={<HomePage/>}></Route>
          <Route path="/UploadPosts" element={<UploadPosts/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/ViewPost" element={<ViewPost/>}></Route>
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App

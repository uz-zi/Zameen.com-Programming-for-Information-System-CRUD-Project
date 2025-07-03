import {BrowserRouter, Route, Routes} from "react-router-dom";

import SignIn from "./Views/signIn";
import SignUp from "./Views/signup";
import HomePage from "./Views/homePage";
import UploadPosts from "./Views/allposts";
import Profile from "./Views/profile"
import Footer from "./Views/footer"
import AddPost from "./Views/addpost"
import PostDetail from "./Views/postDetail";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user/signIn" element={<SignIn/>}></Route>
          <Route path="/user/signUp" element={<SignUp/>}></Route>
          <Route path="/homepage" element={<HomePage/>}></Route>
          <Route path="/UploadPosts" element={<><HomePage/><UploadPosts/></>}></Route>
          <Route path="/Profile" element={<><HomePage/><Profile/></>}></Route>
          <Route path="/addPost" element={<><HomePage/><AddPost/></>}></Route>
          <Route path="/postDetails" element={<><HomePage/><PostDetail/></>}></Route>
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App

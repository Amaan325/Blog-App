import React from "react";
import {
  Home,
  Login,
  Register,
  View,
  Logout,
  Create,
  Edit,
  Delete,
  About , 
  Contact
} from "./pages/index";
import { SnackbarProvider } from "notistack";
import { UserState, BlogState, CommentState } from "./contexts/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <SnackbarProvider autoHideDuration={1000}>
      <div className="">
        <BlogState>
          <UserState>
            <CommentState>
              <Router>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/view-blog" element={<View />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/create-blog" element={<Create />} />
                  <Route path="/update-blog" element={<Edit />} />
                  <Route path="/delete-blog" element={<Delete />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Router>
            </CommentState>
          </UserState>
        </BlogState>
      </div>
    </SnackbarProvider>
  );
};

export default App;

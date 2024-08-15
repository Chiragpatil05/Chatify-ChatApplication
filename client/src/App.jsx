import React , {Suspense, lazy} from 'react'
import {BrowserRouter , Routes , Route, Router} from "react-router-dom";
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';



// import { Home } from './pages/Home'; -> this is static import (routing ke time , saare pages load ho jayenge) so we have to do dynamic importing
// dynamic import

// for user
const Home   = lazy(() => import("./pages/Home") );
const Login  = lazy(() => import("./pages/Login"));
const Chat   = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));


// for admin
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));


let user = true;

const App = () => {
  return (

    // Chat , Groups , Home - jab dikhana hai tab user login ho i.e user = true
    // agar user login nhi hai toh login pagr dikhana hai i.e user = false  
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          {/* protected routes */}
          <Route element={<ProtectRoute user={user}/>}>
            <Route path='/' element={ <Home/>} />
            <Route path='/chat/:chatId' element={<Chat/>}/>
            <Route path='/groups' element={<Groups/>}/>
          </Route>

          {/* agar user login hai toh , usko login page par nhi jaane den hai */}
          <Route path='/login'  element={<ProtectRoute user={!user} redirect='/'> <Login/> </ProtectRoute>}/>


          {/* admin routes */}
          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path='/admin/dashboard' element={<Dashboard/>}/>
          <Route path='/admin/users' element={<UserManagement/>}/>
          <Route path='/admin/chats' element={<ChatManagement/>}/>
          <Route path='/admin/messages' element={<MessageManagement/>}/>


          {/* agar koi aur hi route de diya toh , page not found wala page */}
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  ) 
}

export default App


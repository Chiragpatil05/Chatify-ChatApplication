import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({children , user , redirect="/login"}) => {
    if(!user){ // user login nhi hai toh ,login page pe le jaao
        return <Navigate to={redirect} />
    }   

    // user login hai , toh children ko return karo
    return children ? children : <Outlet/>;
}

export default ProtectRoute

// what is children - jo bhi <ProtectRoute ke beech mai aayega wo children hai>
// <ProtectRoute>
//      <Route path="/chat/:chatId" element={<Chat/>} /> --- outlet
//       <Home /> ----- children
// </ProtectRoute>
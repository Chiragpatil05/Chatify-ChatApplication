import React from 'react';
import { Helmet } from 'react-helmet-async';

const Title = ({title = "Chat App | Chirag" , description = "This is our chat application Chatify"}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta content={description} name='description'/>
    </Helmet>
  )
}

export default Title
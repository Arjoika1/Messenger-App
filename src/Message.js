import React,{forwardRef} from 'react'
import {Card,CardContent,Typography} from '@material-ui/core'
import './Message.css'

const Message=forwardRef( ({username,message},ref)=>{
    const isUser=username===message.username;
    return (
        <div ref={ref} className={`message ${isUser && 'message_user'}`}>
        <Card className={isUser?"message_userCard":"message_guestCard"}>
            <CardContent>
                <Typography color="white" variant="h5" component="h2">
                {!isUser && `${message.username || 'Unknown User'}:`} {message.message}
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
})

export default Message
/*rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if
            request.time < timestamp.date(2021, 7, 31);
      }
    }
  }
  */
import React, {useState,useEffect} from 'react';
import {FormControl, Input,IconButton , Button} from '@material-ui/core';
import Message from './Message';
import './App.css';
import {auth,db} from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';


function App() {

  const [input,setInput]=useState('');
  const [messages,setMessages]=useState([]);
  const [userName, setuserName] = useState('');


  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setuserName(user?user.displayName:'');
    })
  },[])//every single time input changes useEffect is executed

  
  useEffect(() => {
    
    db.collection("messages")
    .orderBy('timestamp','desc')
    .onSnapshot((snapshot)=>{
      setMessages(snapshot.docs.map((doc)=>({id:doc.id,message:doc.data()})));//the key renders the list every time and thus the new message rendering is smooth
    });//onSnapshot runs whenever there is a change in the database

  }, [])//extract data from database
  
  
  
  const sendMessage=(event)=>
  {
      event.preventDefault();//prevents the form from getting refreshed and hence the messages are displayed
      
      db.collection("messages").add({
        message:input,username:userName,timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      //adds the new message to the existing message
      setInput('');
  }
 const padding={marginTop:'-30px'};

 const userRegister=()=>{
     
  const user=new firebase.auth.GoogleAuthProvider();
   
  firebase.auth().signInWithPopup(user)
  .then((result)=>{
  firebase.auth().signInWithRedirect(user);
  });

 };

 const userLogOut=()=>{
   auth.signOut();
   setuserName('');
   alert("You have successfully logged out!!!");
   }

  return (
     <>
    <div className="app_link">
    <li><Button variant="contained" color="primary" onClick={userRegister}>Sign Up</Button></li>
    <li><Button variant="contained" onClick={userLogOut}>SignOut</Button></li>
    </div>

    <div  className="App">

    <img style={padding} src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100" alt="facebook_messenger"/>
   
    <h1>Arjoika says...</h1>
    <h2>Welcome {userName}</h2>
     <form className="app_form">
     <FormControl className="app_formControl">
       
       <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event=>setInput(event.target.value)}/>
        {/*input field*/}
       

       <IconButton className="app_iconButton" disabled={!input} variant='contained' color="primary" type='submit' onClick={sendMessage}>
         <SendIcon/>
       </IconButton>
      {//the disabled function prevents from sending messages if the input field is empty
      } 
       {/*button*/}

     </FormControl>
    
    </form>


    <FlipMove>
    {
      messages.map(({id,message})=>(
        <Message key={id} username={userName} message={message}/>
      ))
    }
    </FlipMove>
    
    {/*messages*/}
    </div>
    </>
  );
}

export default App;

//npm install -g firebase-tools
//firebase init
//firebase login
/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.6.8/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="/__/firebase/8.6.8/firebase-analytics.js"></script>

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>*/
import { useState ,useEffect} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { createNewMessage,getAllmesssage } from "../../../apiCalls/message";
import {clearUnreadMessageCount} from "../../../apiCalls/chat"
import {toast} from 'react-hot-toast'
import moment from 'moment'

function Chatarea(){
    const {selectedchat,user,Allchats}=useSelector(state=>state.userReducer)
    const selecteduser=selectedchat.members.find(u=>u._id !== user._id) 
    const [message,setMessage]=useState('')
    const [allMessages,setAllMessages]=useState([])
    const dispatch=useDispatch()
    const sendMessage=async()=>{
      try{
        const NewMessage={
          chatId:selectedchat._id,
          sender:user._id,
          text:message
        }
        dispatch(showLoader())
        const response=await createNewMessage(NewMessage)
        dispatch(hideLoader())
        if(response.success){
          setMessage('')
        }

      }
      catch(error){
        dispatch(hideLoader())
        toast.error(error.message)
      }
    }
    const getAllMessages=async()=>{
        try{
            dispatch(showLoader())
            console.log("allMessages:",allMessages)
            const response=await getAllmesssage(selectedchat._id)
            console.log("allMessages:",allMessages)
            dispatch(hideLoader())
            if(response.success){
                setAllMessages(response.data)
            }
        }
        catch(error){
            return error
        }
    }
    const formatTime=(timestamp)=>{
      const now=moment()
      const diff=now.diff(moment(timestamp),'days')

      if(diff <1){
        return `Today ${moment(timestamp).format('hh:mm A')}`
      }
      else if(diff ==1){
        return `yesterday ${moment(timestamp).format('hh:mm A')}`
      }
      else{
        return moment(timestamp).format('MMM D,hh:mm A')
      }
    }

    const clearUnreadMessage=async()=>{
      try{
        dispatch(showLoader())
        const response=await clearUnreadMessageCount(selectedchat._id)
        dispatch(hideLoader())

        if(response.success){
           Allchats.map((eachchat)=>{
             if(eachchat._id === selectedchat._id){
               return response.data
             }
             return eachchat
           })      
        }

      }catch(error){
        dispatch(hideLoader())
        toast.error(error.message)
      }
    }

    function formatName(user){
      let fname=user?.firstName.at(0).toUpperCase()+user?.firstName.slice(1).toLowerCase();
      let lname=user?.LastName.at(0).toUpperCase()+user?.LastName.slice(1).toLowerCase();
      return fname+" "+lname
    }

    useEffect(()=>{
        getAllMessages();
        if(selectedchat?.lastMessage?.sender !== user._id){
          clearUnreadMessage();
        }
    },[selectedchat])

    return(
    <>
        {selectedchat && <div class="app-chat-area">
        <div className="app-chat-area-header">
            {formatName(user)}
        </div>
        
        <div className="main-chat-area">
          {allMessages.map( (eachmessage)=>{
                  const isCurrentUserSender=eachmessage.sender === user._id
                  return(
                    <div className="message-container"
                      style={isCurrentUserSender?{justifyContent:'end'}:{justifyContent:'start'}}
                    >
                      <div>
                        <div className={isCurrentUserSender?"send-message":"received-message"}>
                          {eachmessage.text}
                        </div>
                        <div className="message-timestamp"
                        style={isCurrentUserSender?{float:'right'}:{float:'left'}}
                        >
                          {formatTime(eachmessage.createdAt)}
                          {isCurrentUserSender && eachmessage.read && 
                          <i className="fa fa-check-circle" aria-hidden='true' style={{color:"#e74e3c"}}>
                          </i>}
                        </div>
                      </div>
                      
                    </div>
                  )}
           )}
        </div>

        <div className="send-message-div">
          <input 
          type="text" 
          className="send-message-input" 
          placeholder="Type a message" 
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
          />
          <button
          onClick={sendMessage} 
          className="fa fa-paper-plane send-message-btn" 
          aria-hidden="true">
          </button>
        </div>
      </div>}
    </>
 ) 
}
export default Chatarea;


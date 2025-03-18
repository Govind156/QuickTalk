import {useSelector} from 'react-redux'
import { createNewChat } from '../../../apiCalls/chat'
import { hideLoader, showLoader } from '../../../redux/loaderSlice'
import { setAllChats } from '../../../redux/usersSlice'
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'

function Searchlist({searchkey,setSearchKey}){
 const {user:currentuser,Alluser,Allchats}=useSelector(state=>state.userReducer)  
 const dispatch=useDispatch()
 const startNewChat=async(searchuserid)=>{
    let response=null
    try{
        dispatch(showLoader())
        response=await createNewChat([currentuser._id,searchuserid])
        dispatch(hideLoader())
        if(response.success){
            toast.success(response.message)
            const newchat=response.data
            const updatedchat=[...Allchats,newchat]
            dispatch(setAllChats(updatedchat))

        }
    }
    catch(error){
        toast.error(response.message)
        dispatch(hideLoader())

    }
 }
 return(
    Alluser
    .filter((eachuser)=>{
        return( 
            ((eachuser.firstName.toLowerCase().includes(searchkey.toLowerCase()) ||
            eachuser.LastName.toLowerCase().includes(searchkey.toLowerCase())) && searchkey
            ) ||
            (Allchats.some((eachchat)=>eachchat.members.includes(eachuser._id))))
    })
    .map((eachuser)=>{
        return(
        <div class="user-search-filter">
            <div class="filtered-user">
                <div class="filter-user-display">
                    {
                    eachuser.ProfilePic &&  
                    <img src={eachuser.ProfilePic} alt="Profile Pic" class="user-profile-image"/>
                    }
                    {!eachuser.ProfilePic && 
                    <div class="user-default-profile-pic">
                        {eachuser.firstName[0].toUpperCase()+eachuser.LastName[0].toUpperCase()}
                    </div>
                    }
                    <div class="filter-user-details">
                        <div class="user-display-name">
                            {eachuser.firstName.toUpperCase()+' '+eachuser.LastName.toUpperCase()}
                        </div>
                            <div class="user-display-email">{eachuser.email}</div>
                    </div>
                        {
                            !Allchats.some((eachchat)=>eachchat.members?.includes(eachuser._id)) &&
                            <div className="user-start-chat">
                            <button
                            onClick={()=>startNewChat(eachuser._id)} 
                            class="user-start-chat-btn">Start Chat</button>
                            </div>
                        }
                </div>
            </div>                            
        </div>)
    })
 ) 
}
export default Searchlist

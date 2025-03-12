import {useSelector} from 'react-redux'
function Searchlist({searchkey,setSearchKey}){
 const {user,Alluser}=useSelector(state=>state.userReducer)  
 return(
    Alluser
    .filter((eachuser)=>{
        return(
            eachuser.firstName.toLowerCase().includes(searchkey.toLowerCase()) ||
            eachuser.LastName.toLowerCase().includes(searchkey.toLowerCase())
        )
    })
    .map((eachuser)=>{
        return(
        <div class="user-search-filter">
            <div class="filtered-user">
                <div class="filter-user-display">
                    {/* <!-- <img src={user.profilePic} alt="Profile Pic" class="user-profile-image"> --> */}
                    <div class="user-default-profile-pic">
                        {eachuser.firstName[0].toUpperCase()+eachuser.LastName[0].toUpperCase()}
                    </div>
                    <div class="filter-user-details">
                        <div class="user-display-name">
                            {eachuser.firstName.toUpperCase()+' '+eachuser.LastName.toUpperCase()}
                        </div>
                            <div class="user-display-email">{eachuser.email}</div>
                    </div>
                        <div class="user-start-chat">
                        <button class="user-start-chat-btn">Start Chat</button>
                        </div>
                </div>
            </div>                            
        </div>)
    })
 ) 
}
export default Searchlist

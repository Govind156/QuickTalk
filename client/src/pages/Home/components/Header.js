import {useSelector} from 'react-redux'
function Header(){
const {user}=useSelector(state=>state.userReducer)
    function getfullname(){
    let fname=user?.firstName.toUpperCase()
    let lname=user?.LastName.toUpperCase()
    return fname+' '+lname;
    }
    function getinitials(){
        let f=user?.firstName.toUpperCase()[0]
        let l=user?.LastName.toUpperCase()[0]
        return f+l;
    }
    return (
        <div className="app-header">
    <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
          Quick Talk
        </div>
    <div className="app-user-profile">
        <div className="logged-user-name">{getfullname()}</div>
        <div className="logged-user-profile-pic">{getinitials()}</div>
    </div>
 </div>
    )
}
export default Header;

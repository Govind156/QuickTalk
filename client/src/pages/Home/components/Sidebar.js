import Search from "./Search";
import { useState } from "react"; 
import Searchlist from "./Searchlist";
function Sidebar(){
    const [Searchkey,setSearchkey] =useState('')
    return(
        <div className="app-sidebar">
            <Search 
            searchkey={Searchkey} 
            setSearchKey={setSearchkey}>
            </Search>
            <Searchlist 
            searchkey={Searchkey} 
            setSearchKey={setSearchkey}>
            </Searchlist>
        </div>
    )

}
export default Sidebar;
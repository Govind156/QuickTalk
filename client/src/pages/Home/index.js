import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
function Home(){
    return (
        <div className="home-page">
        <Header/>
            <div className="main-content">
                <Sidebar></Sidebar>
                {/* <!--CHAT AREA LAYOUT--> */}
            </div>
        </div>
    )
}
export default Home;
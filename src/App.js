import './App.css';
import MainNavbar from "./Component/navbar";
import BookStoreRouter from "./BookStoreRouter";
import 'react-notifications-component/dist/theme.css'
import {ReactNotifications} from "react-notifications-component";

function App() {
    return (
        <div className="App">
            <ReactNotifications/>
            <MainNavbar/>
            <BookStoreRouter/>
        </div>
    );
}

export default App;

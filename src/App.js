import './App.css';
import MainNavbar from "./Component/navbar";
import BookStoreRouter from "./BookStoreRouter";
function App() {
  return (
    <div className="App">
        <MainNavbar/>
        <BookStoreRouter/>
    </div>
  );
}

export default App;

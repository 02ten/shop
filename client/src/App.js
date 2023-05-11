import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header></Header>
            <AppRouter></AppRouter>
            <Footer></Footer>
        </BrowserRouter>
    );
}

export default App;

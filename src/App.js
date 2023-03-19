import './App.css';
import LoginForm from "./pages/LoginForm";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import Users from "./pages/Users";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element = {<PrivateRoutes />}>
                        <Route element={<Home />} exact path="/" />
                        <Route element={<Users />} path="/users" />
                    </Route>
                    <Route element={<LoginForm />} path="/login"/>
                </Routes>
            </Router>
        </>
    );
}

export default App;

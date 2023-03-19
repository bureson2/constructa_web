import './App.css';
import LoginForm from "./components/forms/LoginForm";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import UserListTable from "./components/tables/UserListTable";
import TaskListTable from "./components/tables/TaskListTable";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element = {<PrivateRoutes />}>
                        <Route element={<Home />} exact path="/" />
                        <Route element={<UserListTable />} path="/users" />
                        <Route element={<TaskListTable />} path={"tasks"} />
                    </Route>
                    <Route element={<LoginForm />} path="/login"/>
                </Routes>
            </Router>
        </>
    );
}

export default App;

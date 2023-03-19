import LoginForm from "./components/forms/LoginForm";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import UserListTable from "./components/tables/UserListTable";
import TaskListTable from "./components/tables/TaskListTable";
import Layout from "./components/layout/Layout";
import React from "react";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element = {<PrivateRoutes />}>
                        <Route element={<Home />} exact path="/" />
                        <Route element={<Layout tableElement={<UserListTable/>}/>} path="/users" />
                        <Route element={<Layout tableElement={<TaskListTable/>}/>} path="/tasks" />
                    </Route>
                    <Route element={<LoginForm />} path="/login"/>
                </Routes>
            </Router>
        </>
    );
}

export default App;

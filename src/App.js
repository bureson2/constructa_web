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
                        <Route element={<Layout tableElement={<UserListTable/>} location={"USERS"}/>} path="/users" />

                    </Route>
                    <Route element={<LoginForm />} path="/login"/>
                    <Route element={<Layout tableElement={<TaskListTable/>} location={"TASKS"}/>} path="/tasks" />
                </Routes>
            </Router>
        </>
    );
}

export default App;

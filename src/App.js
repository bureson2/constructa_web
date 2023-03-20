import LoginForm from "./components/forms/LoginForm";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import UserListTable from "./components/tables/UserListTable";
import TaskListTable from "./components/tables/TaskListTable";
import Layout from "./components/layout/Layout";
import React from "react";
import TaskDetail from "./components/forms/task_form/TaskDetail";
import EditTask from "./components/forms/task_form/EditTask";
import CreateTask from "./components/forms/task_form/CreateTask";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element = {<PrivateRoutes />}>
                        <Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/" />
                        <Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/users" />
                        <Route element={<Layout element={<TaskListTable/>} location={"TASKS"}/>} path="/tasks" />
                        <Route element={<Layout element={<EditTask/>} location={"USERS"}/>}  path="/tasks/edit/:id" />
                        <Route element={<Layout element={<CreateTask/>} location={"USERS"}/>} path="/tasks/create" />
                        <Route element={<Layout element={<TaskDetail/>} location={"USERS"}/>} path="/tasks/:id" />
                    </Route>
                    <Route element={<LoginForm />} path="/login"/>
                </Routes>
            </Router>
        </>
    );
}

export default App;

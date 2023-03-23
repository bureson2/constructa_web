import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import UserListTable from "./components/tables/UserListTable";
import TaskListTable from "./components/tables/TaskListTable";
import Layout from "./components/layout/Layout";
import React from "react";
import TaskDetail from "./components/forms/task_form/TaskDetail";
import EditTask from "./components/forms/task_form/EditTask";
import CreateTask from "./components/forms/task_form/CreateTask";
import VehicleListTable from "./components/tables/VehicleListTable";
import EditVehicle from "./components/forms/vehicle_form/EditVehicle";
import CreateVehicle from "./components/forms/vehicle_form/CreateVehicle";
import VehicleDetail from "./components/forms/vehicle_form/VehicleDetail";
import LoginPage from "./pages/login/LoginPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route element = {<PrivateRoutes />}>
                        <Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/" />
                        <Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/users" />
                        <Route element={<Layout element={<TaskListTable/>} location={"TASKS"}/>} path="/tasks" />
                        <Route element={<Layout element={<EditTask/>} location={"TASKS"}/>}  path="/tasks/edit/:id" />
                        <Route element={<Layout element={<CreateTask/>} location={"TASKS"}/>} path="/tasks/create" />
                        <Route element={<Layout element={<TaskDetail/>} location={"TASKS"}/>} path="/tasks/:id" />
                        <Route element={<Layout element={<VehicleListTable/>} location={"VEHICLES"}/>} path="/vehicles" />
                        <Route element={<Layout element={<EditVehicle/>} location={"VEHICLES"}/>}  path="/vehicles/edit/:id" />
                        <Route element={<Layout element={<CreateVehicle/>} location={"VEHICLES"}/>} path="/vehicles/create" />
                        <Route element={<Layout element={<VehicleDetail/>} location={"VEHICLES"}/>} path="/vehicles/:id" />
                    </Route>
                    <Route element={<LoginPage />} path="/login"/>
                    {/*<Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/" />*/}
                    {/*<Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/users" />*/}
                    {/*<Route element={<Layout element={<TaskListTable/>} location={"TASKS"}/>} path="/tasks" />*/}
                    {/*<Route element={<Layout element={<EditTask/>} location={"USERS"}/>}  path="/tasks/edit/:id" />*/}
                    {/*<Route element={<Layout element={<CreateTask/>} location={"USERS"}/>} path="/tasks/create" />*/}
                    {/*<Route element={<Layout element={<TaskDetail/>} location={"USERS"}/>} path="/tasks/:id" />*/}
                </Routes>
            </Router>
        </>
    );
}

export default App;

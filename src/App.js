import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React, { useEffect } from 'react';

import PrivateRoutes from "./routes/PrivateRoutes";
import UserListTable from "./components/tables/UserListTable";
import TaskListTable from "./components/tables/TaskListTable";
import Layout from "./components/layout/Layout";
import TaskDetail from "./components/forms/task_form/TaskDetail";
import EditTask from "./components/forms/task_form/EditTask";
import CreateTask from "./components/forms/task_form/CreateTask";
import VehicleListTable from "./components/tables/VehicleListTable";
import EditVehicle from "./components/forms/vehicle_form/EditVehicle";
import CreateVehicle from "./components/forms/vehicle_form/CreateVehicle";
import VehicleDetail from "./components/forms/vehicle_form/VehicleDetail";
import LoginPage from "./pages/login/LoginPage";
import EditUser from "./components/forms/user_form/EditUser";
import AddUser from "./components/forms/user_form/AddUser";
import UserDetail from "./components/forms/user_form/UserDetail";
import CompanyListTable from "./components/tables/CompanyListTable";
import ProjectListTable from "./components/tables/ProjectListTable";
import EditCompany from "./components/forms/company_form/EditCompant";
import CreateCompany from "./components/forms/company_form/CreateCompany";
import CompanyDetail from "./components/forms/company_form/CompanyDetail";
import EditProject from "./components/forms/project_form/EditProject";
import CreateProject from "./components/forms/project_form/CreateProject";
import ProjectDetail from "./components/forms/project_form/ProjectDetail";
import CreateVehicleReport from "./components/forms/vehicle_report_form/CreateVehicleReport";
import VehicleReportDetail from "./components/forms/vehicle_report_form/VehicleReportDetail";
import WorkReportListTable from "./components/tables/WorkReportListTable";
import CreateWorkReport from "./components/forms/work_report_form/CreateWorkReport";
import WorkReportDetail from "./components/forms/work_report_form/WorkReportDetail";

function App() {
    useEffect(() => {
        document.title = 'Constructa';
    }, []);
    return (
        <>
            <Router>
                <Routes>
                    <Route element = {<PrivateRoutes />}>
                        <Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/" />
                        <Route element={<Layout element={<UserListTable/>} location={"USERS"}/>} path="/users" />
                        <Route element={<Layout element={<EditUser/>} location={"USERS"}/>}  path="/users/edit/:id" />
                        <Route element={<Layout element={<AddUser/>} location={"USERS"}/>} path="/users/create" />
                        <Route element={<Layout element={<UserDetail/>} location={"USERS"}/>} path="/users/:id" />

                        <Route element={<Layout element={<WorkReportListTable />} location={"USERS"}/>} path="/work-reports/:id"/>
                        <Route element={<Layout element={<CreateWorkReport />} location={"USERS"}/>} path="/work-reports/create/:id"/>
                        <Route element={<Layout element={<WorkReportDetail />} location={"USERS"}/>} path="/work-reports/report/:id"/>


                        <Route element={<Layout element={<TaskListTable/>} location={"TASKS"}/>} path="/tasks" />
                        <Route element={<Layout element={<EditTask/>} location={"TASKS"}/>}  path="/tasks/edit/:id" />
                        <Route element={<Layout element={<CreateTask/>} location={"TASKS"}/>} path="/tasks/create" />
                        <Route element={<Layout element={<TaskDetail/>} location={"TASKS"}/>} path="/tasks/:id" />

                        <Route element={<Layout element={<VehicleListTable/>} location={"VEHICLES"}/>} path="/vehicles" />
                        <Route element={<Layout element={<EditVehicle/>} location={"VEHICLES"}/>}  path="/vehicles/edit/:id" />
                        <Route element={<Layout element={<CreateVehicle/>} location={"VEHICLES"}/>} path="/vehicles/create" />
                        <Route element={<Layout element={<VehicleDetail/>} location={"VEHICLES"}/>} path="/vehicles/:id" />

                        <Route element={<Layout element={<CreateVehicleReport/>} location={"VEHICLES"}/>} path="/vehicles/reports/create" />
                        <Route element={<Layout element={<VehicleReportDetail/>} location={"VEHICLES"}/>} path="/vehicles/reports/:id" />

                        <Route element={<Layout element={<CompanyListTable/>} location={"COMPANIES"}/>} path="/companies" />
                        <Route element={<Layout element={<EditCompany/>} location={"COMPANIES"}/>}  path="/companies/edit/:id" />
                        <Route element={<Layout element={<CreateCompany/>} location={"COMPANIES"}/>} path="/companies/create" />
                        <Route element={<Layout element={<CompanyDetail/>} location={"COMPANIES"}/>} path="/companies/:id" />

                        <Route element={<Layout element={<ProjectListTable/>} location={"PROJECTS"}/>} path="/projects" />
                        <Route element={<Layout element={<EditProject/>} location={"PROJECTS"}/>}  path="/projects/edit/:id" />
                        <Route element={<Layout element={<CreateProject/>} location={"PROJECTS"}/>} path="/projects/create" />
                        <Route element={<Layout element={<ProjectDetail/>} location={"PROJECTS"}/>} path="/projects/:id" />
                    </Route>
                    <Route element={<LoginPage />} path="/login"/>
                </Routes>
            </Router>
        </>
    );
}

export default App;

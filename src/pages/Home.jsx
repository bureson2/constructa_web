import React, {useEffect, useState} from 'react'
import axios from "axios";
import Layout from "../components/layout/Layout";
import UserListTable from "../components/tables/UserListTable";

const Home = () => {
    return (
        <>
            <Layout tableElement={<UserListTable/>}/>
        </>
    )
}

export default Home;
import React, { useState, useEffect } from 'react'
import './css/ManageUser.css'
import Sidebar from './Components/Sidebar'
import axios from 'axios'

const ManageUser = () => {

    const [users, setUsers] = useState([]);
    const [loding, setLoding] = useState(true);

    useEffect(() => {
        axios.get('https://agriapi2025.onrender.com/api/admin/users')
            // .then((res)=>res.json())

            .then((res) => {
                setUsers(res.data)
                setLoding(false)
            })

            .catch((err) => ("error while fetching data", err))
        setLoding(false)
    }, [])

    if (loding) {
        return (
            <p>Loding....</p>
        )
    }
    if (!users) {
        return <p>No user found</p>
    }
    return (
        <div>
            <Sidebar />
            <div className='user_continer_div'>

                <h2>Manage Users</h2>
                <table>

                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>Mobile</th>
                            <th>EMAIL</th>
                            <th>PASSWORD</th>
                            <th>DOJ</th>
                        </tr>
                    </thead>
                    {users.map((data) => (
                        // <div className='user_tablediv_div'>
                        <tbody>
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.mnumber}</td>
                                <td>{data.email}</td>
                                <td>{data.password}</td>
                                <td>{data.created_at}</td>
                            </tr>
                        </tbody>
                        // </div>
                    ))}
                </table>

            </div>

        </div>
    )
}

export default ManageUser

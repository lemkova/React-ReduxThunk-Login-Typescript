import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/reducers/usersSlice';
import { AppDispatch } from '../store';



const Counter = () => {

    const allUsers = useSelector((state: any) => state.users.entities)
    const dispatch = useDispatch<AppDispatch>()

    const doFetchUsers = () : void => {
        dispatch(fetchUsers())
    }

    return (
        <div>
            <h1>Users data</h1>
            <button onClick={doFetchUsers}>Get Users</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((e : any, id: number) => {
                            return (
                                <tr key={id}>
                                    <td>{e.name.first} {e.name.last}</td>
                                    <td>{e.login.username}</td>
                                    <td>{e.email}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Counter
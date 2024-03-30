import { useState } from "react"


interface data {
    fullname: string;
    email: string;
    username: string;
}

export const useGetUserInfos = async () => {

    const [userData, setUserData] = useState();

    await fetch('http://localhost:5000/api/users/')
    .then(res: Response => {
        res.json()
        .then(data: data => {
            setUserData(data)
        })
    })
}

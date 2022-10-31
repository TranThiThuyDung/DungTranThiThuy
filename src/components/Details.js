import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { message } from 'antd'
import { Card } from 'antd';
import Update from './Update'


function Details() {
    const { id } = useParams()
    const [list, setList] = useState({})
    useEffect(() => {
        axios.get(`https://class.nodemy.vn/api/mock/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(res => setList(res.data.data))
            .catch(err => message.error('Lỗi rồi!'))
    }, [])
    return (
        <div  style={{
            display: "flex",
            justifyContent: "center"
        }}>
                    <Card
                        style={{
                            width: 500,
                            border: "solid black",
                            backgroundColor: "lightblue",
                            fontSize: "20px",
                            textAlign: "center",
                            marginTop: "150px"
                        }}
                    >
                        <p>Product Detail {id}</p>
                        <p>{list.name}</p>
                        <p>{list.phone}</p>
                        <p>{list.dateOfBirth}</p>
                        <Update></Update>
                    </Card>
        </div>
    )
}

export default Details
import { Input, message } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Form, useParams, useSearchParams } from 'react-router-dom'
import 'antd/dist/antd.min.css';
import { useState } from 'react';
import {
    Button,
    Modal
} from 'antd';




function Update() {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVHLhuqduIEjhu691IFRydW5nIiwicGhvbmUiOiIwODY2NjMzODA1IiwiZGF5c09mZiI6MTIsInN0YXR1cyI6ImFjdGl2ZSIsImF2YXRhciI6Imh0dHBzOi8vY2xhc3Mubm9kZW15LnZuL2FwaS9wdWJsaWMvaW1hZ2VzL2xvZ28ucG5nIiwicm9sZSI6InVzZXIiLCJ0aWNrZXQiOjAsImxpbmtGQiI6Imh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9uYW0ubm9kZW15IiwiZGVsZXRlTW9jayI6W10sImRhdGVPZkJpcnRoIjoiMTY2NDEwMzcwNjQ3NCIsIl9pZCI6IjYzNGU3MDY4ZGNkM2Q3MDAyMWJmMGI4ZiIsImVtYWlsIjoidHJ1bmdiZW8yMDQyMDAxQGdtYWlsLmNvbSIsInZvdGVzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMi0xMC0xOFQwOToyMjo0OC40NzlaIiwidXBkYXRlZEF0IjoiMjAyMi0xMC0xOVQwMjozNDo0NC42ODdaIiwiX192IjowLCJpYXQiOjE2NjY2NzA3MjcsImV4cCI6MTY2NzU3MDcyN30.oVloc_HmaEfsJK7qFdmtmrzX7ShAskaRWUGLmEEBYd4"
    const [list, setList] = useState([])
    const [total, setTotal] = useState(0)
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [inputImg, setInputImg] = useState('')
    const [page, setPage] = useSearchParams({})
    const pageId = page.get('page')
    const { id } = useParams()
    const [counte, setCounte] = useState(0)


    useEffect(function (page, pageSize) {
        axios.get(`https://class.nodemy.vn/api/mock/users?page=${pageId}&size=10`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (res) {
                setList(res.data.data)
                setTotal(res.data.total)
            })
            .catch(function (err) {
                console.log(err);
            })
    }, [counte])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function handleSave(values) {
        const newData = new FormData()
        newData.append('name', Name)
        newData.append('email', Email)
        newData.append('avatar', inputImg)

        axios.put(`https://class.nodemy.vn/api/mock/users/${id}`, newData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(data => {
                console.log(data);
                setCounte(counte + 1)
                message.success('thanh cong roi day')

            })
            .catch(error => {
                console.log(error);
                message.error('khum thanh cong rui')
            })
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Update
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    UserName :<Input type='text' placeholder='change your username' name='name' value={Name} onChange={(e) => setName(e.target.value)} />
                    Info     :<Input type='text' placeholder='change your email' name='email' value={Email} onChange={(e) => setEmail(e.target.value)} />
                    Image    :<Input type='file' name='avatar' value={inputImg} onChange={(e) => setInputImg(e.target.value)} />
                    <Button htmlType='submit' style={{ float: 'right' }} onClick={handleSave}>Save</Button>
                </div>
            </Modal>
        </div>
    )
}

export default Update
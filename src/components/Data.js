import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Button, Card, message, Modal, Input, Pagination } from 'antd';
import { Link } from "react-router-dom";
const { Meta } = Card;

function Data() {
    const [list, setList] = useState([])
    const [couter, setCouter] = useState(0)
    const [total, setTotal] = useState(1)
    const [search,setSearch] = useState('')

    useEffect(() => {
        axios.get(`https://class.nodemy.vn/api/mock/users?page=1&size=10`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                setList(res.data.data)
                setTotal(res.data.total)
            })
            .catch(err => message.error("Không có dữ liệu"))
    }
        , [couter])

    function Delete(id) {
        var check = window.confirm('Bạn có chắc muốn xóa không?')
        if (check) {
            axios.delete(`https://class.nodemy.vn/api/mock/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            })
                .then(res => setCouter(couter + 1))
        }
    }

    const [valueEmailAdd, setValueEmailAdd] = useState('')
    const [valuePassAdd, setValuePassAdd] = useState('')
    const [valueNameAdd, setValueNameAdd] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalAdd = () => {
        setIsModalOpen(true);
    };
    var myFile
    const handleOk = () => {
        const createUser = new FormData()
        createUser.append('email', valueEmailAdd)
        createUser.append('password', valuePassAdd)
        createUser.append('name', valueNameAdd)
        createUser.append('myFile', myFile)
        console.log(createUser);
        console.log(myFile);
        axios.post('https://class.nodemy.vn/api/mock/users', createUser, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(res => setCouter(couter + 1))
            .catch(err => message.error('Kiểm tra lại validate các trường thông tin <3 L o v e'))
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function changePage(page, pageSize) {
        axios.get(`https://class.nodemy.vn/api/mock/users?page=${page}&size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Token')}`
            }
        })
            .then(res => setList(res.data.data))
            .catch(err => message.error("Không có"))
        localStorage.setItem('page', page)
    }

    return (
        <>
            <Pagination className='pagination' onChange={changePage} defaultCurrent={1} total={total} />

            Search: <Input value = {search} onChange = {function(e) {setSearch(e.target.value)}} placeholder="UserName" />;
            <Button type="primary" onClick={showModalAdd}>
                Add User
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input type='email' value={valueEmailAdd} onChange={function (e) { setValueEmailAdd(e.target.value) }} placeholder="email" />
                <Input type='password' value={valuePassAdd} onChange={function (e) { setValuePassAdd(e.target.value) }} placeholder="password" />
                <Input type='text' value={valueNameAdd} onChange={function (e) { setValueNameAdd(e.target.value) }} placeholder="name" />
                <Input type='file' onChange={function (e) { myFile = e.currentTarget.files[0] }} placeholder="myfile" />
            </Modal>

            <div className='data'>
                {list.filter(value => {
                    if (search === '') {
                        return value
                    } else if (value.name.toLowerCase().includes(search.toLowerCase())) {
                        return value
                    }
                }).map((value) => {
                    return (
                        <>
                            <Card
                                hoverable
                                style={{
                                    width: 240,
                                }}
                                cover={<img className='img' alt="example" src={value.avatar} />}
                                key={value._id}
                            >
                                <Meta title={value.email} />
                                <Link to={`/data/${value._id}`}>{value.name}</Link>
                                <br></br>
                                <Button onClick={function () { Delete(value._id) }} type="primary">Delete</Button>
                            </Card>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Data
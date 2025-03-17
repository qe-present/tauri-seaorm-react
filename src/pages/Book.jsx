import {useEffect, useState} from 'react';
import {invoke} from '@tauri-apps/api/core'
import Theader from '../components/Theader';
import Tbody from '../components/Tbody';
import './Book.css';
import AddButton from "../components/AddButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {bookActions} from "../store/book-slice.jsx";
import {useNavigate} from "react-router-dom";

const Book = () => {
    const book=useSelector(state => state.book);
    const dispatch = useDispatch()
    const navigate=useNavigate();

    const handleDeleteBook = async (id) => {
        let message = await invoke('delete_book', { // 删除图书
            id
        })
        if (message) { // message 不为null表示删除失败
            alert(message)
        }
        dispatch(bookActions.deleteBook(id))  // 删除成功，更新store
    };

    const handleEditBook = (id) => {
        navigate(`edit/${id}`)

    };

    const tableHeaders = [
        {key: 'id', label: 'ID'},
        {key: 'title', label: '书名'},
        {key: 'author', label: '作者'},
        {key: 'price', label: '价格'},
        {key: 'actions', label: '操作'}
    ];

    return (
        <div className="book-container">
            <div className="book-header">
                <h1 className="book-title">图书管理系统</h1>
                <AddButton/>
            </div>
            <div className="book-table-container">
                <table className="book-table">
                    <Theader headers={tableHeaders}/>
                    <Tbody
                        headers={tableHeaders}
                        onDelete={handleDeleteBook}
                        onEdit={handleEditBook}
                    />
                </table>
            </div>
        </div>
    );
};

export default Book; 
import React, {useEffect, useState} from 'react';
import {getAllWebviewWindows} from "@tauri-apps/api/webviewWindow";
import Input from '../components/Input';
import './Add.css';
import {invoke} from "@tauri-apps/api/core";
import {listen, emit} from "@tauri-apps/api/event";
import {useNavigate,useParams} from "react-router-dom";


const Add = ({functionName}) => {
    const {id}=useParams()
    function get_book_by_id(id) {
        invoke("get_book_by_id",
            {
                id: +id
            }
        ).then((data) => {
            setFormData({
                title: data.title,
                author: data.author,
                price: data.price
            })
        });
    }
    if(functionName === 'edit'){
        useEffect( ()=>{
            get_book_by_id(id)
        },[])

    }
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: ''
    });

    async function handleClose() {
        if(functionName === 'edit'){
            navigate('..')
            return
        }
        const webviewWindows = await getAllWebviewWindows();
        const addWindow = webviewWindows.find((webviewWindow) => webviewWindow.label === 'Add');
        if (addWindow) {
            addWindow.hide();
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let message
            if (functionName === 'add') {
                message = await invoke('insert_book', {
                    ...formData
                });
            } else {
                message = await invoke('update_book', {
                    ...formData,
                    id: +id
                });
            }
            // message为null表示添加成功
            if (message) {
                alert(message);
                return;
            }
            emit('update_parent_state') // 发送事件通知父窗口更新数据
            setFormData({
                title: '',
                author: '',
                price: ''
            })
            if(functionName === 'edit') {
                navigate('..')
            }else {
                handleClose();
            }


        } catch (error) {
            console.error('添加失败:', error);
        }
    };

    return (
        <div className="add-container">
            <div className="add-form-container">
                <h2 className="add-title">{functionName === 'add' ? '添加书籍' : '修改书籍'}</h2>
                <form onSubmit={handleSubmit} className="add-form">
                    <Input
                        label="书名"
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="请输入书名"
                    />

                    <Input
                        label="作者"
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        placeholder="请输入作者"
                    />

                    <Input
                        label="价格"
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                        placeholder="请输入价格"
                    />

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={handleClose}>
                            取消
                        </button>
                        <button type="submit" className="submit-btn">
                            {functionName === 'add' ? '添加' : '修改'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add;

import React, {useEffect} from 'react';
import './Tbody.css';
import {invoke} from "@tauri-apps/api/core";
import {bookActions} from "../store/book-slice.jsx";
import {useSelector,useDispatch} from "react-redux";
import {listen} from "@tauri-apps/api/event";


const Tbody = ({ headers, onDelete, onEdit }) => {
  const book=useSelector(state => state.book);
  listen('update_parent_state', (event) => {
    get_books()
  })
  const dispatch = useDispatch();
  function get_books(){
    invoke('get_books').then((data) => {
        dispatch(bookActions.setBooks(data));
    });
  }
  useEffect(() => {
    get_books()

  }, []);
  return (
    <tbody className="tbody">
      {book.data.map(item => (
        <tr key={item.id} className="tbody-row">
          {headers.map(header => {
            if (header.key === 'actions') {
              return (
                <td key={header.key} className="tbody-cell">
                  <button className="action-btn delete-btn" onClick={() => onDelete(item.id)}>删除</button>
                  <button className="action-btn" onClick={() => onEdit(item.id)}>编辑</button>
                </td>
              );
            }
            return (
              <td key={header.key} className="tbody-cell">
                {item[header.key]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody; 
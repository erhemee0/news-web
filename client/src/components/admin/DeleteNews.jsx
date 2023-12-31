import React from 'react';
import closeIcon from '../../images/delete.png';
import { deleteDataAPI } from './../../utils/fetchData';

const DeleteNews = ({ setDeleteNews, n }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        await deleteDataAPI(`deletenews/${n._id}`);
        window.location.href = "/admin";
    }
    return (
        <div className="delNews__main">
            <button className="addNews__close btn" onClick={() => setDeleteNews(false)}>
                <img className="icon" src={closeIcon} alt="close button" />
            </button>
            <div className="delNews__form">
                <p className="delNews__p">Энэ мэдээг устгах уу?</p>
                <div className="delNews__btn ">
                    <button onClick={handleSubmit} className="delNews__yes btn btn--primary">
                        Тийм
                    </button>
                    <button onClick={() => setDeleteNews(false)} className="delNews__no btn btn--secondary">
                        Үгүй
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeleteNews;
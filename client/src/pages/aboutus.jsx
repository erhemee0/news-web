import React, { useState } from "react";
import img from "../images/register.jpg";
import "../styles/aboutus.css";
import { postDataAPI } from "../utils/fetchData";

const Aboutus = () => {
  const state = {
    email: "",
    msg: "",
    success: "",
  };

  const [contect, setContect] = useState(state);
  const { email, msg, success } = contect;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setContect({ ...contect, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postDataAPI("addfeedback", { email, msg });
      setContect({ email: "", msg: "", success: "Амжилттай илгээгдлээ" });
    } catch (err) {
      err.response.data.msg &&
        setContect({ ...contect, err: err.response.data.msg });
    }
  };

  return (
    <div className="about_container">
      <div className="about__block">
        <h2 className="about__title">Бидний тухай:</h2>
        <p className="about__par">
          “Анлимитэд медиа групп” ХХК нь 2016 онд байгуулагдсан бөгөөд одоо
          залууст зориулсан Ub.life мэдээллийн сайт ба “Гэрэг” сэтгүүлийг эрхлэн
          гаргаж байна. Бид 2019 оноос дэлхийн шилдэг хэвлэлүүдийн нэг “The New
          York Times Licensing Group”-ийн Монгол дахь хамтрагч болж агуулга,
          контентийг нь албан ёсны эрхтэйгээр өөрийн сувгуудаар түгээж байна
        </p>
        <div className="ourself">
          <span className="me">
            <img src={img} className="about__img" alt="profile" />
            <h3 className="about__email">erhmee@gmail.com</h3>
          </span>
          <span className="me">
            <img src={img} className="about__img" alt="profile" />
            <h3 className="about__email">xyptonize@gmail.com</h3>
          </span>
        </div>
        <div className="about__social"></div>
      </div>
      <div className="about__block">
        <h2 className="about__title">Холбоо барих:</h2>
        <form className="about__form">
          <label htmlFor="email" className="about__label">
            Холбоо барих имэйл:
          </label>
          <input
            className="about__input"
            type="text"
            id="email"
            name="email"
            placeholder="Имэйл хаягаа оруулна уу..."
            onChange={handleChangeInput}
            value={email}
          />
          <label htmlFor="msg" className="about__label">
            Мессеж:{" "}
          </label>
          <textarea
            className="about__textarea"
            type="text"
            id="msg"
            name="msg"
            placeholder="Санал хүсэлтээ бичнэ үү..."
            onChange={handleChangeInput}
            value={msg}
          />
          {success && <p className="about__succ">{contect.success}</p>}
          <button
            onClick={handleSubmit}
            className="btn btn--primary about__btn"
          >
            Илгээх
          </button>
        </form>
      </div>
    </div>
  );
};

export default Aboutus;

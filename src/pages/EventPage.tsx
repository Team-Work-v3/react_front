import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import Wrapper from "../components/Wrapper";
import type { IEvent } from "../models/event.interface";

export default function EventPage() {
    const [event, setEvent] = useState<IEvent>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchEvents = async (): Promise<void> => {
            const eventId = parseInt(id!);

            const response = await fetch("http://62.109.16.129:5000/api/getEvent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id: eventId })
            });

            setEvent(await response.json());
        }
        fetchEvents();
    }, []);

    console.log(event);
    return (
        <>
            <Wrapper>
                <div className="first-section">
                    <img id="big-stork" src="/The_big_stork.png" width="100%" height="620px" />
                    <img id="iteen-img" src="/iteen.png" />
                    <div className="first-block">
                        <div>
                            <h1 className="text-big" id="text-indentation">{event?.name_event}</h1>
                            <div className="block-frome">
                                <a className="frome text-little">{event?.date_event.split("-").reverse().join(".")}</a>
                                <a className="frome">{event?.time_event}</a>
                            </div>
                            <p className="text-medium" id="indent">{event?.description_event}</p>
                        </div>
                        <button className="btn text-medium">Записаться</button>
                    </div>
                </div>
                <div className="two-column">
                    <div>
                        <div>
                            <h2 className="text-medium-big">Описание</h2>
                            <p className="text-medium">
                                Также как внедрение современных методик обеспечивает широкому кругу (специалистов) участие в
                                формировании позиций, занимаемых участниками в отношении поставленных задач.</p>
                            <p className="text-medium">
                                Являясь всего лишь частью общей картины, тщательные исследования конкурентов набирают популярность
                                среди определенных слоев населения, а значит, должны быть своевременно верифицированы. Кстати,
                                интерактивные прототипы, инициированные исключительно синтетически, призваны к ответу. Кстати,
                                диаграммы связей.</p>

                            <p className="text-medium">
                                Являясь всего лишь частью общей картины, тщательные исследования конкурентов набирают популярность
                                среди определенных слоев населения, а значит, должны быть своевременно верифицированы.
                                ващшривржипкрепщжерущв.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-medium-big">Организаторы</h2>
                            <p className="text-medium">
                                Имеется спорная точка зрения, гласящая примерно следующее: представители современных социальных
                                резервов призывают нас к новым свершениям, которые, в свою очередь, должны быть разоблачены.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-medium-big">Программа</h2>
                        <p className="text-medium">
                            Имеется спорная точка зрения, гласящая примерно следующее: представители современных социальных резервов
                            призывают нас к новым свершениям.</p>
                        <p className="text-medium">
                            Которые, в свою очередь, должны быть разоблачены. Внезапно, независимые государства представлены в
                            исключительно положительном свете.Внезапно, независимые государства представлены в исключительно
                            положительном свете.</p>
                        <p className="text-medium">
                            Имеется спорная точка зрения, гласящая примерно следующее: представители современных социальных резервов
                            призывают нас к новым свершениям.</p>
                        <p className="text-medium">
                            Которые, в свою очередь, должны быть разоблачены. Внезапно, независимые государства представлены в
                            исключительно положительном свете.Внезапно, независимые государства представлены в исключительно
                            положительном свете.
                        </p>
                    </div>
                </div>
                <div className="block-form">
                    <div id="form-color">
                        <div className="registrstion-layout">
                            <div className="form-container">
                                <div className="form-box">
                                    <h1 className="text-big" id="registration">Регистрация</h1>
                                    <form >
                                        <div className="form-group">
                                            <div>
                                                <label className="label-indent" htmlFor="name">Имя Фамилия</label>
                                                <span id="nameError" className="error-message">Заполните это поле</span>
                                            </div>
                                            <input className="registration-frame" type="text" id="name" name="name" maxLength={50} placeholder="Иван Иванов" />
                                        </div>
                                        <div className="form-group">
                                            <label className="label-indent" htmlFor="email">Почта:</label><br />
                                            <input className="registration-frame" type="email" id="email" name="email" maxLength={100} placeholder="ivanov2000@gmail.com" /> <br />
                                            <span id="emailError" className="error-message"></span>
                                        </div>

                                        <div className="form-group">
                                            <label className="label-indent" htmlFor="phone">Телефон:</label><br />
                                            <input className="registration-frame" type="tel" id="phone" name="phone" maxLength={20} placeholder="+375 (29) 222-22-22" /><br />
                                            <span id="phoneError" className="error-message"></span>
                                        </div>

                                        <div className="checkbox-group">
                                            <input type="checkbox" id="agree" name="agree" />
                                            <label htmlFor="agree">Я даю согласие на обработку персональных данных</label><br />
                                            <span id="agreeError" className="error-message"></span>
                                        </div>
                                        <button className="btm-buy" type="submit">Купить билет</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src="/The_big_stork.png" width="580px" height="100%" />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 id="gallery-text" className="text-max-big">Галерея</h1>
                    <div className="gallery">
                        <div className="gallery-content">
                            <div className="gallery-img">
                                <img src="img/block_in_gallery.png" />
                            </div>
                            <div className="gallery-img">
                                <img src="img/block_in_gallery.png" />
                            </div>
                            <div className="gallery-img">
                                <img src="img/block_in_gallery.png" />
                            </div>
                            <div className="gallery-img">
                                <img src="img/block_in_gallery.png" />
                            </div>
                        </div>
                        <div className="arrow-button">
                            <button id="button-turn" className="all-button-arrow"><svg width="20" height="20" viewBox="0 0 20 20"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.833 9.99967L4.16634 9.99967M15.833 9.99967L12.4997 6.66634M15.833 9.99967L12.4997 13.333"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </button>
                            <button className="all-button-arrow"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.833 9.99967L4.16634 9.99967M15.833 9.99967L12.4997 6.66634M15.833 9.99967L12.4997 13.333"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></button>
                        </div>



                    </div>
                    <div>
                        <h1 id="review" className="text-max-big">Отзывы</h1>
                        <div className="reviews-list">
                            <div className="review-card">
                                <h3 className="text-little-medium">Анатолий</h3>
                                <h6 className="text-little">13 апреля, 12:54</h6>
                                <p className="text-little">
                                    Также как внедрение современных методик обеспечивает широкому кругу (специалистов) участие в
                                    формировании позиций, занимаемых участниками в отношении поставленных задач. Являясь всего лишь
                                    частью общей картины, тщательные исследования конкурентов набирают популярность среди
                                    определенных слоев населения, а значит, должны быть своевременно верифицированы. Являясь всего
                                    лишь частью общей картины, тщательные исследования
                                </p>
                            </div>
                            <div className="review-card">
                                <h3 className="text-little-medium">Анатолий</h3>
                                <h6 className="text-little">13 апреля, 12:54</h6>
                                <p className="text-little">
                                    Также как внедрение современных методик обеспечивает широкому кругу (специалистов) участие в
                                    формировании позиций, занимаемых участниками в отношении поставленных задач. Являясь всего лишь
                                    частью общей картины, тщательные исследования конкурентов набирают популярность среди
                                    определенных слоев населения, а значит, должны быть своевременно верифицированы. Являясь всего
                                    лишь частью общей картины, тщательные исследования
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrapper>
            <Footer />
        </>
    );
}
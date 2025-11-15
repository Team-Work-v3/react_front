export default function MainPage() {
    return (
        <main className="main">
            <section className="greeting">
                <div className="wrapper">
                    <img src="./iteen.png" alt="iteen" className="greeting-iteen" />
                    <div className="greeting-texts">
                        <span className="unbounded-bold greeting-heading">Мероприятия<br />от IT-Academy</span>
                        <span className="unbounded-regular greeting-text">список мероприятий</span>
                    </div>
                </div>
            </section>
        </main>
    );
}

function Card() {
    return (
        <article className="event-item">
            <div className="event-left">
                <div className="event-left-up">
                    <h3 className="event-name">Библиотека<br />супер мега</h3>
                    <p className="special">12.10.2025</p>
                    <p className="special">16:00</p>
                    <p className="special">Идёт регистрация</p>
                </div>
                <div className="event-left-down">
                    <h4 className="event-cost">Бесплатно</h4>
                    <button className="event-btn">Записаться</button>

                </div>
            </div>
            <div className="event-img">
                <img src="src/img/test.jpg" alt="" srcSet="" className="event-img-img" min-width="236px" height="236px" />
            </div>
        </article>
    );
}
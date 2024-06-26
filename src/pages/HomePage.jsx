/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row, Col } from "react-bootstrap";
import HeroImage from "../assets/img/hero.png";

import { useNavigate } from "react-router-dom";
import Faq from "../components/Faq";

import { Swiper, SwiperSlide } from "swiper/react";
import { useBackend } from "../data/useBackend";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const HomePage = () => {
  let navigate = useNavigate();
  const [gameData, setGameData] = useState([]);
  const [sampleComments, setSampleComments] = useState([]);
  const { GetSampleEvent, GetSampleComments } = useBackend();

  useEffect(() => {
    GetSampleEvent().then((x) => setGameData(x.data));
    GetSampleComments().then((x) => setSampleComments(x.data));
  }, []);

  return (
    <div className="homepage">
      <header className="w-100 min-vh-100 d-flex align-items-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="6">
              <h1 className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                Temukan <br /> <span>Bakat Bermainmu</span> <br />
                Bersama Kami
              </h1>
              <p className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                Maksimalkan Potensimu, Raih Kemenanganmu: Temukan Pelatih, Teman
                Bermain, dan Info Event Terkini dengan MCO
              </p>
              <button
                className="btn btn-danger btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s"
                onClick={() => navigate("/temanmabar")}
              >
                Cari Teman Mabar
              </button>
              <button
                className="btn btn-outline-danger btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s"
                onClick={() => navigate("/coach")}
              >
                Cari Coach
              </button>
            </Col>
            <Col lg="6" className="pt-lg-0 pt-5">
              <img
                src={HeroImage}
                alt="hero-img"
                className="animate__animated animate__fadeInUp"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <div className="kelas w-100 min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold">Event Terbaru</h1>
              <p className="text-center">
                Lihat Event Terbaru dari Game Terkini.
              </p>
            </Col>
          </Row>
          <Row>
            {gameData.map((game) => {
              const getRandomDelay = () =>
                Math.floor(Math.random() * (2000 - 100 + 1)) + 100;

              const randomDelay = getRandomDelay();
              return (
                <Col
                  key={game.eventID}
                  className="shadow rounded d-flex flex-column"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={String(randomDelay)}
                >
                  <img
                    src={game.eventPicture}
                    alt="unsplash.com"
                    className="w-100 mb-5 rounded-top"
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-5 px-3">{game.eventName}</h5>
                  </div>
                  <div className="ket d-flex justify-content-end align-items-center px-3 pb-3">
                    <button
                      className="btn btn-danger rounded-1"
                      onClick={() => navigate("/eventdetail")}
                    >
                      See More
                    </button>
                  </div>
                </Col>
              );
            })}
          </Row>

          <Row>
            <Col className="text-center">
              <button
                className="btn btn-success rounded-5 btn-lg"
                data-aos="fade-up"
                data-aos-duration="1000"
                onClick={() => navigate("/event")}
              >
                Lihat Semua Event{" "}
                <i className="fa-solid fa-chevron-right ms-1"></i>{" "}
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="testimonial py-5">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center fw-bold my-5">Testimonial</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {sampleComments.map((data) => {
                return (
                  <SwiperSlide key={data.commentID} className="shadow-sm">
                    <div className="sample-comment-container">
                      <p className="desc">{data.commentContent}</p>
                      <div className="people">
                        <img src={data.commentPicture} alt="" />
                        <div>
                          <h5 className="mb-1">{data.commentSender}</h5>
                          <p className="m-0 fw-bold">
                            {data.commentRating} <FaStar />
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Row>
        </Container>
      </div>
      {/* Section FAQ */}
      <Faq />
    </div>
  );
};

export default HomePage;

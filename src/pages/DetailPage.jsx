/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row, Col } from "react-bootstrap"
import { Navigate, useParams } from "react-router-dom"
import { useBackend } from "../data/useBackend"
import { useEffect, useState } from "react"
import Comments from "../components/DisplayComments"

const DetailPage = () => {

  const { type, id } = useParams();
  const { GetCoachDetail, GetUserDetail } = useBackend();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (type == "coach") {
        await GetCoachDetail(id).then(x => { setData(x.data); });
      }
      else {
        await GetUserDetail(id).then(x => { setData(x.data); });
      }
    }
    fetchData().catch(console.error);
  }, [])


  return (
    <div className="detail-page">
      <div className="detail min-vh-100">
        <Container>
          <Row>
            <Col>
              {data.length != 0 &&
                (<>
                  <h1 className="fw-bold text-center mb-2 animate__animated animate__fadeInUp animate__delay-1s">{type == "coach" ? data.coachName : data.userName}</h1>
                  <p className="text-center animate__animated animate__fadeInUp animate__delay-1s"> {type == "coach" ? "Professional" : "Your Average"} {data.games.gameName} {type == "coach" ? "Professional Gaming Coach" : "Gaming Buddy"}.</p>
                </>)}
            </Col>
          </Row>
          <Row>
            <Col md={6} className="pt-5 order-md-1 order-1">
              <img src={type == "coach" ? data.coachPicture : data.userPicture} alt="coach" className="w-100 mb-5 rounded-top" />
            </Col>
            <Col md={6} className="pt-5 order-md-2 order-2">
              <p>{type == "coach" ? data.coachDescription : data.userDescription}</p>

              <h4 className="pt-3">Rating:</h4>
              <i className="fa-solid fa-star"></i>
              <p>{type == "coach" ? data.coachRating : data.userRating}</p>
              <br />

              <h4 className="pt-3">{type == "coach" ? "Game Coached:" : "Game Played"}</h4>
              {data.length != 0 && <p>{data.games.gameName}</p>}

              <h4 className="pt-3">Price:</h4>
              <p className="m-0 text-primary fw-bold">{type == "coach" ? data.coachPrice : data.userPrice}</p>

              <button className="btn btn-danger mt-3 btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s" onClick={() => Navigate("/")}>Order {type == "coach" ? "Coach" : "Gaming Buddy"}</button>
            </Col>
          </Row>
        </Container>
      </div>
      <Comments id={id} />
    </div>
  )
}

export default DetailPage
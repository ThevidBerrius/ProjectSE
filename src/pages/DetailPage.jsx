/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Row, Col, Modal, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useBackend } from "../data/useBackend"
import { useEffect, useState } from "react"
import Comments from "../components/DisplayComments"
import { useLocalStorage } from "../data/useLocalStorage"
import { FaCoins } from "react-icons/fa"
import React from "react"

const DetailPage = () => {

  let navigate = useNavigate();
  const { type, id } = useParams();
  const { GetCoachDetail, GetUserDetail, InsertCoachOrder, InsertUserOrder, PurchaseService } = useBackend();
  const { getItem, setItem } = useLocalStorage('User');

  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);

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
    setUser(getItem());
  }, []);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
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
                <p className="fw-bold">{type == "coach" ? data.coachRating : data.userRating}</p>
                <br />

                <h4 className="pt-3">{type == "coach" ? "Game Coached:" : "Game Played"}</h4>
                {data.length != 0 && <p>{data.games.gameName}</p>}

                <h4 className="pt-3">Price:</h4>
                <p className="m-0 text-primary fw-bold">{type == "coach" ? data.coachPrice : data.userPrice} <FaCoins /></p>
                <h4 className="pt-3">Round:</h4>
                <div className="quantity-control mt-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <span className="quantity mx-2">{quantity}</span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-danger mt-3 btn-lg rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s" onClick={
                  async () => {
                    if (user.userCurrency < parseInt(quantity) * parseInt(type == "coach" ? data.coachPrice : data.userPrice)) {
                      alert("Currency not enough");
                      return;
                    }
                    await PurchaseService(user.userID, parseInt(-quantity) * parseInt(type == "coach" ? data.coachPrice : data.userPrice));
                    user.userCurrency = parseInt(user.userCurrency) + parseInt(-quantity) * parseInt(type == "coach" ? data.coachPrice : data.userPrice);
                    type == "coach" && await InsertCoachOrder(user.userID, data.coachID, "Coaching", "In Progress", (parseInt(quantity) * parseInt(data.coachPrice)));
                    type != "coach" && await InsertUserOrder(user.userID, data.userID, "Playing", "In Progress", (parseInt(quantity) * parseInt(data.userPrice)));
                    setItem(user);
                    setModalShow(true);
                  }}>Order {type == "coach" ? "Coach" : "Gaming Buddy"}</button>
              </Col>
            </Row>
          </Container>
        </div>
        <Comments id={id} />
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          navigate("/transaction");
        }}
        type={type == "coach" ? "Coach" : "Gaming Buddy"}
      />
    </>
  )
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.type} Order Success</h4>
        <p>
          Please immediately check your transaction and contact our customer service if the transaction did not show up
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success"
          size="m" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailPage
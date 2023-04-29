import React, { useEffect, useState } from "react";
import { userData } from "../userSlice";
// import { reviewData } from "../reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMyFavourites } from "../services/apiCalls";
import { Col, Container, Row } from "react-bootstrap";
import CardMyReviews from "../../components/CardMyReviews";

export const GetMyFavourites = () => {

  const ReduxUserData = useSelector(userData);
  // const ReduxReviewData = useSelector(reviewData);
  const [favourites, setFavourites] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (favourites.length === 0) {
      getMyFavourites(ReduxUserData?.credentials?.token)
        .then((result) => {
          console.log(result, "esto es result");
          setFavourites(result.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [favourites]);
  console.log(favourites, "esto son favourites");


  const gameSelect = (favourite) => {
    console.log(favourite)
    // dispatch(addChoosenAppointment({ choosenAppointment: favourite }));
    // setTimeout(() => {
    //   navigate("/appointment/update");
    // }, 1000);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {favourites.map((game) => {
            return (
              <Col onClick={() => gameSelect(game)} key={game.id}>
                <CardMyReviews appo={game} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
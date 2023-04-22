import React, { useEffect, useState } from "react";
import { getAllReviewsAdmin } from "../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../userSlice";
import NavBar from "../../components/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import CardReviews from "../../components/CardReviews";

export const GetAllAdminReviews = () => {
    const ReduxUserData = useSelector(userData);
    // const ReduxReviewData = useSelector(reviewData);
    const [reviews, setReviews] = useState([]);
    
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
        if (reviews.length === 0) {
            getAllReviewsAdmin(ReduxUserData?.credentials?.token)
                .then((result) => {
                    console.log(result);
                    setReviews(result.data.data0);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [reviews]);
    console.log(reviews);


    const gameSelect = (review) => {
        console.log(review)
        // dispatch(addChoosenAppointment({ choosenAppointment: favourite }));
        // setTimeout(() => {
        //   navigate("/appointment/update");
        // }, 1000);
    };

    return (
        <>
            <NavBar />
            <hr />
            <Container fluid>
                <Row>
                    {reviews.map((game) => {
                        return (
                            <Col onClick={() => gameSelect(game)} key={game.id}>
                                <CardReviews appo={game} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};
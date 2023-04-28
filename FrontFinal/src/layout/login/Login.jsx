import React, { useState } from "react";
import { login } from "../userSlice";
import { InputText } from "../../components/InputText/InputText";
import { loginUser } from "../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [welcome, setWelcome] = useState("");

  const renderTooltip = (props) => (
    <Tooltip id="ButtonRegister-tooltip" {...props}>
      You must enter a Valid User First
    </Tooltip>
  )

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [registerAct, setRegisterAct] = useState(false);


  const checkError = (e) => { };

  const logMe = () => {
    loginUser(credenciales)
      .then((respuesta) => {
        // console.log("esto es respuesta", respuesta);
        let datosBackend = {
          token: respuesta.data.authorisation.token,
          usuario: respuesta.data.authorisation.user,
        };
        //   console.log("esto es datos backend",datosBackend)
        let nombre = datosBackend.usuario.email;
        dispatch(login({ credentials: datosBackend }));
        setWelcome(`Bienvenid@ de nuevo ${nombre}`);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
        <div>
          {welcome !== "" ? (
            <div>{welcome}</div>
          ) : (
            <div>
              <Container>
                <Row className="AllLoginForm">
                  <Col lg={6}>
                    <Form className="FormLogin">
                      <Form.Group>
                        <Form.Label>Enter your email account:</Form.Label>
                        <InputText
                          className={"inputLogin"}
                          type={"email"}
                          name={"email"}
                          maxLength={50}
                          placeholder={"email..."}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Enter your password:</Form.Label>
                        <InputText
                          className={"inputLogin"}
                          type={"password"}
                          name={"password"}
                          maxLength={64}
                          placeholder={""}
                          required={true}
                          changeFunction={(e) => inputHandler(e)}
                          blurFunction={(e) => checkError(e)}
                        />
                      </Form.Group>
                      <br />
                      <div className="ButtonLogin">
                      <OverlayTrigger
                      placement="right"
                      delay={{ show: 100, hide: 300 }}
                      overlay={renderTooltip}
                    >
                      <Button
                        className={
                          registerAct ? "registerSendAct" : "registerSendDeac"
                        }
                        onClick={() => logMe()}
                      >
                        {" "}
                        Login User
                      </Button></OverlayTrigger></div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </div>
    </>
  );
};

import { useState, useReducer, useEffect } from "react";
//import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
	Container,
	Card,
} from "reactstrap";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const initialState = {
	email: "",
	password: "",
	emailError: "",
	passwordError: "",
};

const loginConstants = {
	setEmail: "SET_EMAIL",
	setPassword: "SET_PASSWORD",
	setEmailError: "SET_EMAIL_ERROR",
	setPasswordError: "SET_PASSWORD_ERROR",
};

const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case loginConstants.setEmail: {
			return {
				...state,
				email: payload,
			};
		}
		case loginConstants.setPassword: {
			return {
				...state,
				password: payload,
			};
		}
		case loginConstants.setPasswordError: {
			return {
				...state,
				passwordError: payload,
			};
		}
		case loginConstants.setEmailError: {
			return {
				...state,
				emailError: payload,
			};
		}
		default: {
			return state;
		}
	}
};

const loginSchema = yup.object().shape({
	email: yup.string().required(),
	password: yup.string().required().min(6),
});
const LoginForm = (props) => {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");

	const [state, dispatch] = useReducer(reducer, initialState);
	const { email, password, emailError, passwordError } = state;

	// useEffect(() => {
	// 	redirect();
	// }, []);
	let navigate = useNavigate();
	const onSubmit = (event) => {
		event.preventDefault();
		loginSchema
			.validate({ email, password }, { abortEarly: false })
			.then((res) => {
				console.log(res);
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};
				fetch("https://reqres.in/api/login", requestOptions).then(
					(response) => {
						if (response.status === 200) {
							console.log("SUCCESSS");
							//props.onLoginSuccess();
							redirect();
						} else {
							alert("wrong credentials");
						}
					}
				);
			})
			.catch((err) => {
				err.inner.forEach((e) => {
					if (e.path === "email") {
						dispatch({
							type: loginConstants.setEmailError,
							payload: e.message,
						});
					}
					if (e.path === "password") {
						dispatch({
							type: loginConstants.setPasswordError,
							payload: e.message,
						});
					}
				});
			});
	};

	const clearEmailField = () => {
		//setEmail("");
		dispatch({ type: loginConstants.setEmail, payload: "" });
	};
	const clearPassField = () => {
		//setPassword("");
		dispatch({ type: loginConstants.setPassword, payload: "" });
	};
	const redirect = () => {
		navigate("/users");
	};
	return (
		<Form onSubmit={onSubmit}>
			<h1 className="h1">Login</h1>
			<Card>
				<Col md={12}>
					<FormGroup>
						<Label for="exampleEmail">Email</Label>
						<div className="f">
							<Input
								id="exampleEmail"
								name="email"
								placeholder="Enter email"
								type="email"
								value={email}
								//onChange={(e) => setEmail(e.target.value)}
								onChange={(e) =>
									dispatch({
										type: loginConstants.setEmail,
										payload: e.target.value,
									})
								}
								style={{
									//width: "40%",
									display: "block",
									margin: "0 auto",
								}}
							/>
							<button
								type="button"
								onClick={clearEmailField}
								style={{
									//width: "40%",
									display: "block",
									margin: "0 auto",
								}}
							>
								&times;
							</button>
						</div>
						<div className="msg">{emailError && <sub>{emailError}</sub>}</div>
					</FormGroup>
				</Col>
				<Col md={12}>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<div className="f">
							<Input
								id="examplePassword"
								name="password"
								placeholder="password placeholder"
								type="password"
								value={password}
								//onChange={(e) => setPassword(e.target.value)}
								onChange={(e) =>
									dispatch({
										type: loginConstants.setPassword,
										payload: e.target.value,
									})
								}
								style={{
									//width: "40%",
									display: "block",
									margin: "0 auto",
								}}
							/>
							<button
								type="button"
								onClick={clearPassField}
								style={{
									//width: "40%",
									display: "block",
									margin: "0 auto",
								}}
							>
								&times;
							</button>
						</div>
						<div className="msg">
							{passwordError && <sub>{passwordError}</sub>}
						</div>
					</FormGroup>
				</Col>

				<Container className="text-center my-3">
					<Button className="mx-2" color="primary" type="submit">
						Submit
					</Button>
					{/* <Button color="primary" type="rest">
					Reset
				</Button> */}
				</Container>
				<p className="msg">
					Don't have an account? <Link to="/signup">Sign Up</Link>
				</p>
			</Card>
		</Form>
	);
};

export default LoginForm;

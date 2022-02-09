//import { Component } from "react";
import { useState, useReducer } from "react";

import { Button, Form, FormGroup, Input, Label, Card } from "reactstrap";
import "../index.css";
import { Link } from "react-router-dom";
import LoginForm from "./Login";
import * as yup from "yup";

const initialState = {
	email: "",
	password: "",
	emailError: "",
	passwordError: "",
	firstName: "",
	firstNameError: "",
	lastName: "",
	lastNameError: "",
	mob: "",
	mobError: "",
};
const signupConstants = {
	setEmail: "SET_EMAIL",
	setPassword: "SET_PASSWORD",
	setEmailError: "SET_EMAIL_ERROR",
	setPasswordError: "SET_PASSWORD_ERROR",
	setFirstName: "SETFNAME",
	setLastName: "SETLNAME",
	setMob: "SETMOB",
	setFirstNameError: "SET_FNAME_ERROR",
	setLastNameError: "SET_LNAME_ERROR",
	setMobError: "SET_MOB_ERROR",
};
const reducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case signupConstants.setFirstName: {
			return {
				...state,
				firstName: payload,
			};
		}
		case signupConstants.setLastName: {
			return {
				...state,
				lastName: payload,
			};
		}
		case signupConstants.setMob: {
			return {
				...state,
				mob: payload,
			};
		}
		case signupConstants.setEmail: {
			return {
				...state,
				email: payload,
			};
		}
		case signupConstants.setPassword: {
			return {
				...state,
				password: payload,
			};
		}
		case signupConstants.setPasswordError: {
			return {
				...state,
				passwordError: payload,
			};
		}
		case signupConstants.setEmailError: {
			return {
				...state,
				emailError: payload,
			};
		}
		case signupConstants.setFirstNameError: {
			return {
				...state,
				firstNameError: payload,
			};
		}
		case signupConstants.setLastNameError: {
			return {
				...state,
				lastNameError: payload,
			};
		}
		case signupConstants.setMobError: {
			return {
				...state,
				mobError: payload,
			};
		}
		default: {
			return state;
		}
	}
};

const signupSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	mob: yup.number().required().positive().integer(),
	email: yup.string().required(),
	password: yup.string().required().min(6),
});

const SignupForm = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const {
		email,
		password,
		firstName,
		lastName,
		mob,
		firstNameError,
		lastNameError,
		mobError,
		emailError,
		passwordError,
	} = state;

	const onSubmit = (event) => {
		event.preventDefault();
		signupSchema
			.validate(
				{ firstName, lastName, email, mob, password },
				{ abortEarly: false }
			)
			.then((res) => {
				props.onLoginSuccess();
			})
			.catch((err) => {
				err.inner.forEach((e) => {
					if (e.path === "email") {
						dispatch({
							type: signupConstants.setEmailError,
							payload: e.message,
						});
					}
					if (e.path === "firstName") {
						dispatch({
							type: signupConstants.setFirstNameError,
							payload: e.message,
						});
					}
					if (e.path === "lastName") {
						dispatch({
							type: signupConstants.setLastNameError,
							payload: e.message,
						});
					}
					if (e.path === "mob") {
						dispatch({
							type: signupConstants.setMobError,
							payload: e.message,
						});
					}
					if (e.path === "password") {
						dispatch({
							type: signupConstants.setPasswordError,
							payload: e.message,
						});
					}
				});
			});
	};
	return (
		<div className="App">
			<h1 className="h1">Sign Up</h1>
			<Form className="form" onSubmit={onSubmit}>
				<Card>
					<FormGroup>
						<Label for="f_name">First Name</Label>
						<Input
							type="name"
							name="f_name"
							id="f_name"
							placeholder="First Name"
							value={firstName}
							onChange={(e) => {
								dispatch({
									type: signupConstants.setFirstName,
									payload: e.target.value,
								});
							}}
						/>
						<div className="msg">
							{firstNameError && <sub>{firstNameError}</sub>}
						</div>
					</FormGroup>
					<FormGroup>
						<Label for="l_name">Last Name</Label>
						<Input
							type="name"
							name="l_name"
							id="l_name"
							placeholder="Last Name"
							value={lastName}
							onChange={(e) => {
								dispatch({
									type: signupConstants.setLastName,
									payload: e.target.value,
								});
							}}
						/>
						<div className="msg">
							{lastNameError && <sub>{lastNameError}</sub>}
						</div>
					</FormGroup>
					<FormGroup>
						<Label for="exampleEmail">Email</Label>
						<Input
							type="email"
							name="email"
							id="exampleEmail"
							placeholder="Enter email"
							value={email}
							//onChange={(e) => setEmail(e.target.value)}
							onChange={(e) =>
								dispatch({
									type: signupConstants.setEmail,
									payload: e.target.value,
								})
							}
						/>
						<div className="msg">{emailError && <sub>{emailError}</sub>}</div>
					</FormGroup>
					<FormGroup>
						<Label for="exampleMob">Mobile number</Label>
						<Input
							type="number"
							name="mob"
							id="exampleMob"
							placeholder="Mob no"
							value={mob}
							//onChange={(e) => setEmail(e.target.value)}
							onChange={(e) =>
								dispatch({
									type: signupConstants.setMob,
									payload: e.target.value,
								})
							}
						/>
						<div className="msg">{mobError && <sub>{mobError}</sub>}</div>
					</FormGroup>
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
										type: signupConstants.setPassword,
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
								//onClick={clearPassField}
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
					<Button className="mx-2" color="primary">
						Create Account
					</Button>
					<p className="msg">
						Already have an account? <Link to="/login">Login</Link>
					</p>
				</Card>
			</Form>
		</div>
	);
};
export default SignupForm;

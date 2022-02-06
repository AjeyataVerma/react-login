import { useState } from "react";
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
	Container,
} from "reactstrap";
import "../App.css";

const LoginForm = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = (event) => {
		event.preventDefault();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};
		fetch("https://reqres.in/api/login", requestOptions).then((response) => {
			if (response.status === 200) {
				console.log("SUCCESSS");
				props.onLoginSuccess();
			} else {
				alert("wrong credentials");
			}
		});
	};

	const clearEmailField = () => {
		setEmail("");
	};
	const clearPassField = () => {
		setPassword("");
	};
	return (
		<Form onSubmit={onSubmit}>
			<Col md={12}>
				<FormGroup>
					<Label for="exampleEmail" className="label">
						Email
					</Label>
					<Input
						id="exampleEmail"
						name="email"
						placeholder="Enter email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{
							width: "40%",
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
				</FormGroup>
			</Col>
			<Col md={12}>
				<FormGroup>
					<Label for="examplePassword" className="label">
						Password
					</Label>
					<Input
						id="examplePassword"
						name="password"
						placeholder="password placeholder"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={{
							width: "40%",
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
		</Form>
	);
};

export default LoginForm;

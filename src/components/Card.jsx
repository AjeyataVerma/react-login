import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	userDataFailure,
	userDataInitiate,
	userDataSuccess,
} from "../redux/users/action";
import { useDispatch, useSelector } from "react-redux";

import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import {
	Card,
	CardBody,
	CardImg,
	CardTitle,
	CardText,
	Button,
	Container,
} from "reactstrap";

const Users = () => {
	//const { imgAltText, imgSrcUrl, cardTitle, description } = props;
	//const [users, setUsers] = useState("");
	const users = useSelector((state) => state.user);
	const dispatch = useDispatch();
	console.log(users);
	let navigate = useNavigate();
	const { userId } = useParams();

	useEffect(() => {
		dispatch(userDataInitiate());
		fetch("https://reqres.in/api/users/")
			.then((response) => response.json())
			//.then((json) => console.log(json))
			.then((res) => dispatch(userDataSuccess(res.data)))
			//.then((data) => setUsers(data))
			.catch((err) => console.log(err));

		console.log(users);
	}, []);
	return (
		<>
			<h1 className="h1">Users</h1>
			<Container className="text-center my-3">
				<Button
					className="mx-2"
					color="primary"
					type="submit"
					onClick={() => {
						//deleteInvoice(invoice.number);
						navigate("/login");
					}}
				>
					Logout
				</Button>
			</Container>
			<div className="flex">
				{users.userData.map((user) => {
					return (
						// <CardGroup>
						<Card>
							<div key={user.id}>
								<CardImg
									alt={user.avatar}
									src={user.avatar}
									top
									style={{
										width: "40%",
										height: "40%",
										marginLeft: "30%",
										textAlign: "center",
										marginTop: "5%",
									}}
								/>
								<CardBody>
									<CardTitle
										tag="h5"
										style={{ textAlign: "center" }}
										onClick={() => {
											//deleteInvoice(invoice.number);
											navigate(`/users/${user.id}`);
										}}
									>
										{user.first_name}
									</CardTitle>

									<CardText style={{ textAlign: "center" }}>
										{user.email}
									</CardText>
								</CardBody>
							</div>
						</Card>
						//</CardGroup>
					);
				})}
			</div>
		</>
	);
};

export default Users;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

const Users = (props) => {
	//const { imgAltText, imgSrcUrl, cardTitle, description } = props;
	const [users, setUsers] = useState("");
	let navigate = useNavigate();
	const { userId } = useParams();

	const f = async () => {
		const res = await fetch("https://reqres.in/api/users/");
		const json = await res.json();
		setUsers(json.data);
	};
	useEffect(() => {
		f();
	}, [userId]);
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
				{users.length &&
					users.map((user) => {
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

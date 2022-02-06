import { useState, useEffect } from "react";
import "../App.css";

import {
	Card,
	CardBody,
	CardImg,
	CardTitle,
	CardText,
	CardGroup,
} from "reactstrap";

const ProjectCard = (props) => {
	//const { imgAltText, imgSrcUrl, cardTitle, description } = props;
	const [users, setUsers] = useState("");
	const f = async () => {
		const res = await fetch("https://reqres.in/api/users/");
		const json = await res.json();
		setUsers(json.data);
	};
	useEffect(() => {
		f();
	}, []);
	return (
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
									<CardTitle tag="h5" style={{ textAlign: "center" }}>
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
	);
};

export default ProjectCard;

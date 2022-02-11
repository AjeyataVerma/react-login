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

const Blogs = () => {
	const [posts, setPosts] = useState("");
	let navigate = useNavigate();
	const { userId } = useParams();

	const f = async () => {
		const res = await fetch("https://jsonplaceholder.typicode.com/posts");
		const json = await res.json();
		setPosts(json.data);
	};
	useEffect(() => {
		f();
	}, [userId]);

	return (
		<>
			<h1 className="h1">Blogs</h1>
			<div className="flex">
				{posts.length &&
					posts.map((post) => {
						return (
							// <CardGroup>
							<Card>
								<div key={post.id}>
									<CardBody>
										<CardTitle
											tag="h5"
											style={{ textAlign: "center" }}
											// onClick={() => {
											// 	//deleteInvoice(invoice.number);
											// 	navigate(`/users/${user.id}`);
											// }}
										>
											{post.title}
										</CardTitle>

										<CardText style={{ textAlign: "center" }}>
											{post.body}
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

export default Blogs;

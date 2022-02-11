import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Blogs = () => {
	const [posts, setPosts] = useState([]);
	let navigate = useNavigate();
	// const { id } = useParams();
	// console.log(id);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((response) => response.json())
			//.then((json) => console.log(json))
			.then((data) => setPosts(data))
			.catch((err) => console.log(err));
	}, []);
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
											onClick={() => {
												//deleteInvoice(invoice.number);
												navigate(`/blogs/${post.id}`);
											}}
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

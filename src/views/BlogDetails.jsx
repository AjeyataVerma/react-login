import { useParams } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";

export default function BlogDetails() {
	const { id } = useParams();
	console.log(id);

	const [postData, setPostData] = useState();

	useEffect(() => {
		const requestOptions = {
			//method: "PUT",
			headers: { "Content-Type": "application/json" },
		};
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => setPostData(data))
			.catch((err) => console.log(err));
	}, [id]);

	if (!postData) {
		return <div>Loading...</div>;
	}
	return (
		// <h1>hi</h1>
		<div>
			<h2>{postData.title}</h2>
			<p>{postData.body}</p>
		</div>
	);
}

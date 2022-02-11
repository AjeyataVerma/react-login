import { useParams } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";

export function UserDetails() {
	// const dispatch = useDispatch()
	// const userData = useSelector((state) => state.userDetailsReducer)
	const { userId } = useParams();
	console.log(userId);

	// useEffect(() => {
	// 	getApi(`https://reqres.in/api/users/${userId}`)
	// 		.then((data) => dispatch(setUserDetails(data.data)))
	// 		.catch((err) => console.log(err))

	// 	return () => dispatch(clearUserDetails())
	// }, [userId, dispatch])

	const [userData, setUserData] = useState();

	useEffect(() => {
		const requestOptions = {
			//method: "POST",
			headers: { "Content-Type": "application/json" },
		};
		fetch(`https://reqres.in/api/users/${userId}`, requestOptions)
			.then((response) => response.json())
			.then((data) => setUserData(data.data))
			.catch((err) => console.log(err));
	}, [userId]);

	if (!userData) {
		return <div>Loading...</div>;
	}
	return (
		// <h1>hi</h1>
		<div>
			<h2>
				{userData.first_name} {userData.last_name}
			</h2>
			<div style={{ display: "flex" }}>
				<img
					style={{ height: 100, margin: 10 }}
					alt="avatar"
					src={userData.avatar}
				></img>
				<div>
					<div>ID: {userData.id}</div>
					<div>Email: {userData.email}</div>
				</div>
			</div>
		</div>
	);
}

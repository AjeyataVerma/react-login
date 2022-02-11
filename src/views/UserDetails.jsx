import { useParams } from "react-router-dom";
import { useState, useReducer, useEffect } from "react";
import {
	userDataFailure,
	userDataInitiate,
	userDataSuccess,
} from "../redux/users/action";
import { useDispatch, useSelector } from "react-redux";

export function UserDetails() {
	const { userId } = useParams();
	console.log(userId);

	//const [userData, setUserData] = useState();
	const userData = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(userDataInitiate());
		const requestOptions = {
			//method: "POST",
			headers: { "Content-Type": "application/json" },
		};
		fetch(`https://reqres.in/api/users/${userId}`, requestOptions)
			.then((response) => response.json())
			//.then((data) => setUserData(data.data))
			.then((res) => dispatch(userDataSuccess(res.data)))
			.catch((err) => console.log(err));
	}, [userId]);
	console.log(userData.userData.first_name);
	if (!userData) {
		return <div>Loading...</div>;
	}
	return (
		// <h1>hi</h1>
		<div>
			<h2>
				{userData.userData.first_name} {userData.userData.last_name}
			</h2>
			<div style={{ display: "flex" }}>
				<img
					style={{ height: 100, margin: 10 }}
					alt="avatar"
					src={userData.userData.avatar}
				></img>
				<div>
					<div>ID: {userData.userData.id}</div>
					<div>Email: {userData.userData.email}</div>
				</div>
			</div>
		</div>
	);
}

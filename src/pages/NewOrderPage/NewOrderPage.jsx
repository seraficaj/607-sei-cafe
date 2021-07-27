import { useState, useEffect } from "react";

export default function NewOrderPage() {
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		console.log("NewOrderPage Rendered");
	});

	useEffect(() => {
		console.log("useEffect with dependency array ran!");
	}, [menuItems]);

	return (
		<>
			<h1>NewOrderPage</h1>
			<button onClick={() => setMenuItems(Date.now())}>
				Trigger Re-render
			</button>
		</>
	);
}

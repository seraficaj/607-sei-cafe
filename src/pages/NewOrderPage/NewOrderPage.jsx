import { useState, useEffect } from 'react';
import * as itemsAPI from '../../utilities/items-api';

export default function NewOrderPage() {
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		async function getItems() {
			const items = await itemsAPI.getAll();
			setMenuItems(items);
		}
		getItems();
	}, []);

	return (
		<>
			<h1>NewOrderPage</h1>
			<button onClick={() => setMenuItems(Date.now())}>
				Trigger re-render
			</button>
		</>
	);
}

import { useState, useEffect } from "react";
import * as itemsApi from '../../utilities/items-api';

export default function NewOrderPage() {
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
    async function getItems() {
      const items = await itemsApi.getAll();
      setMenuItems(items);
    }
    getItems();
	}, []);

	return (
		<>
			<h1>NewOrderPage</h1>
			<button onClick={() => setMenuItems(Date.now())}>
				Trigger Re-render
			</button>
		</>
	);
}

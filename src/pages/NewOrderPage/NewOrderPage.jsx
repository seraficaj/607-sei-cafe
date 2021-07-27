import { useState, useEffect, useRef } from "react";
import * as itemsApi from "../../utilities/items-api";
// Add the component imports
import "./NewOrderPage.css";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import MenuList from "../../components/MenuList/MenuList";
import CategoryList from "../../components/CategoryList/CategoryList";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import UserLogOut from "../../components/UserLogOut/UserLogOut";

export default function NewOrderPage({user, setUser}) {
	const [menuItems, setMenuItems] = useState([]);
  // Add state to track active Category
  const [activeCat, setActiveCat] = useState('');
	// Create and initialize the ref to an empty array
	const categoriesRef = useRef([]);

	useEffect(() => {
		async function getItems() {
			const items = await itemsApi.getAll();
			categoriesRef.current = items.reduce((cats, item) => {
				const cat = item.category.name;
				return cats.includes(cat) ? cats : [...cats, cat];
			}, []);
			setMenuItems(items);
      // Add this line to initialize the active category
      setActiveCat(items[0].category.name);
		}
		getItems();
	}, []);

	return (
		<main className="NewOrderPage">
			<aside>
				<Logo />
				<CategoryList
					categories={categoriesRef.current}
					activeCat={activeCat}
					setActiveCat={setActiveCat}
				/>
				<Link to="/orders" className="button btn-sm">
					PREVIOUS ORDERS
				</Link>
				<UserLogOut user={user} setUser={setUser} />
			</aside>
			<MenuList
				menuItems={menuItems.filter(
					(item) => item.category.name === activeCat
				)}
			/>
			<OrderDetail />
		</main>
	);
}

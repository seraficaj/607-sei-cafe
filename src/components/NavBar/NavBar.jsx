import {NavLink} from 'react-router-dom';

function NavBar({ user }) {
	return (
		<nav>
			<Link to='/orders'>Order History</Link>
			&nbsp; | &nbsp;
			<Link to='/orders/new'>New Order</Link>
			&nbsp; | &nbsp;
			<span>
				<b>Welcome, {user.name}</b>
			</span>
		</nav>
	);
}

export default NavBar;

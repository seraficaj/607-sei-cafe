<<<<<<< HEAD
import { Link } from 'react-router-dom';
// We can call any exported function with this import as userService
import * as usersService from '../../utilities/users-service';

function NavBar({ user, setUser }) {
	// Add the following function
	function handleLogOut() {
		// Delegate to the users-service
		usersService.logOut();
		// Update the state will also cause a re-render
		setUser(null);
	}
=======
import {NavLink} from 'react-router-dom';
>>>>>>> 316da06db16768fcb2d2baf251edba5db8c79c7d

	return (
		<nav>
			<Link to='/orders'>Order History</Link>
			&nbsp; | &nbsp;
			<Link to='/orders/new'>New Order</Link>
			&nbsp; | &nbsp;
			<span>
				<b>Welcome, {user.name}</b>
			</span>
			&nbsp; | &nbsp;
			<Link to='' onClick={handleLogOut}>
				Log Out
			</Link>
		</nav>
	);
}

export default NavBar;

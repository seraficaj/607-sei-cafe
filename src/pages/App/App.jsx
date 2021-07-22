import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import './App.css';

function App() {
	const [user, setUser] = useState({});
	return (
		<main className='App'>
			{user ? (
				<Switch>
					<Route path='/orders/new'>
						<NewOrderPage />
					</Route>
					<Route path='/orders'>
						<OrderHistoryPage />
					</Route>
				</Switch>
			) : (
				<AuthPage />
			)}
		</main>
	);
}

export default App;

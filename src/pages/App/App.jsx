<<<<<<< HEAD
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

function App() {
	const [user, setUser] = useState(getUser());
	return (
		<main className='App'>
			{user ? (
				<>
					<NavBar user={user} />
					<Switch>
						<Route path='/orders/new'>
							<NewOrderPage />
						</Route>
						<Route path='/orders'>
							<OrderHistoryPage />
						</Route>
						<Redirect to='/orders' />
					</Switch>
				</>
			) : (
				<AuthPage setUser={setUser} />
			)}
		</main>
	);
=======
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import NavBar from "../../components/NavBar/NavBar";
import OrderHistoryPage from "../OrderHistoryPage.jsx/OrderHistoryPage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar />
          <Switch>
            <Route path="/orders/new">
              <NewOrderPage />
            </Route>
            <Route path="/orders">
              <OrderHistoryPage />
            </Route>
            <Redirect to="/orders" />
          </Switch>
        </>
      ) : (
        <AuthPage />
      )}
    </main>
  );
>>>>>>> cc9a93c4b76c4fcce5e6c92294d242d15637178f
}

export default App;

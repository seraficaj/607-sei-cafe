import {useState} from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

<<<<<<< HEAD
function AuthPage({ setUser }) {
	return (
		<main>
			<h1>AuthPage</h1>
			<SignUpForm setUser={setUser} />
		</main>
	);
=======
const AuthPage = () => {
  return(
    <main>
    <h1>AUTH PAGE</h1>
    <SignUpForm />
    </main>
  )
>>>>>>> cc9a93c4b76c4fcce5e6c92294d242d15637178f
}

export default AuthPage;

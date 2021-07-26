function OrderHistoryPage() {
	async function handleCheckToken() {
		alert('clicked');
	}

	return (
		<>
			<h1>OrderHistoryPage</h1>
			<button onClick={handleCheckToken}>
				Check When My Login Expires
			</button>
		</>
	);
}

export default OrderHistoryPage;

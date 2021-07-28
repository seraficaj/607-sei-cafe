const Order = require('../../models/order');
// const Item = require('../../models/item');

module.exports = {
	cart,
	addToCart,
	setItemQtyInCart,
	checkout,
};

async function cart(req, res) {
	// A cart is the unpaid order for a user
	const cart = await Order.getCart(req.user._id);
	// below is how we could get a cart without static methods
	// let cart = await Order.findOne({ user: req.user._id, isPaid: false });
	// if (!cart) {
	// 	cart = await Order.create({ user: req.user._id });
	// }
	res.json(cart);
}

async function addToCart(req, res) {
	// Add the item to the cart
	const cart = await Order.getCart(req.user._id);
	// The promise resolves to the document, which we already have in the cart variable,
	// so no need to create another variable...
	await cart.addItemToCart(req.params.id);
	res.json(cart);
}

// Updates an item in the cart's qty
async function setItemQtyInCart(req, res) {}

async function checkout(req, res) {
	// Update the cart's isPaid property to true
}

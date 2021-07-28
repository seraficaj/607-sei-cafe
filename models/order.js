const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Require the itemSchema
const itemSchema = require('./itemSchema');

const lineItemSchema = new Schema(
	{
		// Set qty to 1 when new item pushed into lineItems
		qty: {
			type: Number,
			default: 1,
		},
		item: itemSchema,
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

// Add an extPrice to the line item
lineItemSchema.virtual('extPrice').get(function () {
	// 'this' is bound to the lineItem subdocument
	return this.qty * this.item.price;
});

const orderSchema = new Schema(
	{
		// An order belongs to a user (user is referenced)
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		// Embed an order's line items (pretending we already have the lineItemSchema available as a variable)
		lineItems: [lineItemSchema],
		// A user's unpaid order is their "cart", add an isPaid property that is Boolean and defaults to false
		isPaid: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

// orderTotal: Used to compute the total of the order.
orderSchema.virtual('orderTotal').get(function () {
	return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});
// totalQty: Used to compute the total number of items in the order, taking quantity into consideration.
orderSchema.virtual('totalQty').get(function () {
	return this.lineItems.reduce((total, item) => total + item.qty, 0);
});
// orderId: Used to compute a user friendly order id from the lengthy _id of the order document.
orderSchema.virtual('orderId').get(function () {
	return this.id.slice(-6).toUpperCase();
});

// statics are callable on the model, not the instance (document)
orderSchema.statics.getCart = async function (userId) {
	// 'this' is bound to the model (don't use an arrow function)
	// return the promise that resolves to a cart (the user's unpaid order)
	return this.findOneAndUpdate(
		// query
		{ user: userId, isPaid: false },
		// update  - in the case the order (cart) is upserted
		{ user: userId },
		// upsert option creates the doc if it doesn't exist!
		{ upsert: true, new: true }
	);
};

// Instance method for adding an item to a cart (unpaid order)
orderSchema.methods.addItemToCart = async function (itemId) {
	// this keyword is bound to the cart (order doc)
	const cart = this;
	// Check if the item already exists in the cart
	const lineItem = cart.lineItems.find(lineItem =>
		lineItem.item._id.equals(itemId)
	);
	if (lineItem) {
		// It already exists, so increase the qty
		lineItem.qty += 1;
	} else {
		// Get the item from the "catalog"
		const item = await mongoose.model('Item').findById(itemId);
		cart.lineItems.push({ item });
	}
	// return the save() method's promise
	return cart.save();
};

// Instance method to set an item's qty in the cart (will add item if does not exist)
orderSchema.methods.setItemQty = async function (itemId, newQty) {
	// this keyword is bound to the cart (order doc)
	const cart = this;
	// Find the line item in the cart for the menu item
	const lineItem = cart.lineItems.find(lineItem =>
		lineItem.item._id.equals(itemId)
	);
	if (lineItem && newQty <= 0) {
		// Calling remove, removes itself from the cart.lineItems array
		lineItem.remove();
	} else if (lineItem) {
		// set the new qty - positive value is assured thanks to previous if
		lineItem.qty = newQty;
	}
	// return the save() method's promise
	return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);

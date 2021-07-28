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
            virtuals: true
        }
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

module.exports = mongoose.model('Order', orderSchema);

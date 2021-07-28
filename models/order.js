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
	}
);

module.exports = mongoose.model('Order', orderSchema);

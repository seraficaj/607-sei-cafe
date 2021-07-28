const Schema = require("mongoose").Schema;

const itemSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		emoji: String,
		// Category needs to be a ref to category model
		// Object ID is inside the Types object which is in the Schema Object
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		// price needs to be a number, required, and default value of 0
    price: {
      type: Number,
      default: 0,
      required: true
    }
	},
	{
		timestamps: true,
	}
);

module.exports = itemSchema;

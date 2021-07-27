const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		sort: Number,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Category", categorySchema);

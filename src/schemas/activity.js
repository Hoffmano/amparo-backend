import mongoose from "mongoose";

const activity = new mongoose.Schema(
	{
		cpf: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("activity", activity);

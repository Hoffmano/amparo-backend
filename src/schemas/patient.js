import mongoose from "mongoose";

const patient = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		cpf: {
			type: Number,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("patient", patient);

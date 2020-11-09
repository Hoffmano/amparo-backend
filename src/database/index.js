import mongoose from "mongoose";

class database {
	constructor() {
		this.mongo();
	}

	mongo() {
		this.mongo_connection = mongoose.connect(
			"mongodb+srv://admin:admin@cluster0.4uplj.mongodb.net/amparo?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useFindAndModify: true,
				useUnifiedTopology: true,
			}
		);
	}
}

// module.exports = new database();
export default new database();

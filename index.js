const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3200;

app.use(cors());
app.use(express.json());

const uri = ``;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		const UserCollection = client.db("learn-backend-04").collection("users");

		app.get("/users", async (raquest, response) => {
			const queryUsers = {};
			const coursor = UserCollection.find(queryUsers);
			const users = await coursor.toArray();
			response.send(users);
		});

		app.post("/users", async (request, response) => {
			const user = request.body;
			const result = await UserCollection.insertOne(user);
			response.send(result);
		});

		app.put("/users/:id", async (request, response) => {
			const id = request.params.id;
			const query = { _id: new ObjectId(id) };
			const user = request.body;
			const option = { upsert: true };
			const updateUser = {
				$set: {
					userName: user.userName,
					age: user.age,
					profession: user.profession,
					email: user.email,
					address: user.address,
					slack: user.slack,
				},
			};

			const result = await UserCollection.updateOne(query, updateUser, option);
			response.send(result);
		});

		app.delete("/users/:id", async (reauest, response) => {
			const id = reauest.params.id;
			const query = { _id: new ObjectId(id) };
			const result = await UserCollection.deleteOne(query);
			response.send(result);
		});
	} finally {
	}
}

run().catch(console.dir);

app.get("/", (request, response) => {
	response.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

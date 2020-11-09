import Router from "express";
import controller from "./controllers/controller.js";
import patient_mongo from "./schemas/patient.js";
import activity_mongo from "./schemas/activity.js";

const router = Router();

router.get("/filter-activities", async (request, response) => {
	const { cpf_filter, status_filter, date_filter } = request.query;

	let patients_activities = await patient_mongo.aggregate([
		{
			$lookup: {
				from: "activities",
				localField: "cpf",
				foreignField: "cpf",
				as: "activities",
			},
		},
	]);

	let activities = [];

	patients_activities.forEach((patient) => {
		patient.activities.map((activity) => {
			activities.push({
				id: activity._id,
				name: patient.name,
				cpf: patient.cpf,
				description: activity.description,
				status: activity.status,
				date: JSON.parse(JSON.stringify(activity.date)),
			});
		});
	});

	console.log(activities);

	if (cpf_filter != (undefined || null)) {
		activities = activities.filter(
			(activity) => activity.cpf == cpf_filter
		);
	}
	if (status_filter != (undefined || null)) {
		activities = activities.filter(
			(activity) => activity.status == status_filter
		);
	}
	if (date_filter != (undefined || null)) {
		activities = activities.filter(
			(activity) => activity.date === date_filter
		);
	}

	return response.json({ activities });
});

router.get("/get-activities", async (request, response) => {
	const patients_activities = await patient_mongo.aggregate([
		{
			$lookup: {
				from: "activities",
				localField: "cpf",
				foreignField: "cpf",
				as: "activities",
			},
		},
	]);

	let activities = [];

	patients_activities.forEach((patient) => {
		patient.activities.map((activity) => {
			activities.push({
				id: activity._id,
				name: patient.name,
				cpf: patient.cpf,
				description: activity.description,
				status: activity.status,
				date: activity.date,
			});
		});
	});

	return response.json({ activities });
});

router.get("/get-patients", async (request, response) => {
	const patients = await patient_mongo.find();

	return response.json(patients);
});

router.get("/get-autocomplete", async (request, response) => {
	const patients = await patient_mongo.find();

	let names_cpfs = [];

	patients.map((patient) => {
		names_cpfs.push(patient.name);
		names_cpfs.push((patient.cpf).toString());
	});

	return response.json(names_cpfs);
});

router.get("/cpf-exist", async (request, response) => {
	const cpf = request.query.cpf;

	const patients = await patient_mongo.find();

	let activities = [];

	patients.map((patient) => {
		activities.push({
			cpf: patient.cpf,
		});
	});

	if (cpf != (undefined || null)) {
		activities = activities.filter((activity) => activity.cpf == cpf);
	}

	if (activities.length != 0) {
		return response.json({ cpf_exist: true });
	} else {
		return response.json({ cpf_exist: false });
	}
});

router.post("/new-patient", async (request, response) => {
	const { name, cpf } = request.body;

	const new_patient = await patient_mongo
		.create({
			name,
			cpf,
		})
		.catch((Error) => {
			console.log(Error);
		});

	return response.json({ new_patient });
});

router.post("/new-activity", async (request, response) => {
	console.log(request.body);
	const { cpf, date, description, status } = request.body;

	const new_activity = await activity_mongo.create({
		cpf,
		date,
		description,
		status,
	});

	return response.json({ new_activity });
});

router.post("/update-activity", async (request, response) => {
	const { id, status } = request.body;

	const updated_activity = await activity_mongo.updateOne(
		{ _id: id },
		{
			$set: { status: status },
		}
	);

	return response.json({ updated_activity });
});

export default router;

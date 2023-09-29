import axios from "axios";

const BASE_URL =
	process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Module.
 *
 * A collection of methods used to get/send to to the API.
 */

// the token for interactive with the API will be stored here.
let token;

//Temporary token set for development
// token =
// 	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNjk0NjMwODY3fQ.15-FHz2uX2U8HSGdimQPoXSnU3BtCAJS4foFR-qwcYY";

function setApiToken(newToken) {
	token = newToken;
}

async function request(endpoint, data = {}, method = "get") {
	console.debug("API Call:", endpoint, data, method);

	const url = `${BASE_URL}/${endpoint}`;
	// const url = `${proxyPrefix}/${endpoint}`;
	const headers = { Authorization: `Bearer ${token}` };
	const params = method === "get" ? data : {};

	try {
		return (await axios({ url, method, data, params, headers })).data;
	} catch (err) {
		console.error("API Error:", err.response);
		let message = err.response.data.error.message;
		throw Array.isArray(message) ? message : [message];
	}
}

// Individual API routes

async function loginApi({ username, password }) {
	let res = await request("auth/token", { username, password }, "post");
	return res.token;
}

async function getUser(username) {
	let res = await request(`users/${username}`);
	return res.user;
}

async function signupApi(data) {
	let res = await request(`auth/register`, data, "post");
	return res.token;
}

/** Update Current User
 *
 *  Data can include:
 *   { firstName, lastName, password, email }
 * Returns { username, firstName, lastName, email }
 *
 */
async function updateUser(username, data) {
	let res = await request(`users/${username}`, data, "patch");
	return res.user;
}

async function momentCreateApi(data) {
	let res = await request(`moments/`, data, "post");
	return res.moment;
}

async function momentGetApi(momentId) {
	let res = await request(`moments/${momentId}`);
	return res.moment;
}

async function momentGetAllApi() {
	let res = await request(`moments/`);
	return res.moment;
}

export {
	setApiToken,
	signupApi,
	loginApi,
	getUser,
	momentCreateApi,
	momentGetApi,
	momentGetAllApi,
};
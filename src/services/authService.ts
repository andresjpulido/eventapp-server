import { Service } from "typedi";
import userService from "./userService";
import { Container } from "typedi";

import { createToken } from "../services/jwt";

@Service()
export default class authService {
	constructor() {}

	public async signup(user) {
		const serviceInstance = Container.get(userService);

		try {
			//validate user doesnt exist
			let savedUser = await serviceInstance.create(user);
 
			let token = await createToken(user.email, savedUser.id, user.username);
			 
			delete savedUser._doc.password
			delete savedUser._doc.updatedAt
		 
			let result = { user:savedUser._doc , token:token}
			  
			return result;
		} catch (e) {
			console.log(e);
		}
	}

	public async signin(user) {
		const serviceInstance = Container.get(userService);

		try {
			//validate user doesnt exist
			let savedUser = await serviceInstance.get(user);

			let token = createToken(user.email, user.id, user.username);

			return { ...savedUser,   token: token };
		} catch (e) {
			console.log(e);
		}
	}

}

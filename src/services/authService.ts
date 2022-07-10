import { Service } from "typedi";
import userService from "./userService";
import { Container } from "typedi";

import { createToken, decodeToken } from "../services/jwt";
import { userModel } from "../db/models";

@Service()
export default class authService {
	constructor() {}

	public async signup(user) {
		const serviceInstance = Container.get(userService);

		try {
			//validate user doesnt exist
			let savedUser = await serviceInstance.create(user);
 
			let token = await createToken(user.email, savedUser.id, user.name);
			 
			delete savedUser._doc.password
			delete savedUser._doc.updatedAt
		 
			let result = { user:savedUser._doc , token:token}
			  console.log("resulr ####", result)
			return result;
		} catch (e) {
			console.log(e);
		}
	}

	public async signin(queryObj) {
		const serviceInstance = Container.get(userService);
		let token = "";

		try {
			//validate user doesnt exist

			console.log("User::",queryObj)
			let savedUser = await userModel.find({email:queryObj.email});

			console.log("savedUser::",savedUser)

			if(savedUser.length ===1){
				let user = savedUser[0];
				console.log("user found ", user)

				let exist = await user.matchPassword(queryObj.password)
				if(exist){
					token = createToken(user.email, user._id, user.username);
					return { user,   token: token };
	
				}else{
					console.log("clave no valida")
				}
 			}

			return null
			

		} catch (e) {
			console.log(e);
		}
	}

	public async whoami(token) {
		const serviceInstance = Container.get(userService);

		try {
			let id = decodeToken(token);
 
			let queryObj = {
				_id: id
			}
			let user = await serviceInstance.get(queryObj); 

			return user;

		} catch (e) {
			console.log(e);
			return null;
		}
	}
}

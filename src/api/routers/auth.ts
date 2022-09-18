import authService from "../../services/authService";
import { Container } from "typedi";

export default (app) => {
  app.post("/signup", async (req, res, next) => {
    const { password, passwordConfirmation, email, name } = req.body;
    const serviceInstance = Container.get(authService);

    //validate input
    let user = {
      name: name,
      password: password,
      email: email,
    };

    let userBD = await serviceInstance.signup(user);

    return res.json(userBD);
  });

  app.post("/signin", async (req, res, next) => {
    let user = {};
    console.log(req.query, req.body);
    try {
      const queryObj = req.body;
      const serviceInstance = Container.get(authService);

      user = await serviceInstance.signin(queryObj);
    } catch (e) {
      console.log(e);
    }
    console.log("user", user);

    if (!user) return res.status(404).send({ code: "", message: "" });

    return res.status(200).send(user);
  });

  app.post("/signout", async (req, res, next) => {
    try {
      //TODO implement tokens blacklist
    } catch (e) {
      console.log(e);
    }
    return res.json(true);
  });

  app.post("/whoami", async (req, res, next) => {
    let token = req.body.token;
    const serviceInstance = Container.get(authService);

    let userBD = await serviceInstance.whoami(token);

    if (userBD !== null) return res.json(userBD[0]);
    else return res.json({});
  });
};

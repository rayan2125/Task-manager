import UserServices from "../service/userService.js";

export const createUserHandler = async (req, res) => {
    try {
        const user = await UserServices.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(error.status).send({ error: error.message });
    }
};
export const userLoginHandler = async (req, res) => {
    try {
        const user = await UserServices.userLogin(req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(error.status).send({ error: error.message });
    }
}




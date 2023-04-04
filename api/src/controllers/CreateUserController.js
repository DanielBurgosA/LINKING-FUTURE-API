const { createUser } = require("../handlers/CreateUserHandler");
const {enviarCorreo} = require("./NotificationController")

const createUserController = async (req, res) => {
    const { user_email, user_name, user_lastname, user_password } =
      req.body;
    try {
      const postUser = await createUser(
        user_email,
        user_name,
        user_lastname,
        user_password
      );
      const mensaje = `Hola ${user_name} ${user_lastname}, gracias por unirte a nuestra comunidad`

      enviarCorreo(user_email, "¡bienvenido!", mensaje, "createUser")
      res.status(200).json(postUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {createUserController};
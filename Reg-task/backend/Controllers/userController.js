// const User = require("../Controllers/userController");
// const app = express();
// const port = 8060;
// app.use(express.json());
// app.use(cors());

// exports.SignIn = async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   });
//   if (user) {
//     return res.json({ status: "ok", user: true });
//   } else {
//     res.json({ status: "err", user: false });
//   }
// };

// exports.SignUp = async (req, res) => {
//   try {
//     await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       confirmPassword: req.body.confirmPassword,
//     });
//     res.json({ status: "ok" });
//   } catch (err) {
//     res.json({ status: "err", err: "dublicated-email" });
//   }
// };

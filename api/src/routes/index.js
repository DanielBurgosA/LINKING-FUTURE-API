const { Router } = require("express");
const passport = require("passport");

const router = Router();
const { allProjectsController, userProjectsController } = require("../controllers/AllProjectsController");
const { createProjectController } = require("../controllers/CreateProjectController");
const { deleteProjectController } = require("../controllers/DeleteProjectController");
const { createUserController } = require("../controllers/CreateUserController");
const { createAdminController } = require('../controllers/CreateAdminController');
const { createDonationController } = require('../controllers/createDonationController');
const { createComunidadController } = require('../controllers/CreateComunidadController');
const { createBankInfoController } = require('../controllers/CreateBankInfoController');
const { allAdminsController } = require('../controllers/AllAdminController');
const { allBankInfoController } = require('../controllers/AllbankInfosController');
const { allComunidadesController } = require('../controllers/AllComunidadesController');
const { allDonationsController } = require('../controllers/AllDonationsController');
const { allUsersController } = require('../controllers/AllUsersController');
const { createPayment, executePayment } = require('../controllers/CreatePaymentController')
const { logInController } = require('../controllers/LogInController')
const { putBankInfoController } = require('../controllers/PutBankInfoController');
const { putComunidadController } = require('../controllers/PutComunidadController');
const { putProjectController } = require('../controllers/PutProjectController');
const { putUserController } = require('../controllers/PutUserController');
const { deleteUserController } = require('../controllers/DeleteUserController');
const { deletebankInfoController } = require('../controllers/DeleteBankInfoController');
const { deleteComunidadController } = require('../controllers/DeleteComunidadController');
const { GoogleCallBackController } = require('../controllers/GoogleCallBackController')
const { ForgotPasswordController } = require("../controllers/ForgotPasswordController")
const { ResetPasswordController } = require("../controllers/ResetPasswordController")
const { commentsController } = require('../controllers/commentsController');
const { getCommentsByProjectIdController } = require('../controllers/getCommentsByProjectIdController')
const { getCommentsByUserIdController } = require('../controllers/getCommentsByUserIdController')
const { UserDataController } = require("../controllers/UserDataController");
const { banUserController } = require("../controllers/banUserController");
const { userDonationController } = require("../controllers/userDonationController");
const { getAllCommentsController } = require("../controllers/getAllCommentsController")
const { banCommentController } = require("../controllers/banCommentController");
const { getUserProjectsController } = require("../controllers/getUserProjectsController")
const { projectByIdController } = require("../controllers/ProjectByIdController");
const { putImageController } = require("../controllers/PutImageController")




//--------------------GENERAL--------------------------------
router.get("/userprojects", userProjectsController);
router.post("/login", logInController);
router.get("/projects/:id", projectByIdController);
router.get("/banValidation", passport.authenticate("jwt", { session: false }), 
  (req, res) => { res.status(200).json("ok")})
//--------------------PASSWORD RECOVERY--------------------------------
router.post("/forgotPassword", ForgotPasswordController);
router.put("/reset", ResetPasswordController);
//--------------------USERS--------------------------------
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  UserDataController
);
router.get("/user/donations", passport.authenticate("jwt", { session: false }), userDonationController)
router.put("/users",passport.authenticate("jwt", { session: false }), putUserController);
router.get("/user/projects", passport.authenticate("jwt", { session: false }), getUserProjectsController)
router.put("/imageUser", passport.authenticate("jwt", { session: false }), putImageController);

//--------pago
router.post(
  "/donations",
  passport.authenticate("jwt", {
    failureRedirect: "https://client-pf-seven.vercel.app/login",
    session: false,
  }),
  createDonationController
);
router.post(
  "/create-payment",
  passport.authenticate("jwt", { session: false }),
  createPayment
);
router.get("/execute-payment", executePayment);
//--------Crear proyecto
router.post(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  createProjectController
);
router.post;
//--------------------ADMIN--------------------------------
router.post("/users", createUserController);
router.get("/users", allUsersController);
router.get("/donations", allDonationsController);
router.get("/projects", allProjectsController);
router.get("/comments/project", getAllCommentsController)
router.put("/deletprojects", deleteProjectController);
router.put("/projects", putProjectController);
router.put("/ban", banUserController);
router.put("/comments", banCommentController);

//--------------------COMMENT--------------------------------
router.post('/comment', passport.authenticate('jwt', { session: false }), commentsController);
router.get('/comments/project/:id', getCommentsByProjectIdController);
router.get('/comments/user/:id', passport.authenticate('jwt', { session: false }), getCommentsByUserIdController);


//NUEVAS RUTAS PUT
// router.put('/bankInfos', putBankInfoController)
// router.put('/comunidads', putComunidadController)
// router.put('/users/delete', deleteUserController)
// router.put('/bankInfos/delete', deletebankInfoController)
// router.put('/comunidads/delete',deleteComunidadController)
// router.put('/projects/delete', deleteProjectController)
// router.get('/admins', allAdminsController)
// router.post('/admins', createAdminController)
// router.get('/bankInfos', allBankInfoController)
// router.post('/bankInfos', createBankInfoController)
// router.get('/comunidads', allComunidadesController)
// router.post('/comunidads', createComunidadController)

//NUEVAS RUTAS DELETE

//------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------
//google auth
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://client-pf-seven.vercel.app/login",
    session: false,
  }),
  GoogleCallBackController
);

router.get("/google/token", (req, res) => {
  console.log("ruta");
  if(req.app.locals.deleted){
    console.log("ruta banned");
    req.app.locals.GoogleToken = null;
    res.status(200).json({ success: false, msg: "user banned" }) 
  }
  else if (req.app.locals.GoogleToken) {
    console.log("ruta no banned");
    res
      .status(200)
      .json({ token: req.app.locals.GoogleToken, origin: "google", user: req.app.locals.user });
  } else {
    res.status(200).json({ msg: "not logged with google"});
  }
});

router.get("google/user", (req, res) => {
  res.status(200).json({user: req.app.locals.user})
})

router.get("/logOut/google", (req, res) => {
  req.app.locals.GoogleToken = null;
  res.status(200).json({ msg: "you are out" });
});
//--------------------------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------------------

module.exports = router;

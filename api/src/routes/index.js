const { Router } = require('express');
const passport = require('passport');


const router = Router();
const {allProjectsController} = require("../controllers/AllProjectsController");
const {createProjectController} = require("../controllers/CreateProjectController");
const {deleteProjectController} = require("../controllers/DeleteProjectController");
const {createUserController} = require("../controllers/CreateUserController");
const { createAdminController } = require('../controllers/CreateAdminController');
const { createDonationController } = require('../controllers/createDonationController');
const { createComunidadController } = require('../controllers/CreateComunidadController');
const { createBankInfoController } = require('../controllers/CreateBankInfoController');
const { allAdminsController } = require('../controllers/AllAdminController');
const { allBankInfoController } = require('../controllers/AllbankInfosController');
const { allComunidadesController } = require('../controllers/AllComunidadesController');
const { allDonationsController } = require('../controllers/AllDonationsController');
const { allUsersController } = require('../controllers/AllUsersController');
const { createPayment, executePayment, cancelPayment } = require('../controllers/CreatePaymentController')
const { logInController } = require('../controllers/LogInController')
const { GoogleCallBackController } = require('../controllers/GoogleCallBackController');
const { putBankInfoController } = require('../controllers/PutBankInfoController');
const { putComunidadController } = require('../controllers/PutComunidadController');
const { putProjectController } = require('../controllers/PutProjectController');
const { putUserController } = require('../controllers/PutUserController');
const { deleteUserController } = require('../controllers/DeleteUserController');
const { deletebankInfoController } = require('../controllers/DeleteBankInfoController');
const { deleteComunidadController } = require('../controllers/DeleteComunidadController');
const { sendEmailController } = require('../controllers/SendEmailController');
    
//----------------------------------------------------
router.post('/users', createUserController)
router.get('/users', allUsersController)
router.get('/admins', allAdminsController)
router.get('/bankInfos', allBankInfoController)
router.get('/comunidads', allComunidadesController)
//----------------------------------------------------
router.put('/projects', deleteProjectController)
router.post('/projects', passport.authenticate('jwt', { session: false }), createProjectController)
//----------------------------------------------------
router.post('/admins', createAdminController)
router.post('/donations', createDonationController) 
router.post('/comunidads', createComunidadController)   
router.post('/bankInfos', createBankInfoController)
//----------------------------------------------------
router.get('/donations', allDonationsController)
router.get('/projects', allProjectsController)
//----------------------------------------------------
router.post('/donations', passport.authenticate('jwt', { failureRedirect: 'http://localhost:3000/login', session: false }), createDonationController)
router.post('/create-payment', createPayment)
router.get('/execute-payment', executePayment)
router.get('/cancel-payment', cancelPayment)
//------------------------------------------------------------------------
//NUEVAS RUTAS PUT
router.put('/bankInfos', putBankInfoController)
router.put('/comunidads', putComunidadController)
router.put('/projects', putProjectController)
router.put('/users', putUserController)

//NUEVAS RUTAS DELETE
router.put('/users/delete', deleteUserController)
router.put('/bankInfos/delete', deletebankInfoController)
router.put('/comunidads/delete',deleteComunidadController)
router.put('/projects/delete', deleteProjectController)

//NUEVAS RUTAS PARA NODEMAILER (ENVIO DE NOTIFICACION POR EMAIL)
router.post('/send-email', sendEmailController)


//------------------------------------------------------------------------
router.post('/login', logInController);
router.get('/login', (req, res) => {
  res.cookie("value", req.app.locals.token, { httpOnly: false, maxAge: 1000 * 60 * 10, });
  res.cookie("success", "true", { httpOnly: false, maxAge: 1000 * 60 * 10, });
  res.redirect("http://localhost:3000/home");

})//con esta ruta logro que las cookies lleguen al puerto 3000 luego de la verificacion con la ruta post

//--------------------------------------------------------------------------

//-----------------------------------------------------------------------------

router.get("/logout", (req, res) =>{
  res.clearCookie("value");
  res.clearCookie("success");
  res.redirect("http://localhost:3000/login");
})//ruta para limpiar las cookies
//------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------
//google auth
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'], session: false }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/home', session: false }),
  GoogleCallBackController
);

//--------------------------------------------------------------------------------------------------------------


module.exports = router;

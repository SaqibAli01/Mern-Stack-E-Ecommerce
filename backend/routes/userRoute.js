const express = require("express");
const { getProductDetails } = require("../controller/productsController");
// <----------------------------------------------Import Files-------------------------------->
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// <----------------------------------------------Import Files-------------------------------->
const router = express.Router();



// <----------------------------------------------router-------------------------------->
//sub files me ny userController.js sy import kia ha
//router name /register ha
//loginUser ko 2nd no pr import kia ha
//logout route
//forgotPassword ko userController.js sy import kia ha
//authorizeRoles("admin") ye function me auth.js me bani ha.. waha sy idr call ki ha me 


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile);
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);
router.route('/admin/user/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);


// <----------------------------------------------end router-------------------------------->

// <----------------------------------------------export Files-------------------------------->
// is file ko app.js me import kry gy
module.exports = router;

// <----------------------------------------------end Export Files-------------------------------->

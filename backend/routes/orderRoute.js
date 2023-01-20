const express = require("express");
const router = express.Router();

//---------------import files-------orderController.js
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrders, deleteOrder } = require("../controller/orderController");

//---------------import files-------middleware auth.js
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");



//------------------------create a router------------------
// /order/:id is route me login hona lazmi ha or admin he order ki details ko dhak skta ha or koe ni url;,,,, http://localhost:3000/api/v1/order/63984e9bd86541e756d2d634
// /orders/me is route me user be apny order ki details ko ly skta ha ..url... http://localhost:3000/api/v1/orders/me
///admin/orders is me sub order dhak skta ha ...http://localhost:3000/api/v1/admin/orders

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, authorizeRoles("admin"), updateOrders);
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

//-----------export ------------
//step 3  is ko app.js me ja k import kr dna ha
module.exports = router;
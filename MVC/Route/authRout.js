import express from "express";
import { createUser, deleteUserController, getSingleUserController, getUsersController, patchUserController, userUpdateController , userLoginController, forgotPasswordController, resetPasswordController} from "../Controllers/authController.js";
import requireSignIn from '../../Helper/middleware/authMiddleware.js'
import formidable from "express-formidable";
import { getProductByIdController, getProductsController, productController } from "../Controllers/ProductController.js";
import { gatewayClientToken, processPayment } from "../Controllers/PaymentController.js";
const router = express.Router();

// Routes for API
router.post("/register", createUser);
router.post("/login", userLoginController)
router.get("/userDetails", getUsersController); 
router.get('getSingle-user/:id',getSingleUserController)
router.put('/update-user/:id', userUpdateController);
router.delete('/delete-user/:id',deleteUserController)
router.patch('/patchUser/:id',patchUserController)
router.post('/forgot-password',forgotPasswordController)
router.post('/reset-password',resetPasswordController)

// product api
router.post("/create-product",formidable(),productController)
router.get("/get-product",getProductsController)
router.get("/get-productbyID",getProductByIdController)

//Payment Routes
router.get('/get-client-token', gatewayClientToken );
router.post("/process-payment", processPayment)

export default router;

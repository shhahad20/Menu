import express from 'express';
import { activateUser, addUser, changeRole, deleteUserById, forgetPassword, getAllUsers, getSingleUser, registerUser, resetPassword, updateUser,
// banUser,
// unbanUser,
 } from '../controllers/userController.js';
import { creatUserValidator, } from '../validation/userValidation.js';
import { runValidation } from '../validation/index.js';
import { isSuperAdmin } from '../middleware/superAdmin.js';
import { isLoggedOut, isLoggenIn } from '../middleware/authentication.js';
const router = express.Router();
// router.get('/', isLoggenIn,isSuperAdmin, getAllUsers);
router.get('/', getAllUsers);
router.get('/:userId', isLoggenIn, isSuperAdmin, getSingleUser);
router.delete('/:userId', isLoggenIn, isSuperAdmin, deleteUserById);
router.post('/registering', creatUserValidator, runValidation, registerUser);
router.post('/add-user', addUser);
router.post('/activate', activateUser);
router.post('/forget-password', isLoggedOut, forgetPassword);
router.post('/reset-password', resetPassword);
router.put('/:userId', updateUser);
router.put('/change-role/:userId', isLoggenIn, isSuperAdmin, changeRole);
// router.post(
//   '/registering',
//   isLoggedOut,
//   creatUserValidator,
//   runValidationUser,
//   upload.single('image'),
//   registerUser
// )
// router.post(
//   '/registering',
//   creatUserValidator,
//   runValidationUser,
//   upload.single('image'),
//   registerUser
// )
// // router.put('/ban/:userId', isLoggenIn, isAdmin, banUser)
// router.put('/ban/:userId', banUser)
// // router.put('/unban/:userId', isLoggenIn, isAdmin, unbanUser)
// router.put('/unban/:userId', unbanUser)
// router.put('/:userId', upload.single('image'), updateUser)
// // router.post('/forget-password', isLoggedOut, forgetPasswordValidator, runValidation, forgetPassword)
export default router;

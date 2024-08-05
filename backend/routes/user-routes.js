const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const userController = require('../controllers/user-controllers');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post(
  '/signup',
  upload.single('profilePicture'),
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })
  ],
  userController.signup
);

router.post('/login', userController.login);

router.get('/profile', authMiddleware, userController.getProfile);

router.patch('/users/:id', authMiddleware, userController.updateUser);

router.post('/:id/profile-picture', authMiddleware, upload.single('profilePicture'), userController.uploadProfilePicture);

module.exports = router;

import express from 'express';
const {
    postRegisteredUser, postLoginUser, checkProfile, postLogout
} = require('../controllers/userController');


const router = express.Router();

router.post("/register", postRegisteredUser);
router.post("/login", postLoginUser);
router.get("/profile", checkProfile);
router.post("/logout", postLogout);


module.exports = router;
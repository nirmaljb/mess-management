const { userLogin, getUser } = require("../controllers/userController");

const express = require("express");
const router = express.Router();

router.get('/', getUser);
router.post('/login', userLogin);

module.exports = router;
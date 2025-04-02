
const express = require("express");
const { submitRequest, getAllRequest, rejectRequest, approveRequest, getUserRequest } = require("../controllers/messReductionController");
const router = express.Router();

router.get('/get-user-request', getUserRequest);
router.get('/get-all-request', getAllRequest);
router.put('/approve-request', approveRequest);
router.put('/reject-request', rejectRequest);
router.post('/request', submitRequest);

module.exports = router;
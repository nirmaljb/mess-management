
const { submitQueries, getAllQueries, getUserQueries, resolveQuery, rejectQuery } = require("../controllers/queryController");
const express = require("express");
const router = express.Router();

router.get('/get-all-queries', getAllQueries);
router.get('/get-user-queries', getUserQueries);
router.put('/resolve-query', resolveQuery);
router.put('/reject-query', rejectQuery);
router.post('/queries', submitQueries);

module.exports = router;
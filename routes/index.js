const express = require('express');
const router = express.Router();
const authRouter = require("./authRoutes");

router.get('/checkHealth',(req, res) => {
    res.sendStatus(200);
});

router.use("/api/auth",authRouter);

module.exports = router;

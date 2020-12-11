const express = require('express');
const authMidd = require('../middlewares/Auth');
const router = express.Router();

router.use(authMidd);

router.get('/', (req, res) => {
  res.send({ ok: true, user: req.userId });
});

module.exports = app => app.use('/validate', router);

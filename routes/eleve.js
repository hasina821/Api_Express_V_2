const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const eleveCtrl = require('../controllers/eleve');

router.get('/list', eleveCtrl.list);
router.all('/get', eleveCtrl.get);


module.exports = router;
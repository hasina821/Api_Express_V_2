const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/test', stuffCtrl.test);
router.get('/testModel', stuffCtrl.getListEleve);
router.get('/', auth.user_connecter, stuffCtrl.getAllStuff);
router.post('/', auth.user_connecter, multer, stuffCtrl.createThing);
router.get('/:id', auth.user_connecter, stuffCtrl.getOneThing);
router.put('/:id', auth.user_connecter, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth.user_connecter, stuffCtrl.deleteThing);


module.exports = router;
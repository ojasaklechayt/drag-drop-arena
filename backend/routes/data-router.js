const router = require('express').Router();
const { postnewdata, getalldata } = require('../controllers/data-controller');

router.post('/adddata', postnewdata);
router.get('/getdata', getalldata);

module.exports = router; 
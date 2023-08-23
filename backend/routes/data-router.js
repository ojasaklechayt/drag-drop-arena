const router = require('express').Router();
const { postnewdata, getalldata, getcsvdata } = require('../controllers/data-controller');

router.post('/adddata', postnewdata);
router.get('/getdata', getalldata);
router.post('/giveresult', getcsvdata);

module.exports = router; 
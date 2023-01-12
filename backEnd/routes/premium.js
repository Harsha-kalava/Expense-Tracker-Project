const express = require('express')
const router = express.Router()

const premiumController = require('../controllers/premium')
const userAuthentication = require('../middleware/auth')

router.get('/purchase/premium',userAuthentication.authenticate,premiumController.purchasepremium)

router.post('/purchase/update',userAuthentication.authenticate,premiumController.updateTransactionStatus)

module.exports = router
const express = require('express')

const router = express.Router()

const expenseController = require('../controllers/expense')


router.post('/expense/add/:id',expenseController.addExpense)
router.get('/expense/get/:id',expenseController.getExpense)

router.delete('/expense/delData/',expenseController.delData)

module.exports = router
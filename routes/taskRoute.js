const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');

const { gettasks, getsingletask, addtask, updatetask, deletetask } = require('../controllers/taskController');

router.use(validateToken);
router.route('/').get(gettasks).post(addtask);
router.route('/:id').put(updatetask).delete(deletetask).get(getsingletask);


module.exports = router;
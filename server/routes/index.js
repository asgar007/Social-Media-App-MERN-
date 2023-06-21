const express = require('express');
const router = express.Router();

// router.get('/', homeController.home);
//any routes, access from here 

// router.use('/admin', require('./admin'));

// router.use('/comments', require('./comment'));
// router.use('/api', require('./api'));
/* ALL ROUTES */
router.use('/auth', require('./login'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

console.log('router loaded');
module.exports = router; 
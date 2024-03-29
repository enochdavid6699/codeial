const express = require('express');
const router = express.Router();

const homeController = require('../controller/home_controller');

router.get('/' , homeController.home);

//For any further routes access from here
//router.use('/router_name' , require('./router_file') )

router.use('/users' , require('./users'));

router.use('/posts' , require('./posts'));

router.use('/comments' , require('./comments'));

//For API
router.use('/api' , require('./api'));

module.exports=router;

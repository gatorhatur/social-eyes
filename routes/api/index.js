const router = require('express').Router();
const userRoutes = require('./user-routes')
const thoughtRoutes = require('./thought-routes')
// const pizzaRoutes = require('./pizza-route');
// const commentRoutes = require('./comment-route')

// // add prefix of `/pizzas` to routes created in `pizza-routes.js`
// router.use('/comments', commentRoutes)
// router.use('/pizzas', pizzaRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);


module.exports = router;
var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts_controller');

// GET /blog/new
router.get('/new', postsController.new);

// Update blog
router.get('/:slug/update', postsController.update);

// GET all posts listings.
// GET /blog/
router.get('/', postsController.index);

// Get an Individual post listing

// Put /blog/:slug
router.put('/:slug', postsController.put);

// Delete /blog/:slug
router.delete('/:slug', postsController.delete);

// GET /blog/:slug
router.get('/:slug', postsController.show);

// Create posts
// POST /blog


router.post('/', postsController.create);
// TODO: Add Edit and Delete Requests



// Export routes
module.exports = router;

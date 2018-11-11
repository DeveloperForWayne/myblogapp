var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts_controller');

// GET /blog/new
router.get('/new', postsController.new);

// Update Page
router.get('/:slug/update', postsController.updatePage);

// GET all posts listings.
// GET /blog/
router.get('/', postsController.index);

// Get an Individual post listing

// Patch /blog/:slug
router.patch('/:slug', postsController.update);

// Delete /blog/:slug
router.delete('/:slug', postsController.del);

// GET /blog/:slug
router.get('/:slug', postsController.show);

// Create posts
// POST /blog


router.post('/', postsController.create);
// TODO: Add Edit and Delete Requests



// Export routes
module.exports = router;

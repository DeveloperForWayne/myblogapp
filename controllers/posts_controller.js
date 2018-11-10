const Post = require('../models/post');
//var title = "My Blog App";

// Displays a list of all blog posts
exports.index = function (req, res, next) {
    Post.find().exec((err, posts) => {
        console.log(posts)
        res.locals.posts = posts
        res.locals.title = "Blog Posts"
        res.render('posts/index')
    });
};

// /blog/:slug
// req.params.slug
exports.show = function (req, res, next) {
    Post.find().exec((err, posts) => {
        let post = posts.filter(x => x['slug'] === req.params['slug'])[0];
        res.render('posts/show', { title: posts['title'], post })
    });
};

exports.new = function (req, res, next) {
    // let post = posts[0];
    // let message = ""
    // let post = {
    //     title: "",
    //     content: ""
    // }
    res.locals.title = "New Blog Post"
    res.locals.post = { title: "", content: "", summary: "" }
    res.locals.message = ""
    res.render('posts/new');
};

// exports.new = function (req, res, next) {
// 	console.log('here')
// 	res.render('posts/create', { title: "New Post", test: 'hello'});
// };

exports.create = function (req, res, next) {

    // BELOW WAS USED TO GENERATE A SLUG 
    // REMOVED AS USING THE NPM MODULE mongoose-slug-generator
    // const formPost = req.body;
    // const postSlug = formPost.title.replace(/\s/g,"-").toLowerCase();
    // formPost['slug'] = postSlug.toLowerCase()

    // this mongoose-slug-generator is a better solution as it ensures uniqueness
    // https://www.npmjs.com/package/mongoose-slug-generator to generate a unique
    // slug - see models/posts.js

    function truncate(str, no_words) {
        return str.split(" ").splice(0, no_words).join(" ");
    }
    let formPost = req.body
    if (formPost.summary === undefined) {
        const postSummary = truncate(req.body.content, 20) + "...";
        formPost = Object.assign(formPost, { summary: postSummary });
    }
    const newPost = new Post(formPost);

    newPost.save().then(() => {
        res.redirect('/blog')
    }).catch(next)
};

exports.put = function (req, res, next) {
    Post.updateOne({ title: req.params.title }, function (err, post) {
        if (err) return handleError(err);
    });
    var id = req.params.id
    Post.findById(id, function (error, post) {
      if (error) {
        return handleError(err);
      } else {
        post.title = req.body.title
        post.content = req.body.content
  
        post.save();
      }
    });
};

exports.update = function (req, res, next) {
    Post.find().exec((err, posts) => {
        let post = posts.filter(x => x['slug'] === req.params['slug'])[0];
        res.render('posts/update', { post })
    });
};

exports.delete = function (req, res, next) {
    let id = req.params.id
    Post.findByIdAndRemove(id, function (err, post) {
      if (err) return handleError(err);
      res.redirect('/blog');
    });
};

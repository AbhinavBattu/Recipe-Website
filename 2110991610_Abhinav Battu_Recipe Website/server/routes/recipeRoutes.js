const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
/**
 * App Routes 
*/
router.get('/home', recipeController.homepage);
router.get('/', function(req, res) {
    res.render('login.ejs', { title:'',message: req.flash('loginMessage') });
});
router.get('/signup', function(req, res) {
    res.render('signup.ejs', { title:'',message: req.flash('signupMessage') });
});
router.post('/login',recipeController.homepage);
router.get('/logout',function(req,res){
    res.render('login',{ title:'',message: req.flash('Logged Out') });
});
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/delete/:id',recipeController.deleteRecipe,recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);

 
module.exports = router;
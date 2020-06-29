const router = require('express').Router();
const { Recipe, User, Comment, Tag, Rating, Followers } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET all recipes
router.get('/', (req, res) => {
    console.log('======================');
    Recipe.findAll({
      // Query configuration
        attributes: ['id', 
                    'title',
                    'ingredients',
                    'directions',
                    'created_at'
                    ],
        order: [['created_at', 'DESC']],          
        include: [
            {
            model: User,
            attributes: ['username']
            },
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'recipe_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
            model: Tag,
            attributes: ['id', 'tag_name', 'recipe_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
              model: Rating,
              attributes: ['id', 'rating', 'recipe_id'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                model: Followers,
                attributes: ['id', 'user_id', 'recipe_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
              }
        ]
    })
        .then(dbRecipeData => res.json(dbRecipeData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  
});

// GET a single recipe 
router.get('/:id', (req, res) => {
    Recipe.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 
                   'title',
                   'ingredients',
                   'directions',
                   'created_at'
                ],
      include: [
        {
          model: User,
          attributes: ['username']
          },
          {
          model: Comment,
          attributes: ['id', 'comment_text', 'recipe_id', 'user_id'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          },
          {
          model: Tag,
          attributes: ['id', 'tag_name', 'recipe_id'],
              include: {
                  model: User,
                  attributes: ['username']
              }
          },
          {
            model: Rating,
            attributes: ['id', 'rating', 'recipe_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
              model: Followers,
              attributes: ['id', 'user_id', 'recipe_id'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
            }
      ]
    })
      .then(dbRecipeData => {
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
        res.json(dbRecipeData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



// creating a recipe
router.post('/', withAuth, (req, res) => {
    // create 1 recipe
    Recipe.create({ 
        title: req.body.title,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        user_id: req.session.user_id
    })
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err); 
        });
});



// update a recipe title, ingredients and directions
router.put('/:id', withAuth, (req, res) => {
    Recipe.update({
        title: req.body.title,
        ingredients: req.body.ingredients,
        directions: req.body.directions
      },
      {
        where: {
          id: req.params.id
        }
    }).then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe found with this id' });
            return;
        }
        res.json(dbRecipeData);
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



// delete a recipe 
router.delete('/:id', withAuth, (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id 
        }
    }).then(dbRecipeData => {
        if (!dbRecipeData) {
            res.status(404).json({ message: 'No recipe found with this id' });
            return;
        }
        res.json(dbRecipeData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
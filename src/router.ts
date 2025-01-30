import { Router } from "express"
import { createRecipe, deleteRecipe, getRecipeByID, getRecipes, updateRecipe, updateRevised } from "./handlers/recipe"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

//? Routing

router.get('/', getRecipes)
router.get('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    handleInputErrors,
    getRecipeByID)
router.post('/',
    param('id').isInt().withMessage('El id no es valido'),
    body('recipe_name')
        .notEmpty().withMessage('El campo recipe_name no puede ir vacio')
        .isString().withMessage('El campo recipe_name no puede ser un numero'),
    body('quantity')
        .notEmpty().withMessage('EL campo quantity no puede ir vacio')
        .bail()
        .isNumeric().withMessage('El campo quantity no puede ser un texto')
        .bail()
        .custom(value => value > 0).withMessage('El campo quantity no puede ser un numero negativo'),
    body('recipe_ingredient')
        .notEmpty().withMessage('El campo ingredient no puede ir vacio')
        .isString().withMessage('El campo recipe_ingredient no puede ser un numero'),
    body('preparation')
        .notEmpty().withMessage('El campo preparation no puede ir vacio')
        .isString().withMessage('El campo preparation no puede ser un numero'),
    handleInputErrors,
    createRecipe)
router.put('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    body('recipe_name')
        .notEmpty().withMessage('El campo recipe_name no puede ir vacio')
        .isString().withMessage('El campo recipe_name no puede ser un numero'),
    body('quantity')
        .notEmpty().withMessage('EL campo quantity no puede ir vacio')
        .bail()
        .isNumeric().withMessage('El campo quantity no puede ser un texto')
        .bail()
        .custom(value => value > 0).withMessage('El campo quantity no puede ser un numero negativo'),
    body('recipe_ingredient')
        .notEmpty().withMessage('El campo ingredient no puede ir vacio')
        .isString().withMessage('El campo recipe_ingredient no puede ser un numero'),
    body('preparation')
        .notEmpty().withMessage('El campo preparation no puede ir vacio')
        .isString().withMessage('El campo preparation no puede ser un numero'),
    body('revised')
        .isBoolean().withMessage('El valor para el campo'),
    handleInputErrors,
    updateRecipe)
router.patch('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    handleInputErrors,
    updateRevised)
router.delete('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    handleInputErrors,
    deleteRecipe)

export default router
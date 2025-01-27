import { Router } from "express"
import { createRecipe, getRecipeByID, getRecipes, updateRecipe } from "./handlers/recipe"

const router = Router()

//? Routing

router.get('/',getRecipes)
router.get('/:id',getRecipeByID)
router.post('/',createRecipe)

router.put('/:id', updateRecipe)

router.patch('/', (req, res) => {
    res.json('Desde PATCH')
})

router.delete('/', (req, res) => {
    res.json('Desde DELETE')
})

export default router
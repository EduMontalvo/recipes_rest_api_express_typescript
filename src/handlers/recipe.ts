import Recipe from "../models/Recipe.models";
import { request, Request, Response } from "express";
export const createRecipe = async (req: Request, res: Response) => {
    const recipe = await Recipe.create(req.body)
    res.status(201).json({ data: recipe })
}
export const getRecipes = async (req: Request, res: Response) => {
    const recipes = await Recipe.findAll()
    res.status(200).json({ data: recipes })
}
export const getRecipeByID = async (req: Request, res: Response) => {
    const { id } = req.params
    const recipe = await Recipe.findByPk(id)
    if (recipe) {
        res.status(200).json({ data: recipe })
    } else {
        res.status(404).json({ error: 'Receta no encontrada' })
    }
}
export const updateRecipe = async (req: Request, res: Response) => {
    const { id } = req.params
    const recipe = await Recipe.findByPk(id)
    if (recipe) {
        await recipe.update(req.body)
        await recipe.save()
        res.status(200).json({ data: recipe })
    } else {
        res.status(404).json({ error: 'Receta no encontrada' })
    }
}
export const updateRevised = async (req: Request, res: Response) => {
    const { id } = req.params
    const recipe = await Recipe.findByPk(id)
    if (recipe) {
        recipe.revised = !recipe.dataValues.revised
        await recipe.save()
        res.status(200).json({ data: recipe })
    } else {
        res.status(404).json({ error: 'Receta no encontrada ' })
    }
}
export const deleteRecipe = async (req: Request, res: Response) => {
    const { id } = req.params
    const recipe = await Recipe.findByPk(id)
    if (recipe) {
        await recipe.destroy()
        res.json({ data: 'Receta eiminada exitosamente' })
    } else {
        res.status(404).json({ error: 'Receta no encontrada' })
    }
}
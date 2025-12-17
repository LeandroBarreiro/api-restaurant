import { NextFunction, Request, Response } from "express"
import { knex } from "../database/knex"
import { z } from "zod"

class ProductController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const products = await knex<ProductRepository>("products").select().whereLike("name",).orderBy("name")


            return response.json(products)
        } catch (error) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string({ required_error: "Name is required!"}).trim().min(6),
                price: z.number().gt(0, { message: "value must be greater than 0" })
            })

            const { name, price } = bodySchema.parse(request.body)

            await knex<ProductRepository>('products').insert({ name, price })

            return response.status(201).json({ name, price })
        } catch (error) {
            next(error)
        }
    }
}


export { ProductController }
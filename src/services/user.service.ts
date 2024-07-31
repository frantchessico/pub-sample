import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { pub } from '../configs/pubsub';




const prisma = new PrismaClient()




export const createUser = async(req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });

        const subscriber  = ['pubsub', '66aaab03481e930eee56eb8e']
        await pub.publish('newsletter',JSON.stringify(user), subscriber)
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}


export const allUsers = async(req: Request, res: Response) => {
    try {
        const user = await prisma.user.findMany();
        return res.status(200).json(user)
    } catch(error) {
        return res.status(400).json(error)
    }
}



export const findUserById = async(req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: id}
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }
}


export const updateUser = async(req: Request,res: Response) => {
    const { id } = req.params
    const { name, email } = req.body;

    try {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                name,
                email
            }
        });

        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }
}



export const deleteUser = async(req: Request,res: Response) => {
    const { id} = req.params;

    try {
        const user = await prisma.user.delete({
            where: { id: id}
        })

        return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json(error)  
    }
}
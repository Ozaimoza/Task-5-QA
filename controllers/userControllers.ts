import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

interface user {
  name: string;
  job: string;
}

class User {
  static createUser = async (req: Request, res: Response) => {
    try {
      const { name, job }: user = req.body;

      const data = await prisma.user.create({
        data: {
          name: name,
          job: job,
        },
      });

      const response = {
        name: data.name,
        job: data.job,
        id: data.id,
        createdAt: data.createdAt,
      };

      res.status(201).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message || "Something went wrong",
      });
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, job }: user = req.body;

      const newData = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          job: job,
          //   updatedAt: Date.now,
        },
      });

      const response = {
        name: newData.name,
        job: newData.job,
        updatedAt: newData.updatedAt,
      };

      res.status(200).json(response);
    } catch (error: any) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message || "Something went wrong",
      });
    }
  };
}

export default User;

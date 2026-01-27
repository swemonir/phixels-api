import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: []
  })
}

export const UserController = {
  getUsers
}

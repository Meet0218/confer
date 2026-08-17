import { Request, Response } from "express";
import { User } from "../../../models/User";
import { commonResponse } from "../../../utils/commonResponse";
import { Op } from "sequelize";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.id;
    const searchQuery = req.query.search as string | undefined;
    const users = await User.findAll({
      where: {
        id: {
          [Op.ne]: user_id,
        },
        ...(searchQuery && {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${searchQuery}%`,
              },
            },
            {
              email: {
                [Op.iLike]: `%${searchQuery}%`,
              },
            },
          ],
        }),
      },
      attributes: ["id", "name", "email"],
    });

    return res.json(commonResponse(users, "Users fetched successfully", 200));
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.json(commonResponse(null, "Failed to fetch users", 500));
  }
};

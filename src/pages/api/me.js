import { prisma } from "../../prisma_setup";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  console.log(req.headers);

  const authHeader = req.headers["x_authorization"];
  if (!authHeader) throw new Error("unathorized");

  const token = authHeader.replace("Bearer ", "");
  if (!token) throw new Error("unvalid token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded.userId) throw new Error("unathorized token");

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });
  if (!user) throw new Error("user was not found");
  // console.log(user);
  res.status(200).json({
    email: user.email,
    id: user.id,
    createdAt: user.createdAt,
    deletedAt: user.deletedAt,
    role: user.role,
  });
};

export default handler;

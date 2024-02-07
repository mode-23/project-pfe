import { prisma } from "../../prisma_setup";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  // console.log(req.headers);

  const authHeader = req.headers["authorization"];

  if (!authHeader) throw new Error("unathorized");

  const token = authHeader.replace("Bearer ", "");
  if (!token) throw new Error("unvalid token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded.userId) throw new Error("unathorized");
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
  });
  if (!user) throw new Error("me: the user was not found");
  res.status(200).json({ email: user.email, id: user.id });
};

export default handler;
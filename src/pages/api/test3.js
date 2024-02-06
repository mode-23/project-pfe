import { compare } from "bcrypt";
import { prisma } from "../../prisma_setup";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  const { loginEmail, loginPw } = JSON.parse(req.body);
  const user = await prisma.user.findUnique({
    where: {
      email: loginEmail,
    },
  });

  if (!user) {
    throw new Error("bad request");
  }

  const matchFound = await compare(loginPw, user.password);
  if (!matchFound) {
    throw new Error("bad request");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.status(200).json({ user, token });
};
export default handler;

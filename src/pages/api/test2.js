import { prisma } from "../../prisma_setup";
import { hash } from "bcrypt";
const handler = async (req, res) => {
  const { email, pw } = JSON.parse(req.body);
  const SALT_ROUNDS = 10;
  const hashedPassword = await hash(pw, SALT_ROUNDS);
  let user;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "something went wrong!" });
    // throw new Error("bad request");
  }
};

export default handler;

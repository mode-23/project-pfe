import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { role } = req.query;

  const user = await prisma.user.findMany({
    where: {
      role,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(user);
};
export default handler;

import { prisma } from "../../prisma_setup";

const handler = async (req, res) => {
  const user = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json(user);
};

export default handler;

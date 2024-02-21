import { prisma } from "../../prisma_setup";

const handler = async (req, res) => {
  const { email, createdAt } = JSON.parse(req.body);
  const user = await prisma.user.findMany({
    where: {
      email: email,
      createdAt: createdAt,
      // createdAt: {
      //   gte: new Date("2024-02-07"),
      //   lte: new Date("2024-02-20"),
      // },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json(user);
};

export default handler;

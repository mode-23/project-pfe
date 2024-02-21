import { prisma } from "../../prisma_setup";

const handler = async (req, res) => {
  const user = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: new Date("2024-02-07"), // Start of date range
        lte: new Date("2024-02-20"), // End of date range
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json(user);
};

export default handler;

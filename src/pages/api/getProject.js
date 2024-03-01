import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { name, id, project, startDate, endDate } = req.query;
  const user = await prisma.process.findMany({
    where: {
      status: "ready",
      project,
      AND: [
        {
          name: {
            endsWith: "failure",
          },
        },
        { name: name || undefined },
      ],
      // name: name || undefined,
      id: +id || undefined,
      date: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json(user);
};

export default handler;

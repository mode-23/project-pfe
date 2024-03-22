import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { project, startDate, endDate } = req.query;
  const statusGroup = await prisma.task.groupBy({
    by: ["name"],
    _count: true,
    where: {
      taskprocess: {
        project,
      },
      name: {
        endsWith: "failure",
      },
      date: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
  });
  res.status(200).json(statusGroup);
};
export default handler;

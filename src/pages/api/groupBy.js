import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { project, startDate, endDate } = req.query;
  const statusGroup = await prisma.ProcessInstanceLog.groupBy({
    by: ["status"],
    _count: true,
    where: {
      project,
      date: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
  });
  res.status(200).json(statusGroup);
};
export default handler;

import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { id, project, startDate, endDate, status } = req.query;
  const history = await prisma.ProcessInstanceLog.findMany({
    where: {
      status: status || undefined,
      project,
      id: +id || undefined,
      date: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
  });
  res.status(200).json(history);
};
export default handler;

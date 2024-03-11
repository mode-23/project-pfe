import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { id, project, startDate, endDate } = req.query;

  const annul = await prisma.ProcessInstanceLog.findMany({
    where: {
      status: "inprogress",
      project,
      id: +id || undefined,
      date: {
        gte: startDate ? new Date(startDate) : undefined,
        lte: endDate ? new Date(endDate) : undefined,
      },
    },
  });
  res.status(200).json(annul);
};
export default handler;

import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { project, status } = req.query;
  const statusGroup = await prisma.ProcessInstanceLog.groupBy({
    by: ["name"],
    _count: true,
    where: {
      project,
      status,
    },
  });
  res.status(200).json(statusGroup);
};
export default handler;

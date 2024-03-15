import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { project } = req.query;
  const statusGroup = await prisma.ProcessInstanceLog.groupBy({
    by: ["status"],
    _count: true,
    where: {
      project,
    },
  });
  res.status(200).json(statusGroup);
};
export default handler;

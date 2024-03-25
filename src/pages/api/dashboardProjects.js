import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const statusGroup = await prisma.projects.groupBy({
    by: ["name"],
    _count: true,
  });

  res.status(200).json(statusGroup);
};
export default handler;

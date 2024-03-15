import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { project } = req.query;
  const statusGroup = await prisma.task.groupBy({
    by: ["name"],
    _count: true,
    where: {
      //  project: "apc",
      taskprocess: {
        project,
      },
      name: {
        endsWith: "failure",
      },
    },
  });
  res.status(200).json(statusGroup);
};
export default handler;

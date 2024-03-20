import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const tasks = await prisma.task.groupBy({
    by: ["name"],
    _count: true,
    where: {
      name: {
        endsWith: "failure",
      },
    },
  });
  res.status(200).json(tasks);
};
export default handler;

import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { array } = JSON.parse(req.body);
  const process = await prisma.task.updateMany({
    where: {
      id: {
        in: array,
      },
    },
    data: {
      status: "completed",
    },
  });
  res.status(200).json(process);
};
export default handler;

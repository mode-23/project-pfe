import { prisma } from "../../prisma_setup";
const currentDate = new Date();

const handler = async (req, res) => {
  const updateCron = await prisma.ProcessInstanceLog.updateMany({
    where: {
      date: {
        lte: currentDate,
      },
    },
    data: {
      status: "completed",
    },
  });
  res.status(200).json(updateCron);
};
export default handler;

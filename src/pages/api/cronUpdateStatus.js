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
  //   where: {
  //     id: {
  //       in: array,
  //     },
  //   },
  //   data: {
  //     status: "completed",
  //   },
  // });
  // const process = prisma.ProcessInstanceLog.updateMany({
  //   where: {
  //     id: {
  //       in: tasksArray,
  //     },
  //   },
  //   data: {
  //     status: "completed",
  //   },
  // });
  // const updateProcess = await prisma.$transaction([tasks, process]);

  // res.status(200).json(updateProcess);
  res.status(200).json(updateCron);
};
export default handler;

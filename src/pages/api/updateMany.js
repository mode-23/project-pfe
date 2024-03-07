import { prisma } from "../../prisma_setup";

const handler = async (req, res) => {
  const { array, tasksArray } = JSON.parse(req.body);
  // const tasks = await prisma.task.updateMany({
  //   where: {
  //     id: {
  //       in: array,
  //     },
  //   },
  //   data: {
  //     status: "completed",
  //   },
  // });
  const tasks = prisma.task.updateMany({
    where: {
      id: {
        in: array,
      },
    },
    data: {
      status: "completed",
    },
  });
  const process = prisma.ProcessInstanceLog.updateMany({
    where: {
      id: {
        in: tasksArray,
      },
    },
    data: {
      status: "completed",
    },
  });
  const updateProcess = await prisma.$transaction([tasks, process]);

  res.status(200).json(updateProcess);
  // res.status(200).json(tasks);
};
export default handler;

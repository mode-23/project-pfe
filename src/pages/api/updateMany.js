import { prisma } from "../../prisma_setup";

const handler = async (req, res) => {
  const { array } = JSON.parse(req.body);
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
      id: 6,
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

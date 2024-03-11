import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const result = await prisma.task.create({
    data: {
      name: "changeRatePlanfailure",
      status: "ready",
      project: "apc",
      processName: "testings",
      taskprocess: {
        connect: {
          id: 7,
        },
        // create: {
        //   name: "com.migrationOrderWorkflow",
        //   status: "inprogress",
        // },
      },
    },
    include: {
      taskprocess: true,
    },
  });
  console.log(result);
  res.status(200).json(result);
};
export default handler;

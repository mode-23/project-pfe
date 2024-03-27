import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const result = await prisma.ProcessInstanceLog.create({
    data: {
      name: "migrationOrder",
      status: "inprogress",
      project: "apc",
      task: {
        createMany: {
          data: [
            {
              name: "changeRatePlanfailure",
              status: "ready",
              project: "apc",
              processName: "test",
            },
            {
              name: "changeRatePlanfailure",
              status: "ready",
              project: "apc",
              processName: "test2",
            },
          ],
        },
      },
    },
    include: {
      task: true,
    },
  });
  res.status(200).json(result);
};
export default handler;

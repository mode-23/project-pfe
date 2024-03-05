import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const result = await prisma.task.create({
    data: {
      name: "prepareMigrationfailure",
      status: "ready",
      project: "apc",
      processName: "testings",
      taskprocess: {
        create: {
          name: "test5",
          status: "encours",
        },
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

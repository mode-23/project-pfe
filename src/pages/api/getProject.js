import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  //   console.log(req.query);
  const { name, id, project } = req.query;
  const user = await prisma.process.findMany({
    where: {
      project,
      name: name || undefined,
      id: +id || undefined,
      // date: {
      //   gte: new Date("2024-01-08"),
      //   lte: undefined,
      // },
    },
    orderBy: {
      date: "desc",
    },
  });

  res.status(200).json(user);
};

export default handler;

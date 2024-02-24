import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { project, startDate, endDate, name, id, status } = JSON.parse(
    req.body
  );
  const process = await prisma.process.findMany({
    where: {
      status,
      project,
      name: {
        contains: name,
      },
      id: id || undefined,
      date: {
        gte: startDate ? new Date(startDate) : undefined, //start of the date
        lte: endDate ? new Date(endDate) : undefined, //end of the date
      },
    },
  });
  res.status(200).json(process);
};

export default handler;

import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { array } = JSON.parse(req.body);
  const process = await prisma.process.updateMany({
    where: {
      id: {
        in: array,
      },
    },
    data: {
      status: "unactive",
    },
  });
  res.status(200).json(process);
};
export default handler;

import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const failed = await prisma.ProcessInstanceLog.findMany({
    where: {
      status: "encours",
    },
  });
  res.status(200).json(failed);
};
export default handler;

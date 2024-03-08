import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const history = await prisma.ProcessInstanceLog.findMany();
  res.status(200).json(history);
};
export default handler;

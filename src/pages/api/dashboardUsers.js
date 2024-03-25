import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const user = await prisma.user.groupBy({
    by: ["role"],
    _count: true,
  });
  res.status(200).json(user);
};
export default handler;

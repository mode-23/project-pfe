import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { array } = JSON.parse(req.body);
  const action = await prisma.ProcessInstanceLog.updateMany({
    where: {
      id: {
        in: array,
      },
    },
    data: {
      status: "aborted",
    },
  });
  res.status(200).json(action);
};
export default handler;

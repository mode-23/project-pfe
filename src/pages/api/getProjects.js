import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { name } = JSON.parse(req.body);
  const project = await prisma.projects.findMany({
    where: {
      name,
    },
  });
  res.status(200).json(project);
};
export default handler;

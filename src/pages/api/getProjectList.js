import { prisma } from "../../prisma_setup";

const handler = async (req, res) => {
  const projects = await prisma.projects.findMany();

  res.status(200).json(projects);
};

export default handler;

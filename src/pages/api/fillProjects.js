import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  try {
    const project = await prisma.projects.create({
      data: {
        name: "reengagement",
        processList: ["verifypendingbeforeCreateFailure", "GetListFAFfailure"],
      },
    });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export default handler;

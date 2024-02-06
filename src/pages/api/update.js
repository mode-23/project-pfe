import { prisma } from "../../prisma_setup";
const handler = async (req, res) => {
  const { userId, newEmail } = JSON.parse(req.body);
  console.log(newEmail);
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: newEmail,
    },
  });

  res.status(200).json(user);
};
export default handler;

import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: await hashPassword(password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
    res.status(200);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      message: "There was an error creating the user",
    });
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      res.status(404);
      res.json({
        message: "User not found",
      });
      return;
    }

    const valid = await comparePasswords(password, user.password);

    if (!valid) {
      res.status(401);
      res.json({
        message: "Incorrect password",
      });
      return;
    }

    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      message: "There was an error signing in",
    });
  }
};

import express, { Response } from "express";
import { UserRequest } from "./types";

const router = express.Router();

// a route that sends the usernames of the users to the client
router.get("/usernames", (req: UserRequest, res: Response) => {
  let usernames = req.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

// a route that searches for user's email using the username
router.get("/username/:name", (req: UserRequest, res: Response) => {
  const name = req.params.name;
  console.log("name:", name);
  const filteredUsers = req.users?.filter(
    (user) => user.username.toLowerCase() === name.toLowerCase()
  );
  console.log("filtered users:", filteredUsers);
  if (filteredUsers?.length === 0) {
    res.send({
      error: { message: `${name} not found`, status: 404 },
    });
  } else {
    res.send(filteredUsers);
  }
});

export default router;

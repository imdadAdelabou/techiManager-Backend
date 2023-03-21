import { Request, Response } from "express";
import { RoleType } from "../helpers/types";
import { checkIfUserExist } from "./checkIfUserExist";

export const matching = {
  garden: RoleType.garden,
  admin: RoleType.admin,
  user: RoleType.user,
};

export const isAdminOrGarden = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const user = await checkIfUserExist(req.body.user.email);

  if (typeof user === "boolean")
    return res.status(404).json({ msg: "Inexistant user" });
  if (matching[user.role] === RoleType.user)
    return res.status(401).json({
      msg: "You don't have sufficent acces on this path",
      errors: { keys: ["is-not-garden-or-admin"] },
    });
  next();
};

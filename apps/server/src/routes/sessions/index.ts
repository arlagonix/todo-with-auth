import { generateToken } from "./../../utils/generateToken";
import db from "../../setDb";
import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, DATABASE_ERROR, WRONG_LOGIN_PASSWORD } from "../../errorResponses";
import { validateLogin } from "../../utils/validateLogin";
import { validatePassword } from "../../utils/validatePassword";

const sessionsRef = db.ref("sessions");
const sessionsRouter = Router();

interface ISession {
  token: string;
  login: string;
}

sessionsRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
    return res.status(200).send();
    // throw "Bebra";
    // Validate request body
    if (typeof req.body !== "object" || Array.isArray(req.body) || req.body === null)
      return res.status(400).json(BAD_REQUEST(["Request body must be an object"]));

    if (req.body.login)
      if (req.body.login === undefined) return res.status(400).json(BAD_REQUEST(["`login` must be specified"]));
    if (typeof req.body.login !== "string") return res.status(400).json(BAD_REQUEST(["`login` must be a string"]));

    // Firebase tells the following:
    // Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"
    // Otherwise it throws an exception
    if (!req.body.login.match(/^[^\.\#$\[\]]+$/)) return res.status(400).json(WRONG_LOGIN_PASSWORD);

    // Check if a user with such login already exists
    const specificUserRef = db.ref(`/users/${req.body.login}`);

    let isWrongLoginPwd: boolean = false;
    let isDatabaseError: boolean = false;
    await specificUserRef.once(
      "value",
      (snapshot) => {
        const dbData = snapshot.val();
        if (dbData === null || dbData.password !== req.body.password) isWrongLoginPwd = true;
      },
      (error) => {
        if (error !== null) isDatabaseError = true;
      }
    );
    if (isWrongLoginPwd) return res.status(401).json(WRONG_LOGIN_PASSWORD);
    if (isDatabaseError) return res.status(500).json(DATABASE_ERROR);

    // Return token
    res.status(200).json({
      token: generateToken(),
    });
  } catch (error) {
    console.log("Yolo, beaches", error);
    next();
  }
});

export default sessionsRouter;

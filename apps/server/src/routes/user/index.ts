import db from "../../setDb";
import type { Request, Response } from "express";
import type { IUser } from "./index.d";
import { Router } from "express";
import { validateLogin } from "../../utils/validateLogin";
import { validatePassword } from "../../utils/validatePassword";
import { INVALID_TOKEN, DATABASE_ERROR, BAD_REQUEST, USER_EXISTS, USER_NOT_FOUND } from "../../errorResponses";
import { basicRequestBodyValidation } from "../../middlewares";

const usersRef = db.ref("users");
const userRouter = Router();

/* Returns the user data */
userRouter.get("/", async (req: Request, res: Response) => {
  // Check the token
  if (req.headers.authorization === undefined) {
    return res.status(401).json(INVALID_TOKEN);
  }

  // Retrieve data from database
  let isDatabaseError: boolean = false;
  let dbData;
  await usersRef.once(
    "value",
    (snapshot) => {
      dbData = snapshot.val();
    },
    (error) => {
      if (error !== null) isDatabaseError = true;
    }
  );
  if (isDatabaseError) return res.status(500).json(DATABASE_ERROR);

  // Return user data
  const response: IUser[] = [];
  for (const [key, value] of Object.entries(dbData) as any) {
    response.push({
      login: key,
      password: value.password,
    });
  }
  res.status(200).json(response);
});

/* Creates a new user */
userRouter.post("/", basicRequestBodyValidation, async (req: Request, res: Response) => {
  // Validate request body
  const requestValidationErrors: string[] = [];
  const [isLoginValid, loginErrors] = validateLogin(req.body.login, "`login`");
  if (!isLoginValid) requestValidationErrors.push(...loginErrors);
  const [isPasswordValid, passwordErrors] = validatePassword(req.body.password, "`password`");
  if (!isPasswordValid) requestValidationErrors.push(...passwordErrors);

  if (requestValidationErrors.length > 0) return res.status(400).json(BAD_REQUEST(requestValidationErrors));

  // Check if a user with such login already exists
  const specificUserRef = db.ref(`/users/${req.body.login}`);
  let isUserExists: boolean = false;
  let isDatabaseError: boolean = false;
  await specificUserRef.once(
    "value",
    (snapshot) => {
      const dbData = snapshot.val();
      if (dbData !== null) isUserExists = true;
    },
    (error) => {
      if (error !== null) isDatabaseError = true;
    }
  );
  if (isUserExists) return res.status(403).json(USER_EXISTS);
  if (isDatabaseError) return res.status(500).json(DATABASE_ERROR);

  // Create a new user
  await usersRef.update(
    {
      [req.body.login]: {
        password: req.body.password,
      },
    },
    (error) => {
      if (error !== null) isDatabaseError = true;
    }
  );
  if (isDatabaseError) return res.status(500).json(DATABASE_ERROR);

  return res.status(201).send();
});

/* Deletes the user */
userRouter.delete("/:login", async (req: Request, res: Response) => {
  const specificUserRef = db.ref(`users/${req.params.login}`);

  // Check if there is such user
  let isUserExists: boolean = false;
  let isDatabaseError: boolean = false;
  await specificUserRef.once(
    "value",
    (snapshot) => {
      const dbData = snapshot.val();
      if (dbData !== null) isUserExists = true;
    },
    (error) => {
      if (error !== null) isDatabaseError = true;
    }
  );
  if (!isUserExists) return res.status(404).json(USER_NOT_FOUND);
  if (isDatabaseError) return res.status(500).json(DATABASE_ERROR);

  // If user exists, delete it
  await specificUserRef.remove((error) => {
    if (error !== null) isDatabaseError = true;
  });

  if (isDatabaseError) return res.status(500).json(DATABASE_ERROR);
  return res.status(204).send();
});

export default userRouter;

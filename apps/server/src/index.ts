import express from "express";
import type { Request, Response, NextFunction, Express } from "express";
import userRouter from "./routes/user";
import sessionsRouter from "./routes/sessions";
import { SERVER_ERROR } from "./errorResponses";
import config from "../config";

const app: Express = express();
const PORT = config.port;
app.use(express.json());

// Check that request body is JSON
app.use((err: SyntaxError & { status?: number }, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({
      errorCode: "bad-request",
      errorMessages: ["Request body must be JSON"],
    });
  } else {
    next();
  }
});

const asyncWrapper = (route) => {
  return (req, res, next) => route(req, res, next)?.catch(next);
};

app.use("/user", asyncWrapper(userRouter));
app.use("/sessions", asyncWrapper(sessionsRouter));

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log("I'm here");
  return res.status(500).json(SERVER_ERROR);
}

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

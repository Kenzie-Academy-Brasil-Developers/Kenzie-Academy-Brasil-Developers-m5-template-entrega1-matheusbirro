import "express-async-errors"
import "reflect-metadata";
import express, { json } from "express";
import { categoryRouter, tasksRouter } from "./routers";
import helmet from "helmet";
import { handleErrors } from "./middlewares";
import { userRouter } from "./routers/user.router";
import { sessionRouter } from "./routers/session.router";

export const app = express();

app.use(helmet());
app.use(json());

app.use("/tasks", tasksRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/users", sessionRouter);

app.use(handleErrors);
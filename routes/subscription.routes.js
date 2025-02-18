import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getSubscriptions,
} from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "Get all subscriptions" })
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "Get subscriptions details" })
);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE subscriptions" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE subscriptions" })
);
subscriptionRouter.get("/user/:id", authorize, getSubscriptions);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL subscriptions" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET upcoming renewals" })
);
export default subscriptionRouter;

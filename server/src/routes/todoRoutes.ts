import { Router, Request, Response } from "express";

import { TodoItem } from "@shared/types";

import seedData from "../data/seed-data.json";

const router = Router();

const todoItems: TodoItem[] = seedData;

router.get("/", (req: Request, res: Response) => {
  const { filter } = req.query;

  if (typeof filter === "string" && filter.trim()) {
    const filtered = todoItems.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    return res.json(filtered);
  }

  return res.json(todoItems);
});

export default router;

import type { Request, Response } from "express";
import { AppError } from "@app/shared";

export async function proxyJsonRequest(
  req: Request,
  res: Response,
  url: string,
) {
  const response = await fetch(url, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: req.method === "GET" ? undefined : JSON.stringify(req.body),
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new AppError(
      response.status,
      payload?.message ?? "Request failed in downstream service",
    );
  }

  res.status(response.status).json(payload);
}

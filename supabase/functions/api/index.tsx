import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", logger(console.log));
app.use("*", cors());

const prefix = "/make-server-7d0d10de";

// Register for an event
app.post(`${prefix}/api/register`, async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const registration = { id, ...body, createdAt: new Date().toISOString() };
    await kv.set(`registration:${id}`, registration);
    return c.json({ success: true, registration });
  } catch (error) {
    console.error("Error saving registration", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get all registrations
app.get(`${prefix}/api/registrations`, async (c) => {
  try {
    const registrations = await kv.getByPrefix("registration:");
    return c.json({ registrations });
  } catch (error) {
    console.error("Error getting registrations", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Submit feedback
app.post(`${prefix}/api/feedback`, async (c) => {
  try {
    const body = await c.req.json();
    const id = crypto.randomUUID();
    const feedback = { id, ...body, createdAt: new Date().toISOString() };
    await kv.set(`feedback:${id}`, feedback);
    return c.json({ success: true, feedback });
  } catch (error) {
    console.error("Error saving feedback", error);
    return c.json({ error: String(error) }, 500);
  }
});

// Get all feedback
app.get(`${prefix}/api/feedback`, async (c) => {
  try {
    const feedback = await kv.getByPrefix("feedback:");
    return c.json({ feedback });
  } catch (error) {
    console.error("Error getting feedback", error);
    return c.json({ error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);

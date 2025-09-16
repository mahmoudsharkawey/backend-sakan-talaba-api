import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend! Sakan Talaba" });
});

export default app;

// Start server locally if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}/`);
  });
}
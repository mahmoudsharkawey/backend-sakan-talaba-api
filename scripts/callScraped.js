import app from '../api/server/index.js';

// Use supertest-like approach without adding deps: create a request using app.handle
import http from 'http';

const server = http.createServer(app);
server.listen(0, async () => {
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/api/scraped-apartments`;
  try {
    const res = await fetch(url);
    const body = await res.text();
    console.log('status', res.status);
    console.log(body.slice(0, 1000)); // print first 1000 chars
  } catch (err) {
    console.error('Error calling route:', err);
  } finally {
    server.close();
  }
});

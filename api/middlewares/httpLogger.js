import morgan from "morgan";
import { httpLogStream } from "../utils/logger/index.js";

// Use Apache combined format for rich HTTP logs
export const httpLogger = morgan("combined", { stream: httpLogStream });

export default httpLogger;



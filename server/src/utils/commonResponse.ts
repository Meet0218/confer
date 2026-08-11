import { Response } from "express";
import { CommonResponse } from "@confer/shared-types";

/**
 * Creates a standardized response object containing response, message, and code.
 * Usage: commonResponse(data, message, code)
 *
 * @param response - The data payload to return to the client.
 * @param message  - A human-readable message describing the result.
 * @param code     - The HTTP status code.
 */
export function commonResponse<T = any>(
  response: T,
  message: string,
  code: number,
): CommonResponse<T> {
  return {
    response,
    message,
    code,
  };
}

/**
 * Convenience wrapper that sets the HTTP status and sends a commonResponse JSON body.
 * Usage: sendCommonResponse(res, 200, 'Success', data)
 *
 * @param res     - Express Response object.
 * @param code    - HTTP status code.
 * @param message - Human-readable message.
 * @param data    - Optional data payload.
 */
export function sendCommonResponse<T = any>(
  res: Response,
  code: number,
  message: string,
  data?: T,
): Response {
  return res.status(code).json(commonResponse(data, message, code));
}

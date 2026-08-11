import { io, Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@confer/shared-types";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

export const drawingSocket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(`${SOCKET_URL}/drawing`, {
    autoConnect: false,
  });

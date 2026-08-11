export interface Point {
  x: number;
  y: number;
}

export interface DrawingEvent {
  roomId: string;
  userId: string;
  type: "start" | "move" | "end";
  point: Point;
  color: string;
  width: number;
}

export interface CallEvent {
  roomId: string;
  userId: string;
  action: "joined" | "left";
  timestamp: string;
}

export interface ServerToClientEvents {
  drawing: (event: DrawingEvent) => void;
  call_event: (event: CallEvent) => void;
}

export interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  leave_room: (roomId: string) => void;
  drawing: (event: DrawingEvent) => void;
}

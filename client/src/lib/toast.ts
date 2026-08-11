import { toast } from "react-hot-toast";

export type ToastType = "success" | "error" | "loading" | "default";

export function showToast(message: string, type: ToastType = "default") {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      toast(message);
  }
}

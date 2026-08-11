import Button from "./Button";
import Card from "./Card";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="overflow-hidden">
          <div className="px-6 py-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>

          <Card.Footer className="flex justify-end gap-3">
            <Button onClick={onCancel} variant="outline" size="sm">
              {cancelText}
            </Button>

            <Button onClick={onConfirm} variant="primary" size="sm">
              {confirmText}
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

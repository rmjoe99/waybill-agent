export function ErrorBanner({
  message,
  onDismiss,
  onRetry,
}: {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
      <span aria-hidden className="mt-0.5 font-semibold text-rose-600">!</span>
      <div className="flex-1">{message}</div>
      <div className="flex gap-2">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-md border border-rose-200 bg-white px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
          >
            Retry
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="rounded px-1 text-rose-500 hover:text-rose-900"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

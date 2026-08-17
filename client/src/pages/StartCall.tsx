import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import { getUsers, createCall } from "../lib/api";

type User = { id: string; name: string; email: string };

export default function StartCall() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>([]);
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdRoom, setCreatedRoom] = useState<string | null>(null);
  const [inviteStatus, setInviteStatus] = useState<Record<string, string>>({});
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const fetchUsers = useCallback((q?: string) => {
    getUsers(q)
      .then((res: any) => {
        setUsers(res || []);
      })
      .catch(() => setUsers([]));
  }, []);

  useEffect(() => {
    const debounceId = window.setTimeout(() => fetchUsers(search.trim()), 300);
    return () => {
      window.clearTimeout(debounceId);
    };
  }, [search, fetchUsers]);

  const toggleSelect = (u: User) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === u.id);
      if (exists) return prev.filter((p) => p.id !== u.id);
      return [...prev, u];
    });
  };

  const removeSelected = (id: string) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const recipients = selected.map((s) => ({ id: s.id, email: s.email }));
      const resp: any = await createCall(title.trim(), recipients);
      const created = resp?.token || resp?.call?.roomName || resp?.roomName;
      if (!created) {
        throw new Error("Create call response did not include a room token");
      }
      setCreatedRoom(created);
      setCopyStatus(null);
      // mark invites as pending
      const statusMap: Record<string, string> = {};
      selected.forEach((s) => (statusMap[s.id] = "Not sent"));
      setInviteStatus(statusMap);
      navigate(`/calls/room/${encodeURIComponent(created)}`, { replace: true });
    } catch (err: any) {
      console.error("Create call failed", err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSendInvites = async () => {
    // No backend invite endpoint yet; mark as sent locally.
    const next: Record<string, string> = {};
    selected.forEach((s) => (next[s.id] = "Sent"));
    setInviteStatus(next);
  };

  const copyLink = async () => {
    if (!createdRoom) return;
    const link = `${window.location.origin}/calls/room/${encodeURIComponent(
      createdRoom,
    )}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus("Link copied to clipboard");
    } catch (err) {
      setCopyStatus("Failed to copy link");
    }
  };

  const hasSelected = selected.length > 0;

  const availableUsers = useMemo(() => {
    // exclude already selected from list
    return users.filter((u) => !selected.find((s) => s.id === u.id));
  }, [users, selected]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-6">Start a call</h2>

      <Card>
        <Card.Header>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Input
              label="Call title (optional)"
              placeholder="Enter a title for the call"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Recipients
              </label>
              <Input
                placeholder="Search people by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              {selected.map((s) => (
                <div
                  key={s.id}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/90 px-3 py-1.5 shadow-[0_8px_18px_rgba(15,23,42,0.28)]"
                >
                  <span className="text-sm font-medium text-slate-100">
                    {s.name}
                  </span>
                  <button
                    type="button"
                    aria-label={`Remove ${s.name}`}
                    onClick={() => removeSelected(s.id)}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-600 bg-slate-900/80 text-slate-300 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 6L14 14M14 6L6 14"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            {availableUsers.length === 0 ? (
              <p className="text-sm text-gray-500">No users found.</p>
            ) : (
              availableUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleSelect(u)}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card.Body>

        <Card.Footer>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleCreate}
                isLoading={isCreating}
                disabled={isCreating}
              >
                Create Call
              </Button>
              <Button
                onClick={handleSendInvites}
                variant="secondary"
                disabled={!hasSelected || !createdRoom}
              >
                Send Invites
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              {createdRoom ? (
                <>
                  <div className="mb-2">Room: {createdRoom}</div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={copyLink}>
                      Copy link
                    </Button>
                    {copyStatus && (
                      <span className="text-sm">{copyStatus}</span>
                    )}
                  </div>
                </>
              ) : (
                <div>Call not created yet</div>
              )}
            </div>
          </div>

          {selected.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Invite status</div>
              <div className="grid gap-2">
                {selected.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between border rounded p-2"
                  >
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-sm text-gray-500">{s.email}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {inviteStatus[s.id] || "Not created"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
}

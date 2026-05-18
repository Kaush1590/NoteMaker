import { useEffect, useState } from "react";
import colorsPreview from "../components/ColorsPreview";
import type { Notes } from "../components/Notes";
import { useParams, Link } from "react-router";
import { ArrowLeft, Save } from "lucide-react";
import api from "../lib/axios";

const NoteDetails = () => {
  const [note, setNote] = useState<Notes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const { id } = useParams();

  const fetchNote = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/notemaker/${id}`, { timeout: 5000 });
      setNote(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load note");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    if (!note) return;
    setIsSaving(true);
    setError(null);
    try {
      await api.put(`/api/notemaker/${note._id}`, {
        title: note.title,
        content: note.content,
        color: note.color,
      }, { timeout: 5000 });
      await fetchNote();
    } catch (err) {
      console.error(err);
      setError("Failed to update note");
    } finally {
      setIsSaving(false);
    }
  }

  if (!id) return <div className="p-4">No note selected</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Note details</h2>
        <Link
          to={`/`}
          className="btn btn-neutral"
        ><ArrowLeft size={16} />Back</Link>
      </div>

      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {note && (
        <div className="space-y-4">
          <div className={`${colorsPreview[note.color]} p-4 rounded-md shadow-sm`}>
            <input
              className="w-full text-2xl font-semibold bg-transparent outline-none"
              value={note.title}
              onChange={e => setNote(prev => prev ? { ...prev, title: e.target.value } : prev)}
            />
            <textarea
              className="w-full mt-2 bg-transparent outline-none"
              value={note.content}
              onChange={e => setNote(prev => prev ? { ...prev, content: e.target.value } : prev)}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="label">Change color</div>
            <div className="flex gap-2">
              {colorsPreview.map((cls, idx) => (
                <button
                  key={idx}
                  className={`${cls} w-8 h-8 rounded ${note.color === idx ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                  onClick={() => setNote(prev => prev ? { ...prev, color: idx } : prev)}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-primary" onClick={handleUpdate} disabled={isSaving}><Save size={16} />{isSaving ? 'Saving...' : 'Save changes'}</button>
            <div className="text-sm text-gray-500">Last updated: {new Date(note.updatedAt).toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteDetails

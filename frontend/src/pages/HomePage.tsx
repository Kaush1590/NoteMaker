import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import type { Notes } from "../components/Notes";
import colorsPreview from "../components/ColorsPreview";
import { RefreshCcw } from "lucide-react";
import api from "../lib/axios";

const HomePage = () => {
    const [notes, setNotes] = useState<Notes[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [colorFilter, setColorFilter] = useState<number | null>(null);

    const fetchNotes = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get(`/api/notemaker`, {timeout:5000});
            setNotes(res.data || []);
        } catch (err) {
            console.error(err);
            setError("Failed to load notes");
            setNotes([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    const filteredNotes = useMemo(() => {
        return notes.filter(n => {
            const matchesQuery = [n.title, n.content].join(" ").toLowerCase().includes(query.toLowerCase());
            const matchesColor = colorFilter === null ? true : n.color === colorFilter;
            return matchesQuery && matchesColor;
        })
    }, [notes, query, colorFilter]);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/api/notemaker/${id}`, {timeout:5000});
            setNotes(prev => prev.filter(n => n._id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete note");
            fetchNotes();
        }
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-medium">All Notes</h1>
                <div className="flex items-center gap-2">
                    <button className="btn btn-accent" onClick={fetchNotes} disabled={loading}><RefreshCcw size={16} /> {loading ? "Refreshing..." : "Refresh"}</button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <input
                    type="search"
                    placeholder="Search title or content..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="input w-full md:w-1/2"
                />

                <div className="flex items-center gap-2">
                    <div className="label mr-2">Filter by color</div>
                    <div className="flex gap-2">
                        <button
                            className={`w-8 h-8 rounded ${colorFilter === null ? "ring-2 ring-offset-2" : ""}`}
                            onClick={() => setColorFilter(null)}
                            aria-label="All colors"
                        >All</button>
                        {colorsPreview.map((cls, idx) => (
                            <button
                                key={idx}
                                onClick={() => setColorFilter(idx)}
                                className={`${cls} w-8 h-8 rounded ${colorFilter === idx ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                                aria-label={`Filter color ${idx+1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {loading && <div className="text-sm text-gray-500">Loading notes...</div>}
            {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

                {(!loading && filteredNotes.length === 0) ? (
                <div className="text-center text-gray-600 p-8 border rounded">No notes found. Create your first note!</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                    {filteredNotes.map((note, index) => (
                        <Card key={note._id || index} note={note} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage
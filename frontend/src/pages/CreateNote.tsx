import { useEffect, useState } from "react"
import colorsPreview from "../components/ColorsPreview"
import { toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css"
import api from "../lib/axios";

const CreateNote = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [color, setColor] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const submit = async (e?: any) => {
      if (e && e.preventDefault) e.preventDefault();
      setError(null);
      setSuccess(null);
      if (!title.trim() || !content.trim()) {
        setError("Title and content are required");
        return;
      }

      setIsSaving(true);
      try {
        await api.post(`/api/notemaker`, {
          title: title.trim(),
          content: content.trim(),
          color: color
        }, {timeout: 5000})
        setSuccess("Note saved successfully");
        setTitle("");
        setContent("");
        setColor(0);
      } catch (err) {
        console.error(err);
        setError("Failed to save note. Try again.");
      } finally {
        setIsSaving(false);
      }
    }

    useEffect(() => {
      if (success) {
        toast.success(success);
      } else if (error) {
        toast.error(error);
      }
    }, [success, error]);

  return (
    <div className="p-4 space-y-4">
      <form onSubmit={submit} className="space-y-4">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-lg">Enter title</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {!title.trim() && <p className="text-sm text-red-500 mt-1">Required</p>}
        </fieldset>

        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-lg">Enter content</legend>
          <textarea
            className="textarea h-36 w-full"
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
          ></textarea>
          {!content.trim() && <p className="text-sm text-red-500 mt-1">Required</p>}
        </fieldset>

        <div>
          <div className="label mb-2">Pick a color</div>
          <div className="flex gap-2 flex-wrap">
            {colorsPreview.map((cls, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setColor(index)}
                className={`${cls} w-10 h-10 rounded-md shadow-sm flex items-center justify-center ${color === index ? "ring-2 ring-offset-2 ring-primary" : "opacity-90"}`}
                aria-label={`Select color ${index + 1}`}
              >
                {color === index ? "✓" : ""}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <button className="btn btn-primary" type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Note"}
            </button>
          </div>
          <div className="text-right">
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-500">{success}</div>}
          </div>
        </div>
      </form>

      <div>
        <div className="label mb-2">Live preview</div>
        <div className={`${colorsPreview[color]} p-4 rounded-md shadow-md min-h-20`}>
          <h3 className="font-semibold text-lg">{title || "Title preview"}</h3>
          <p className="mt-2">{content || "Content preview..."}</p>
        </div>
      </div>
    </div>
  )
}

export default CreateNote
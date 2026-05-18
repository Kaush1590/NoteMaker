import type { Notes } from "./Notes"
import { Link } from "react-router"
import colors from "./Colors"
import { Trash, View } from "lucide-react"
type Props = {
    note: Notes,
    onDelete?: (id: string) => void,
}

const Card = ({
    note,
    onDelete,
}: Props) => {
  return (
    <div className={colors[note.color]}>
      <div className="card-title font-semibold text-2xl p-4">{note.title}</div>
      <div className="card-body font-medium text-base p-4">{note.content}</div>
      <div className="card-actions justify-end m-1 gap-2">
        <Link
          to={`/note/${note._id}`}
          className="btn btn-neutral"
        ><View size={16} />View</Link>
        <button
          className="btn btn-error"
          onClick={() => {
            if (!onDelete) return;
            if (confirm("Delete this note? This action cannot be undone.")) {
              onDelete(note._id);
            }
          }}
        ><Trash size={16} />Delete</button>
      </div>
    </div>
  )
}

export default Card
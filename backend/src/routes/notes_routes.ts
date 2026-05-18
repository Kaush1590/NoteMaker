import express from "express";

import {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote
} from "../controllers/notes_controller.ts";

import validateNote from "../middleware/validateNote.ts";
import asyncHandler from "../middleware/asyncHandler.ts";

const router = express.Router();

router.get("/", asyncHandler(getAllNotes));
router.get("/:id", asyncHandler(getNote));
router.post("/", validateNote, asyncHandler(createNote));
router.put("/:id", validateNote, asyncHandler(updateNote));
router.delete("/:id", asyncHandler(deleteNote));

export default router;
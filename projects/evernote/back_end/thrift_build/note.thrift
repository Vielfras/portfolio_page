struct Note {
    1: string title,
    2: string content,
}

service NoteService {
    void saveNote(1: Note note),
    Note getNote(1: string title),
}

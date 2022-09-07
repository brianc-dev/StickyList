import { QuickSQLite } from 'react-native-quick-sqlite';

export const DATABASE_NAME = 'stickylist';
const BACKGROUND_COLOR = 'EAF9FC';

let isDatabaseOpen = false

export async function openDatabase() {
    const dbOpenResult = QuickSQLite.open(DATABASE_NAME, 'databases');
    if (dbOpenResult.status) {
        console.error('Database could not be opened');
    } else {
        isDatabaseOpen = true
    }
}

export async function closeDatabase() {
    const dbCloseResult = QuickSQLite.close(DATABASE_NAME, 'databases');

    if (dbCloseResult) {
        console.error('Database could not be closed');
    } else {
        isDatabaseOpen = false;
    }
}

export async function createTable() {
    if (!isDatabaseOpen) {
        return 1
    }
    let result = QuickSQLite.executeSql(DATABASE_NAME, 'CREATE TABLE IF NOT EXISTS note(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, datetime_created TEXT NOT NULL, datetime_modified TEXT, title VARCHAR NOT NULL, content TEXT)');
    return result.status;
}

export async function insertNote({ title, content }) {
    if (!isDatabaseOpen) {
        return 1;
    }
    let res = QuickSQLite.executeSql(DATABASE_NAME, "INSERT INTO note VALUES(null, datetime('now'), null, ?, ?)", [title, content]);
    let result = { insertId: res.insertId, metadata: res.metadata, rowsAffected: res.rowsAffected, status: res.status }
    return result;
}

export function getNotes() {
    if (isDatabaseOpen) {
        let { status, rows } = QuickSQLite.executeSql(
            DATABASE_NAME,
            'SELECT * FROM note ORDER BY datetime_created DESC, datetime_modified DESC'
        );
        if (!status) {
            return rows;
        } else {
            return { _array: [] };
        }
    }
}

export function getNote(id) {
    if (isDatabaseOpen) {
        let {status, rows} = QuickSQLite.executeSql(
            DATABASE_NAME,
            'SELECT * FROM note WHERE id = ?',
            [id]
        );
        if (status) {
            return;
        }
        return rows._array[0];
    }
}

export function deleteNote(note) {
    if (isDatabaseOpen) {
        let res = QuickSQLite.executeSql(
            DATABASE_NAME,
            'DELETE FROM note WHERE id = ?',
            [note.id]
        );
        return { insertId: res.insertId, message: res.message, metadata: res.metadata, rowsAffected: res.rowsAffected, status: res.status}
    }
}

export async function updateNote(note) {
    if (isDatabaseOpen) {
        let result = QuickSQLite.executeSql(DATABASE_NAME, 'UPDATE note SET title = ?, content = ? WHERE id = ?', [note.title, note.content, note.id]);
        return { insertId: result.insertId, metadata: result.metadata, rowsAffected: result.rowsAffected, status: result.status };
    }
}
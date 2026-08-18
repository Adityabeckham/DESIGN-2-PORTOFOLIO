import { neon } from '@neondatabase/serverless';
import { StickyNote } from '@/types';

export type { StickyNote };

// Fallback in-memory store if NEON_DATABASE_URL is not configured yet
const memoryNotesStore: StickyNote[] = [
  {
    id: 'demo-note-1',
    author: 'Zafarsyah',
    message: 'Desain scrapbook-nya keren banget bro! Efek pesawat kertas sama interaktif fisika-nya berasa hidup banget 🔥',
    color: 'yellow',
    likes: 12,
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'demo-note-2',
    author: 'DBS Foundation Mentor',
    message: 'Solid full-stack execution & capstone implementation! Keep pushing your boundaries with React & Neon DB 🚀',
    color: 'blue',
    likes: 8,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'demo-note-3',
    author: 'Sarah (Tech Recruiter)',
    message: 'Impressive portfolio layout and clean code architecture! Open for a quick chat regarding Frontend Web roles? 💼',
    color: 'pink',
    likes: 15,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export function getDbClient() {
  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes('placeholder')) {
    return null;
  }
  return neon(connectionString);
}

export async function initDatabaseTable() {
  const sql = getDbClient();
  if (!sql) return;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS guestbook_notes (
        id VARCHAR(64) PRIMARY KEY,
        author VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        color VARCHAR(20) DEFAULT 'yellow',
        likes INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    console.error('Neon DB Table Init Error:', error);
  }
}

export async function fetchAllNotes(): Promise<StickyNote[]> {
  const sql = getDbClient();
  if (!sql) {
    return memoryNotesStore;
  }

  try {
    await initDatabaseTable();
    const rows = await sql`
      SELECT id, author, message, color, likes, created_at 
      FROM guestbook_notes 
      ORDER BY created_at DESC 
      LIMIT 100
    `;

    return rows.map((r: any) => ({
      id: String(r.id),
      author: String(r.author),
      message: String(r.message),
      color: String(r.color || 'yellow'),
      likes: Number(r.likes || 0),
      created_at: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString()
    }));
  } catch (error) {
    console.error('Error fetching notes from Neon DB:', error);
    return memoryNotesStore;
  }
}

export async function insertNote(note: StickyNote): Promise<StickyNote> {
  const sql = getDbClient();
  if (!sql) {
    memoryNotesStore.unshift(note);
    return note;
  }

  try {
    await initDatabaseTable();
    await sql`
      INSERT INTO guestbook_notes (id, author, message, color, likes, created_at)
      VALUES (${note.id}, ${note.author}, ${note.message}, ${note.color}, ${note.likes}, NOW())
    `;
    return note;
  } catch (error) {
    console.error('Error inserting note to Neon DB:', error);
    memoryNotesStore.unshift(note);
    return note;
  }
}

export async function incrementNoteLikes(id: string): Promise<number> {
  const sql = getDbClient();
  if (!sql) {
    const target = memoryNotesStore.find(n => n.id === id);
    if (target) {
      target.likes += 1;
      return target.likes;
    }
    return 1;
  }

  try {
    const result = await sql`
      UPDATE guestbook_notes 
      SET likes = likes + 1 
      WHERE id = ${id}
      RETURNING likes
    `;
    return result[0]?.likes ?? 1;
  } catch (error) {
    console.error('Error incrementing likes in Neon DB:', error);
    return 1;
  }
}

export async function deleteNote(id: string): Promise<boolean> {
  const sql = getDbClient();
  if (!sql) {
    const idx = memoryNotesStore.findIndex(n => n.id === id);
    if (idx !== -1) {
      memoryNotesStore.splice(idx, 1);
    }
    return true;
  }

  try {
    await sql`DELETE FROM guestbook_notes WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error('Error deleting note from Neon DB:', error);
    return false;
  }
}

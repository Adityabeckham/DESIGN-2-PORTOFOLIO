import { NextResponse } from 'next/server';
import { fetchAllNotes, insertNote, incrementNoteLikes, deleteNote } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const notes = await fetchAllNotes();
    return NextResponse.json({ success: true, notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { author, message, color } = body;

    if (!author || !message) {
      return NextResponse.json({ success: false, error: 'Author and message are required' }, { status: 400 });
    }

    // Input sanitization & character limits
    const sanitizedAuthor = String(author).trim().substring(0, 80);
    const sanitizedMessage = String(message).trim().substring(0, 300);
    const validColor = ['yellow', 'blue', 'green', 'pink', 'cream'].includes(color) ? color : 'yellow';

    const newNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      author: sanitizedAuthor,
      message: sanitizedMessage,
      color: validColor,
      likes: 0,
      created_at: new Date().toISOString()
    };

    const savedNote = await insertNote(newNote);
    return NextResponse.json({ success: true, note: savedNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create note' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Note ID is required' }, { status: 400 });
    }

    const newLikes = await incrementNoteLikes(id);
    return NextResponse.json({ success: true, likes: newLikes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update likes' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Note ID is required' }, { status: 400 });
    }

    const success = await deleteNote(id);
    return NextResponse.json({ success }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete note' }, { status: 500 });
  }
}

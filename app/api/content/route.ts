import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const contentFilePath = path.join(process.cwd(), 'public/data/content.json');

export async function GET() {
  try {
    const fileContent = await readFile(contentFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data.contents);
  } catch (error) {
    console.error('Error loading content:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json();
    const fileContent = await readFile(contentFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Check if content with this contentId already exists
    const index = data.contents.findIndex((item: any) => item.contentId === content.contentId);
    
    if (index >= 0) {
      // Update existing content
      data.contents[index] = content;
    } else {
      // Add new content
      data.contents.push(content);
    }
    
    await writeFile(contentFilePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { contentId } = await request.json();
    const fileContent = await readFile(contentFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Filter out the content with matching contentId
    data.contents = data.contents.filter((item: any) => item.contentId !== contentId);
    
    await writeFile(contentFilePath, JSON.stringify(data, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
} 
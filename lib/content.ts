// Content utilities for JSON-based storage
import { promises as fs } from 'fs';
import path from 'path';

// Simplified WebContent interface - only what we need
export interface WebContent {
  contentId: string;
  text: string[];
  image?: string;
}

// Cache for storing fetched content to avoid reading the file repeatedly
let contentCache: Record<string, WebContent> = {};
const contentFilePath = path.join(process.cwd(), 'public/data/content.json');

/**
 * Fetch all content from the JSON file
 */
export async function getAllContent(): Promise<WebContent[]> {
  // Return from cache if available
  if (Object.keys(contentCache).length > 0) {
    return Object.values(contentCache);
  }

  try {
    const fileContent = await fs.readFile(contentFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Populate the cache
    data.contents.forEach((item: WebContent) => {
      contentCache[item.contentId] = item;
    });
    
    return data.contents;
  } catch (error) {
    console.error("Error loading content from JSON:", error);
    return [];
  }
}

/**
 * Get content by contentId
 */
export function getContent(contentId: string, defaultText: string[] = ["Content not found"]): string[] {
  const content = contentCache[contentId];
  if (content && content.text) {
    return content.text;
  }
  return defaultText;
}

/**
 * Get the first text item for a contentId
 */
export function getContentText(contentId: string, defaultText: string = "Content not found"): string {
  const content = contentCache[contentId];
  if (content && content.text && content.text.length > 0) {
    return content.text[0];
  }
  return defaultText;
}

/**
 * Get image URL for a contentId
 */
export function getContentImage(contentId: string, defaultImage?: string): string | undefined {
  const content = contentCache[contentId];
  if (content && content.image) {
    return content.image;
  }
  return defaultImage;
}

/**
 * Preload all content into cache
 */
export async function preloadContent(): Promise<void> {
  await getAllContent();
}

/**
 * Clear the content cache
 */
export function clearContentCache(): void {
  contentCache = {};
} 
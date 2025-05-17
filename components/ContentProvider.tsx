'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WebContent } from '@/lib/content';

interface ContentContextType {
  isLoading: boolean;
  error: string | null;
  getContentText: (contentId: string, defaultText?: string) => string;
  getContentArray: (contentId: string, defaultArray?: string[]) => string[];
  getContentImage: (contentId: string, defaultImage?: string) => string | undefined;
}

const ContentContext = createContext<ContentContextType>({
  isLoading: true,
  error: null,
  getContentText: () => '',
  getContentArray: () => [],
  getContentImage: () => undefined,
});

export const useContent = () => useContext(ContentContext);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, WebContent>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('/api/content');
        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Create a lookup map for faster content retrieval
        const contentMap: Record<string, WebContent> = {};
        data.forEach((item: WebContent) => {
          contentMap[item.contentId] = item;
        });
        
        setContent(contentMap);
      } catch (err: any) {
        console.error('Error loading content:', err);
        setError(err.message || 'Failed to load content');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchContent();
  }, []);

  /**
   * Get the text content for a contentId (returns the first item in the text array)
   */
  const getContentText = (contentId: string, defaultText: string = ''): string => {
    const item = content[contentId];
    if (item && item.text && item.text.length > 0) {
      return item.text[0];
    }
    return defaultText;
  };

  /**
   * Get the entire text array for a contentId
   */
  const getContentArray = (contentId: string, defaultArray: string[] = []): string[] => {
    const item = content[contentId];
    if (item && Array.isArray(item.text)) {
      return item.text;
    }
    return defaultArray;
  };

  /**
   * Get the image URL for a contentId
   */
  const getContentImage = (contentId: string, defaultImage?: string): string | undefined => {
    const item = content[contentId];
    if (item && item.image) {
      return item.image;
    }
    return defaultImage;
  };

  return (
    <ContentContext.Provider
      value={{
        isLoading,
        error,
        getContentText,
        getContentArray,
        getContentImage,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
} 
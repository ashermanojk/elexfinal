"use client"
import { useEffect, useState } from "react"
import ImageUpload from "@/components/admin/imageUpload"
import { WebContent } from "@/lib/content"

export default function WebContentAdmin() {
  const [contents, setContents] = useState<WebContent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedContentId, setSelectedContentId] = useState<string>("")
  const [editContent, setEditContent] = useState<WebContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [newContent, setNewContent] = useState<{ contentId: string; text: string[]; image?: string }>({ contentId: "", text: [""], image: "" })
  const [adding, setAdding] = useState(false)

  // Fetch all content on mount
  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/content')
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`)
        }
        const data = await response.json()
        
        // Process data to ensure text is an array
        const processedData = data?.map((item: any) => ({
          ...item,
          text: Array.isArray(item.text) ? item.text : [item.text].filter(Boolean)
        })) || [];
        
        setContents(processedData)
      } catch (err: any) {
        console.error("Fetch error:", err)
        setError(`Unexpected error: ${err.message || JSON.stringify(err)}`)
      } finally {
        setLoading(false)
      }
    }
    fetchAllContent()
  }, [])

  // Set editContent when contentId changes
  useEffect(() => {
    if (!selectedContentId) {
      setEditContent(null)
      return
    }
    const found = contents.find(c => c.contentId === selectedContentId)
    setEditContent(found || null)
  }, [selectedContentId, contents])

  // Handle form changes
  const handleChange = (field: keyof WebContent, value: any) => {
    if (!editContent) return
    setEditContent({ ...editContent, [field]: value })
  }

  // Handle image upload
  const handleImageUpload = (url: string) => {
    if (!editContent) return
    setEditContent({ ...editContent, image: url })
  }

  // Save changes to JSON file via API
  const handleSave = async () => {
    if (!editContent) return
    setSaving(true)
    setError(null)
    try {
      // Ensure text is an array
      const textArray = Array.isArray(editContent.text) ? editContent.text : [editContent.text].filter(Boolean);
      
      const updateData = {
        contentId: editContent.contentId,
        text: textArray,
        image: editContent.image || null,
      };
      
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      
      // Refresh data after update
      const refreshResponse = await fetch('/api/content')
      if (!refreshResponse.ok) {
        throw new Error(`HTTP error ${refreshResponse.status}`)
      }
      
      const refreshData = await refreshResponse.json()
      
      // Process data to ensure text is an array
      const processedData = refreshData.map((item: any) => ({
        ...item,
        text: Array.isArray(item.text) ? item.text : [item.text].filter(Boolean)
      }));
      
      setContents(processedData)
    } catch (err: any) {
      console.error("Save error:", err)
      setError(`Unexpected error: ${err.message || JSON.stringify(err)}`)
    } finally {
      setSaving(false)
    }
  }

  // Add new content to JSON file via API
  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newContent.contentId || newContent.text.length === 0 || newContent.text.some(t => !t)) {
      setError("Content ID and at least one text item are required")
      return
    }
    
    setAdding(true)
    setError(null)
    
    try {
      // Ensure text is an array with no empty values
      const textArray = newContent.text.filter(t => t.trim() !== "");
      
      if (textArray.length === 0) {
        setError("At least one non-empty text item is required")
        setAdding(false)
        return
      }
      
      const insertData = {
        contentId: newContent.contentId,
        text: textArray,
        image: newContent.image || null,
      };
      
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(insertData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      
      // Refresh data after adding
      const refreshResponse = await fetch('/api/content')
      if (!refreshResponse.ok) {
        throw new Error(`HTTP error ${refreshResponse.status}`)
      }
      
      const refreshData = await refreshResponse.json()
      
      // Process data to ensure text is an array
      const processedData = refreshData.map((item: any) => ({
        ...item,
        text: Array.isArray(item.text) ? item.text : [item.text].filter(Boolean)
      }));
      
      setContents(processedData)
      setNewContent({ contentId: "", text: [""], image: "" })
      setError(null)
    } catch (err: any) {
      console.error("Add error details:", err)
      setError(`Unexpected error: ${err.message || JSON.stringify(err)}`)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 text-gray-200">
      <h2 className="text-xl font-bold mb-4">Website Content Admin</h2>
      
      {error && (
        <div className="text-red-500 my-2 p-2 bg-red-100 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      
      {loading && <div className="my-2 p-2 bg-slate-800 rounded">Loading...</div>}
      
      <div className="mb-6 text-slate-900">
        <label className="block mb-2 font-semibold text-gray-100">Select Content ID:</label>
        <select
          value={selectedContentId}
          onChange={e => setSelectedContentId(e.target.value)}
          className="w-full p-2 rounded border"
        >
          <option value="">Select content...</option>
          {contents.map(content => (
            <option key={content.contentId} value={content.contentId}>
              {content.contentId}
            </option>
          ))}
        </select>
      </div>
      
      {editContent && (
        <form onSubmit={e => { e.preventDefault(); handleSave() }} className="space-y-4 bg-slate-800 p-4 rounded-lg">
          <div>
            <label className="block font-semibold mb-1">Text</label>
            {editContent.text.map((t, idx) => (
              <div key={idx} className="flex gap-2 mb-1">
                <textarea
                  value={t}
                  onChange={e => {
                    if (!editContent) return;
                    const arr = [...editContent.text];
                    arr[idx] = e.target.value;
                    setEditContent({ ...editContent, text: arr });
                  }}
                  className="w-full p-2 rounded border"
                  rows={2}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => {
                    if (!editContent) return;
                    const arr = [...editContent.text];
                    arr.splice(idx, 1);
                    setEditContent({ ...editContent, text: arr.length ? arr : [""] });
                  }} 
                  className="text-red-500"
                  disabled={editContent.text.length <= 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={() => {
              if (!editContent) return;
              setEditContent({ ...editContent, text: [...editContent.text, ""] });
            }} className="text-green-500">Add Text</button>
          </div>
          <div>
            <label className="block font-semibold mb-1">Image</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={editContent.image || ""}
                onChange={e => handleChange("image", e.target.value)}
                className="flex-1 px-2 py-1 rounded border"
              />
              <ImageUpload bucket="images" onImageUploaded={handleImageUpload} existingImageUrl={editContent.image} />
            </div>
          </div>
          <button type="submit" disabled={saving} className="bg-orange-500 text-white px-4 py-2 rounded">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
      
      <div className="mt-8">
        <h3 className="font-semibold mb-2">All Content</h3>
        {contents.length === 0 ? (
          <div className="text-slate-400 italic">No content found</div>
        ) : (
          <ul className="divide-y divide-slate-700">
            {contents.map(content => (
              <li key={content.contentId} className="py-2 flex flex-col">
                <span className="font-mono text-xs text-slate-400">{content.contentId}</span>
                <span className="truncate">
                  {Array.isArray(content.text) 
                    ? content.text.join(" | ") 
                    : String(content.text)}
                </span>
                {content.image && (
                  <img src={content.image} alt="content" className="h-12 mt-1 rounded" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
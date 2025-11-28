"use client"

import { useConversation } from "@elevenlabs/react"
import { useCallback, useState } from "react"

export function Conversation() {
  const [error, setError] = useState<string | null>(null)
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (e) => {
        console.error("Error:", e)
        setError(typeof e === 'string' ? e : (e as any).message || "An error occurred")
    },
  })
  console.log('nada')
  const startConversation = useCallback(async () => {
    try {
      setError(null)
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Fetch signed URL
      const agentId = process.env.NEXT_PUBLIC_AGENT_ID
      if (!agentId) {
        throw new Error("NEXT_PUBLIC_AGENT_ID is not configured")
      }

      const response = await fetch(`/api/elevenlabs/signed-url?agent_id=${agentId}`)
      if (!response.ok) {
        throw new Error("Failed to get signed URL")
      }

      const { signed_url } = await response.json()

      // Start conversation
      await conversation.startSession({
        signedUrl: signed_url,
      })
    } catch (e: any) {
      console.error("Failed to start conversation:", e)
      setError(e.message)
    }
  }, [conversation])

  const stopConversation = useCallback(async () => {
    await conversation.endSession()
  }, [conversation])

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px] gap-8">
      {/* Status & Visualizer */}
      <div className="relative flex items-center justify-center w-64 h-64">
        {conversation.status === 'connected' ? (
            <div className="relative flex items-center justify-center">
                {/* Outer pulsing ring */}
                <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full animate-ping" />
                {/* Inner pulsing ring */}
                <div className="absolute w-48 h-48 bg-blue-500/30 rounded-full animate-pulse" />
                {/* Core */}
                <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm" />
                </div>
            </div>
        ) : (
            <div className="w-32 h-32 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-300 dark:bg-zinc-700 rounded-full" />
            </div>
        )}
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
            {conversation.status === 'connected' ? 'Interview in Progress' : 'Ready to Start'}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
            {conversation.status === 'connected' 
                ? (conversation.isSpeaking ? "Agent is speaking..." : "Listening...") 
                : "Click start to begin your session"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-6">
        {conversation.status !== 'connected' ? (
            <button
              onClick={startConversation}
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
            >
              Start Interview
            </button>
        ) : (
            <button
              onClick={stopConversation}
              className="px-8 py-4 bg-red-500/10 text-red-600 border-2 border-red-500/50 text-lg font-semibold rounded-full hover:bg-red-500 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              End Session
            </button>
        )}
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}

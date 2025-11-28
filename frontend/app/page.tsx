"use client"

import { Conversation } from "@/components/Conversation"
import { useState } from "react"

export default function Home() {
  const [isInterviewActive, setIsInterviewActive] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:text-white transition-colors duration-500">
      
      {/* Header - Always visible but subtle in interview mode */}
      <div className={`z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex transition-opacity duration-500 ${isInterviewActive ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Behavioral Interview Practice
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center w-full max-w-5xl min-h-[600px]">
        
        {/* Landing Page Content */}
        <div className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center ${isInterviewActive ? 'opacity-0 pointer-events-none translate-y-10' : 'opacity-100 translate-y-0'}`}>
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <h1 className="text-6xl font-bold text-center mb-8">
                Master Your <span className="text-blue-600">Behavioral</span> Interviews
                </h1>
            </div>

            <button 
                onClick={() => setIsInterviewActive(true)}
                className="mt-12 px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
            >
                Start Practice Session
            </button>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left mt-20 gap-8">
                <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    Practice{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Simulate real interview scenarios with AI-driven feedback.
                </p>
                </div>

                <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    Learn{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Access a library of common behavioral questions and STAR method guides.
                </p>
                </div>

                <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    Track{' '}
                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                    </span>
                </h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                    Monitor your progress and see your improvement over time.
                </p>
                </div>
            </div>
        </div>

        {/* Interview Room Content */}
        <div className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center ${isInterviewActive ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>
            <Conversation />
            
            <button 
                onClick={() => setIsInterviewActive(false)}
                className="absolute top-0 right-0 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
                Exit Session
            </button>
        </div>

      </div>
    </main>
  )
}

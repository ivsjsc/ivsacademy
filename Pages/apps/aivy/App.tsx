import React from 'react';
import { AivyChatWidget } from './components/AivyChatWidget';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Bar (Demo) */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="font-semibold text-lg text-slate-800 tracking-tight">Acme Corp</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-indigo-600 transition-colors">Products</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Solutions</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#" className="text-indigo-600">Enterprise</a>
        </div>
        <div className="flex gap-3">
          <button className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">Log in</button>
          <button className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors">Sign up</button>
        </div>
      </nav>

      {/* Hero Section (Demo) */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-[url('https://picsum.photos/1920/1080?blur=5')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
        
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
            New AI Features
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Supercharge your workflow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Aivy</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Experience the next generation of intelligent assistance. 
            Integrated directly into your platform for seamless productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all hover:-translate-y-1">
              Get Started Free
            </button>
            <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg shadow-sm hover:bg-slate-50 transition-all">
              View Demo
            </button>
          </div>
        </div>

        {/* Feature Grid (Demo) */}
        <div className="relative z-10 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full text-left">
           {[
             { title: 'Smart Analytics', desc: 'Real-time data processing with AI insights.' },
             { title: 'Global Scale', desc: 'Deployed on edge networks for low latency.' },
             { title: 'Secure Core', desc: 'Enterprise-grade encryption by default.' }
           ].map((item, i) => (
             <div key={i} className="bg-white/80 backdrop-blur border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
               <div className="w-12 h-12 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center text-indigo-600">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
               </div>
               <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
               <p className="text-slate-600">{item.desc}</p>
             </div>
           ))}
        </div>
      </main>

      {/* 
        USAGE EXAMPLE: 
        Pass your backend API URL here. 
        If running locally, it might be http://localhost:3000/api/ai-router
      */}
      <AivyChatWidget 
        apiUrl="/api/ai-router" 
        title="Aivy Assistant"
        enableVoice={true}
      />
    </div>
  );
}

export default App;

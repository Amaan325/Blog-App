import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 px-6 py-12 flex items-center justify-center">
      <div className="max-w-3xl bg-white rounded-xl shadow-lg p-10 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-red-600">About This Blog</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to <span className="font-semibold text-black">MyBlog</span> — a place where thoughts, code, creativity, and community meet.
        </p>

        <p className="text-md leading-relaxed mb-4">
          This blog is built with a mission: to give developers, tech enthusiasts, and writers a space to share knowledge, explore ideas, and grow together.
        </p>

        <p className="text-md leading-relaxed mb-4">
          Whether it’s deep dives into web development, tutorials, personal experiences, or creative opinions — MyBlog lets every voice be heard. You can read, write, edit, and engage with others by commenting on posts.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-2">What’s Under the Hood?</h2>
        <ul className="list-disc pl-6 text-md mb-4">
          <li>⚛️ React + Tailwind CSS for fast, responsive UI</li>
          <li>📝 Express + MongoDB backend for powerful blog management</li>
          <li>🔐 Auth system with session cookies</li>
          <li>💬 Live commenting and real-time updates</li>
        </ul>

        <p className="text-md leading-relaxed mb-4">
          This is more than just a project — it's an evolving platform built with passion for clean code, good design, and meaningful communication.
        </p>

        <p className="text-sm text-gray-500 italic mt-6">
          Created with by Mohammad Ahmed
        </p>
      </div>
    </div>
  );
};

export default About;

import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace with actual backend POST endpoint if available
    if (!form.name || !form.email || !form.message) {
      enqueueSnackbar("Please fill in all fields.", { variant: "warning" });
      return;
    }

    enqueueSnackbar("Message sent successfully!", { variant: "success" });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 px-6 py-12 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-md">
          Have a question, feedback, or collaboration idea? We'd love to hear from you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="w-full min-h-[120px] px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-red-400 focus:outline-none"
              placeholder="Type your message here..."
            />
          </div>
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

# 🚀 GenCMS – The AI-Powered Website Generator (Built with Google Gemini)

**GenCMS** is an open-source AI-powered CMS that generates complete websites — block by block — using Google Gemini. Just type in a topic, and GenCMS does the rest: it infers content structure, generates UI components, and builds a dynamic, editable site in seconds.

---

## 🧠 How It Works

1. **Input a topic** (e.g., "AI for Education")
2. **LLM infers block types** (hero, paragraph, code, testimonial, etc.)
3. **Each block is generated separately** using Google Gemini
4. **Blocks are stored** in a MongoDB collection
5. **Frontend renders the page** dynamically using React & Tailwind
6. **Supports child page generation** (e.g., FAQ, About, Resources)

---

## ✨ Features

- ✅ **Modular block-wise LLM generation** (efficient & token-optimized)
- ✅ **Plug-and-play block architecture** – add custom blocks easily
- ✅ **Session-based generation tracking** – build multiple sites
- ✅ **Dynamic child page creation** – powered by generative AI
- ✅ **React + Tailwind UI + MongoDB backend**
- ✅ **Infinite routing support** with hierarchical navigation
- ✅ **Preview and editing-ready frontend UI**

---

## 🧰 Tech Stack

- **Frontend**: React + Next.js + Tailwind CSS  
- **Backend**: Node.js API Routes + MongoDB (via Mongoose)  
- **AI Engine**: Google Generative AI (Gemini)  
- **Auth/Session**: LocalStorage session tracking  
- **Deployment**: Works great on Vercel + MongoDB Atlas

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/Asdts/GenCMS.git
cd GenCMS
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up `.env` file

Create a `.env.local` file in the root directory:

```env
GOOGLE_API=your_google_genai_api_key
GOOGLE_MODEL=gemini-2.0-flash
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the dev server

```bash
npm run dev
```

Now visit `http://localhost:3000` in your browser.

---

## 🏗 Block Types Supported

- `hero`
- `header`
- `paragraph`
- `content`
- `code` (with syntax highlighting)
- `table`
- `form`
- `testimonial`
- `feature`
- `dropBlock`
- `footer`
- `mediaBlock`

You can easily add more by updating:
- `agents`
- `models`
- `components/BlockRenderer.tsx`

---

## 💡 Use Cases

- 🔧 Founders generating startup landing pages
- 📚 Educators teaching AI or content architecture
- 📈 Agencies scaling dynamic page creation
- 💡 Developers building custom CMS blocks with AI

---

## 🤝 Contributing

All contributions are welcome! 🎉

- Submit issues for bugs or feature requests
- Fork and make a PR for improvements
- Add your own block types or AI logic

---

## 📢 License

MIT License — free to use, modify, and distribute.

---

## 🔗 Connect

If you use GenCMS or build something cool with it, tag me on [LinkedIn](https://linkedin.com/in/asdts) or drop a star ⭐ on the repo!
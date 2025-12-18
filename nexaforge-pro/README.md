# 🚀 NexaForge Pro - Ultimate AI Website Builder

Production-ready AI-driven website builder where autonomous agents handle end-to-end site creation.

## 🏗️ Architecture

**Tech Stack**: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion + Supabase + OpenAI GPT-4o + DALL-E 3 + Stripe

### 🤖 Agentic System (The "Forge" Engine)

1. **Architect Agent**: Analyzes user input → selects Industry (24 types) + Theme (20 styles)
2. **Copywriter Agent**: Generates SEO-optimized text, meta tags, JSON-LD
3. **Visual Agent**: Creates hero images via DALL-E 3, selects color palettes
4. **Integration Agent**: Auto-configures Stripe, booking, contact forms

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Configure `.env.local` with your API keys (Supabase, OpenAI, Stripe).

## 🎯 Features

- 24 Industries × 20 Themes = 480+ combinations
- AI-generated hero images (DALL-E 3)
- SEO-optimized content
- Auto-configured integrations
- Real-time preview
- One-click deployment

## 📁 Structure

```
app/api/forge/         # AI orchestration endpoint
lib/agents/            # 4 AI agents + orchestrator
components/            # UI components
```

## 🚀 Deploy

```bash
vercel deploy --prod
```

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sparkles, Wand2, Loader2 } from 'lucide-react';
import { WebsiteBlueprint } from '@/lib/agents/orchestrator';

export function ForgeBuilder() {
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [blueprint, setBlueprint] = useState<WebsiteBlueprint | null>(null);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/forge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      setBlueprint(data.blueprint);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-white/20 bg-white/40 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              NexaForge Pro
            </h1>
          </div>
          <Button variant="outline">Sign In</Button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-20">
        {!blueprint ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-8"
            >
              <Sparkles className="w-16 h-16 text-purple-600" />
            </motion.div>

            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered Website Builder
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Describe your dream website, and watch our AI agents build it in seconds.
            </p>

            <div className="flex gap-4 mb-8">
              <Input
                placeholder="E.g., I need a modern fitness studio website with booking..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                className="text-lg h-14"
              />
              <Button
                variant="gradient"
                onClick={handleGenerate}
                disabled={isGenerating || !userInput.trim()}
                className="h-14 px-8 whitespace-nowrap"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Forging...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Site
                  </>
                )}
              </Button>
            </div>

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3 text-left bg-white/60 backdrop-blur-sm rounded-xl p-6"
              >
                <AgentStatus label="Architect Agent" status="analyzing" />
                <AgentStatus label="Copywriter Agent" status="writing" />
                <AgentStatus label="Visual Agent" status="designing" />
                <AgentStatus label="Integration Agent" status="configuring" />
              </motion.div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              <StatCard number="24" label="Industries" />
              <StatCard number="20" label="Themes" />
              <StatCard number="4" label="AI Agents" />
              <StatCard number="< 30s" label="Generation Time" />
            </div>
          </motion.div>
        ) : (
          <GeneratedPreview blueprint={blueprint} onReset={() => setBlueprint(null)} />
        )}
      </div>
    </div>
  );
}

function AgentStatus({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center gap-3">
      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
      <span className="font-medium">{label}</span>
      <span className="text-sm text-gray-500">{status}...</span>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
    >
      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
    </motion.div>
  );
}

function GeneratedPreview({ blueprint, onReset }: { blueprint: WebsiteBlueprint; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Your Website is Ready! 🎉</h2>
        <Button onClick={onReset}>Create Another</Button>
      </div>

      <div className="grid gap-6">
        {/* Hero Preview */}
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${blueprint.architecture.primaryColor}, ${blueprint.architecture.secondaryColor})`,
          }}
        >
          <div className="relative h-96 flex items-center justify-center text-white p-12">
            {blueprint.visuals.heroImageUrl && (
              <img
                src={blueprint.visuals.heroImageUrl}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
            )}
            <div className="relative z-10 text-center">
              <h1 className="text-5xl font-bold mb-4">{blueprint.content.heroTitle}</h1>
              <p className="text-xl mb-6">{blueprint.content.heroSubtitle}</p>
              <Button variant="default" className="bg-white text-black hover:bg-gray-100">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {blueprint.content.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
              <p className="text-gray-600 mb-4">{section.content}</p>
              {section.cta && <Button variant="outline">{section.cta}</Button>}
            </motion.div>
          ))}
        </div>

        {/* Integration Status */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Integrations Configured</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {blueprint.integrations.stripeEnabled && (
              <div className="flex items-center gap-2 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                Stripe Payments
              </div>
            )}
            {blueprint.integrations.bookingEnabled && (
              <div className="flex items-center gap-2 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                Booking System
              </div>
            )}
            {blueprint.integrations.contactFormEnabled && (
              <div className="flex items-center gap-2 text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full" />
                Contact Form
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="gradient" className="flex-1">
            Deploy to Production
          </Button>
          <Button variant="outline">Download Code</Button>
        </div>
      </div>
    </motion.div>
  );
}

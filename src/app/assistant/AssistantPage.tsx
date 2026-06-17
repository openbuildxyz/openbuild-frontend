/**
 * Copyright 2024 OpenBuild
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import { useRef, useState } from 'react';

import type { FormEvent } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

function getAssistantApiUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  return `${baseUrl.replace(/\/$/, '')}/ts/v1/assistant/chat`;
}

function parseSseEvents(buffer: string) {
  const events = buffer.split('\n\n');
  return {
    complete: events.slice(0, -1),
    rest: events.at(-1) || '',
  };
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi, I can help with OpenBuild courses, bounties, reputation, and account questions.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = input.trim();
    if (!value || isSending) {
      return;
    }

    const nextMessages: Message[] = [
      ...messages,
      { role: 'user', content: value },
      { role: 'assistant', content: '' },
    ];

    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch(getAssistantApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: window.location.pathname,
          locale: navigator.language,
          messages: nextMessages
            .filter(message => message.content)
            .map(message => ({
              role: message.role,
              content: message.content,
            })),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Assistant is unavailable.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const { complete, rest } = parseSseEvents(buffer);
        buffer = rest;

        for (const eventText of complete) {
          const eventName = eventText
            .split('\n')
            .find(line => line.startsWith('event: '))
            ?.slice(7);
          const dataLine = eventText
            .split('\n')
            .find(line => line.startsWith('data: '));

          if (!dataLine || eventName === 'done') {
            continue;
          }

          const payload = JSON.parse(dataLine.slice(6));

          if (eventName === 'error') {
            throw new Error(payload.message || 'Assistant is unavailable.');
          }

          if (eventName === 'delta' && payload.text) {
            setMessages(current =>
              current.map((message, index) =>
                index === current.length - 1
                  ? { ...message, content: message.content + payload.text }
                  : message,
              ),
            );
          }
        }
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        setMessages(current =>
          current.map((message, index) =>
            index === current.length - 1
              ? { ...message, content: 'The assistant is unavailable right now.' }
              : message,
          ),
        );
      }
    } finally {
      setIsSending(false);
      abortRef.current = null;
    }
  }

  return (
    <main className="flex h-screen flex-col bg-white text-gray">
      <div className="border-b border-gray-400 px-5 py-4">
        <h1 className="text-lg font-bold">OpenBuild Assistant</h1>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#F8F8F8] px-4 py-5">
        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[78%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === 'user'
                    ? 'bg-black text-white'
                    : 'border border-gray-400 bg-white text-gray'
                }`}
              >
                {message.content || '...'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-400 bg-white p-4">
        <div className="mx-auto flex max-w-3xl gap-3">
          <input
            value={input}
            onChange={event => setInput(event.target.value)}
            maxLength={2000}
            className="min-w-0 flex-1 rounded border border-gray-400 px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="Ask OpenBuild Assistant"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="h-12 shrink-0 rounded bg-black px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
}

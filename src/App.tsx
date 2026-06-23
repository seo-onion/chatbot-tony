import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, loading, send } = useChat();

  return (
    <div
      className="flex flex-col bg-slate-200 sm:items-center sm:justify-center sm:p-4 lg:p-8"
      style={{ height: '100dvh' }}
    >
      <div className="flex flex-col w-full h-full sm:max-w-md sm:h-[680px] sm:rounded-2xl sm:shadow-2xl sm:shadow-navy-900/20 overflow-hidden">
        <Header />
        <ChatWindow messages={messages} loading={loading} />
        <ChatInput onSend={send} loading={loading} />
      </div>
    </div>
  );
}

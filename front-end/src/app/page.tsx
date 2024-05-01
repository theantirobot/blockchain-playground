import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-row items-center  h-full gap-8 p-8 bg-slate-400">
      <div className="flex-1 border rounded-lg p-2 h-full flex flex-col bg-white">
        <h1>Adding a subscription</h1>
        <iframe src="/subscriptions" className="w-full flex-1"></iframe>
      </div>
      <div className="border rounded-lg flex-1 h-full p-2 bg-white flex flex-col">
        <h1>Submitting a transaction</h1>
        <iframe src="/dapp" className="w-full flex-1"></iframe>
      </div>
      <div className="flex-1 border rounded-lg p-2 h-full flex flex-col bg-white">
        <h1>Transaction Feed</h1>
        <iframe src="/feed" className="w-full flex-1"></iframe>
      </div>
    </main>
  );
}

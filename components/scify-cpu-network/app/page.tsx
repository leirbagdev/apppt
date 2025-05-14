import IntegrationHub from "@/components/integration-hub"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4 md:p-24">
      <div className="w-full max-w-4xl">
        <IntegrationHub />
      </div>
    </main>
  )
}

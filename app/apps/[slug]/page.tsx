import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import VastPlayer from '@/components/VastPlayer';
import Link from 'next/link';

// Read the data file
function getApps() {
  const filePath = path.join(process.cwd(), 'data', 'apps.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const apps = getApps();
  return apps.map((app: any) => ({
    slug: app.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const apps = getApps();
  const app = apps.find((a: any) => a.slug === params.slug);

  if (!app) {
    return { title: 'App Not Found' };
  }

  return {
    title: app.metaTitle,
    description: app.metaDescription,
    openGraph: {
      title: app.metaTitle,
      description: app.metaDescription,
      type: 'article',
    },
  };
}

export default function AppDetailsPage({ params }: { params: { slug: string } }) {
  const apps = getApps();
  const app = apps.find((a: any) => a.slug === params.slug);

  if (!app) {
    return <div className="p-8 text-center">App not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> &gt; 
        <span className="mx-2">Apps</span> &gt; 
        <span className="text-gray-900 font-medium">{app.title}</span>
      </nav>

      <AdUnit slotId="top-banner" format="horizontal" />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.title}</h1>
            <p className="text-sm text-blue-600 font-medium mb-4">{app.category}</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Launch App
          </button>
        </div>
        
        <div className="prose max-w-none text-gray-600 mb-8">
          <p>{app.description}</p>
          <p>
            Welcome to the ultimate {app.title.toLowerCase()}. Whether you&apos;re working on a complex project or just need a quick result, our tool is built to handle it with speed and precision. No downloads, no registration&mdash;just instant access.
          </p>
        </div>

        <VastPlayer adTagUrl="https://example.com/vast.xml" />
        
        <div className="mt-8 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How to use {app.title}</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Click the &quot;Launch App&quot; button above.</li>
            <li>Follow the on-screen prompts to input your data.</li>
            <li>Receive your instant results.</li>
          </ol>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdUnit slotId="bottom-left" format="rectangle" />
        <AdUnit slotId="bottom-right" format="rectangle" />
      </div>
    </div>
  );
}

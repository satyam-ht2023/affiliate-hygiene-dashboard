// src/app/last-run/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Header from '@/components/Header';
import PlatformWidget from '@/components/PlatformWidget';
import "./last-run.css"

type Platform = 'WEB' | 'ANDROID_WEB' | 'IOS_WEB' | 'ANDROID_AMP' | 'IOS_AMP';

interface Report {
  timestamp: string;
  results: any[];
}

const platforms: Platform[] = [
  'WEB',
  'ANDROID_WEB',
  'IOS_WEB',
  'ANDROID_AMP',
  'IOS_AMP',
];

function LastRunPage() {
  const searchParams = useSearchParams();
  const domain = (searchParams.get('domain') || 'LM').toUpperCase();

  const [reports, setReports] = useState<Record<Platform, Report | null>>({
    WEB: null,
    ANDROID_WEB: null,
    IOS_WEB: null,
    ANDROID_AMP: null,
    IOS_AMP: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateFaviconAndTheme = () => {
      const favicon = `/${domain}.ico`;
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = favicon;
      document.documentElement.setAttribute('data-theme', domain);
    };

    const fetchReports = async () => {
      setLoading(true);
      const fetches = platforms.map(async (platform) => {
        try {
          const res = await fetch(
            `https://cmsadminapi.htmedia.in/api/v1/hygiene/report/get-recent?domain=${domain}&platform=${platform}`
          );
          const json = await res.json();
          return { platform, report: json };
        } catch {
          return { platform, report: null };
        }
      });

      const results = await Promise.all(fetches);
      const reportMap: Record<Platform, Report | null> = {
        WEB: null,
        ANDROID_WEB: null,
        IOS_WEB: null,
        ANDROID_AMP: null,
        IOS_AMP: null,
      };

      results.forEach(({ platform, report }) => {
        reportMap[platform as Platform] = report;
      });

      setReports(reportMap);
      setLoading(false);
    };

    updateFaviconAndTheme();
    fetchReports();
  }, [domain]);

  return (
    <main>
      <Header domain={domain} />
      <nav className="platform-nav">
        Go To: 
        {platforms.map((platform) => (
          <a key={platform} href={`#${platform}`} className="platform-link">
            {platform.replace('_', ' ').toLowerCase().replace("amp", "AMP").replace("ios", "iOS")}
          </a>
        ))}
      </nav>
      {loading ? (
        <div className="loading">Loading results...</div>
      ) : (
        platforms.map((platform) => (
          <PlatformWidget
            key={platform}
            platform={platform}
            report={reports[platform]}
          />
        ))
      )}
    </main>
  );
}

export default function LastRunPageWrapper() {
  return (
    <Suspense fallback={<div className="loading">Loading results...</div>}>
      <LastRunPage />
    </Suspense>
  );
}

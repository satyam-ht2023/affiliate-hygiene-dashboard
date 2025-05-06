'use client';
import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Result = {
  storyURL: string;
  totalAdUnits: number;
  totalSingleCards: number;
  totalMultiProductCarousel: number;
  topWidgetCardsNotRendered: { productId: string; cardNumber: number }[];
  singleCardsNotRendered: any[];
};

type ApiResponse = {
  domain: string;
  timestamp: string;
  results: Result[];
};

function LastRunPage() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<any>(null);
  
    useEffect(() => {
      const domain = searchParams.get('domain') || 'LM';
      fetch(`http://10.136.172.151:8090/api/v1/hygiene/report/get-recent?domain=${domain}`)
        .then(res => res.json())
        .then(setData)
        .catch(async () => {
          const res = await fetch('/sample.json');
          const sampleData = await res.json();
          setData(sampleData);
        });
    }, [searchParams]);
  
    if (!data) return <div>Loading data...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Last Run Report for {data.domain}</h1>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>Story URL</th>
            <th>Total Ad Units</th>
            <th>Total Single Card</th>
            <th>Total Multi Product Carousels</th>
            <th>Number of Cards Not Rendered in Top Widget</th>
            <th>Number of Single Cards Not Rendered</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((item:any) => (
            <tr key={item.storyURL}>
              <td>
                <a href={item.storyURL} target="_blank" rel="noopener noreferrer">
                  {item.storyURL}
                </a>
              </td>
              <td>{item.totalAdUnits}</td>
              <td>{item.totalSingleCards}</td>
              <td>{item.totalMultiProductCarousel}</td>
              <td>{item.topWidgetCardsNotRendered?.length}</td>
              <td>{item.singleCardsNotRendered?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function LastRunPageWrapper() {
    return (
      <Suspense fallback={<div>Loading reports, please wait...</div>}>
        <LastRunPage />
      </Suspense>
    );
  }
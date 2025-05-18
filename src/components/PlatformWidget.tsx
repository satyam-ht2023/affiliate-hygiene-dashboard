// src/components/PlatformWidget.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/adventure_time.css';


interface Props {
    platform: string;
    report: any;
}

export default function PlatformWidget({ platform, report }: Props) {
    const [show, setShow] = useState(false);

    if (!report) return null;

    const { timestamp, results } = report;

    return (
        <div className="widget" id={platform}>
            <h2>
                <img src={`/affiliate-hygiene-dashboard/${platform}.png`} alt={`${platform} logo`} width={64} height={64} />
                <div>
                    {platform.replace('_', ' ').toLowerCase().replace("amp", "AMP").replace("ios", "iOS")}
                    <div className='date'>{new Date(timestamp).toLocaleString()}</div>
                    <div className='sessionId'>Browserstack: {results[0]?.sessionID}</div>
                </div>
            </h2>
            <div className='summary'>
                <table>
                    <thead>
                        <tr>
                            <th>Format Type</th>
                            <th>Top Widget Products not visible</th>
                            <th>Single Card not visible</th>
                            <th>Listicle Carousel Cards not visible</th>
                            <th>Tag Issues Any?</th>
                            <th>Average Reponse Time (seconds)</th>
                            <th>Story Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results
                            .filter((row: any) => row?.totalMultiProductCarousel || row?.totalSingleCards)
                            .map((row: any, idx: Number) => (
                                <tr key={"row-" + idx}>
                                    <td>{row.formatType || "Standard"}</td>
                                    <td>
                                        {row?.topWidgetCardsNotRendered?.length || "0"} Out of {row?.totalAdUnits}
                                    </td>
                                    <td>
                                        {row?.singleCardsNotRendered?.length || "0"} Out of {row?.totalSingleCards}
                                    </td>
                                    <td>
                                        {row?.multiProductCarouselFailures?.reduce(
                                            (sum: number, item: any) => sum + (item.cardsNotRendered?.length || 0),
                                            0
                                        ) ?? 0} Out of {(row?.totalAdUnits ?? 0) - (row?.totalSingleCards ?? 0)}
                                    </td>
                                    <td>
                                        {
                                            row?.topWidgetCardsTagAndCTAIssue?.length > 0 ||
                                                row?.singleCardsTagAndCTAIssue?.length > 0 ||
                                                row?.clickHereToBuyWithWrongTagsOrCTAIssue > 0 ||
                                                row?.multiProductCarouselFailures?.some(
                                                    (item: any) => Array.isArray(item.cardsTagAndCTAIssue) && item.cardsTagAndCTAIssue.length > 0
                                                )
                                                ? <span className='ErrorText'>Yes</span> : <span className='FineText'>No</span>
                                        }
                                    </td>
                                    <td>
                                        {
                                            (([...(row?.singleCardsResponseTime || []), ...(row?.multiProductCarouselsResponseTime || [])]
                                            .filter(x => typeof x?.visible === 'number')
                                            .reduce((sum, x, _, arr) => sum + x.visible / arr.length, 0))/1000).toFixed(2)
                                        }
                                    </td>
                                    <td>
                                        <a href={row?.storyURL} target='_blank'>Link</a>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <button className='rawData' onClick={() => setShow(true)}>View Raw Data</button>

            {show && (
                <div
                    className="popup-backdrop"
                    onClick={() => setShow(false)} // close on backdrop click
                >
                    <div
                        className="popup"
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside popup
                    >
                        <button className='closePopup' onClick={() => setShow(false)}>Close</button>
                        <JSONPretty data={results}></JSONPretty>
                    </div>
                </div>
            )}
        </div>
    );
}

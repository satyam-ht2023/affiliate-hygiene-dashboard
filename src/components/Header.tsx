// src/components/Header.tsx
import Image from 'next/image';

interface Props {
  domain: string;
}

export default function Header({ domain }: Props) {
  return (
    <header className="header">
      <img src={`./${domain}.ico`} alt={`${domain} logo`} width={48} height={48} />
      <h1>{domain} Affiliate Hygiene Report</h1>
    </header>
  );
}

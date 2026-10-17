import { ImageResponse } from 'next/og';
import { siteMeta } from '@/content/meta';

export const runtime = 'edge';
export const alt = `${siteMeta.name} — ${siteMeta.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#030303',
          padding: '80px',
          color: '#f5f5f3',
          fontFamily: 'sans-serif',
          border: '1px solid #1f1f1f',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 20, letterSpacing: '0.2em', color: '#8e8e93', textTransform: 'uppercase' }}>
            Portfolio & Systems Architecture
          </span>
          <span style={{ fontSize: 18, color: '#10b981', display: 'flex', alignItems: 'center' }}>
            ● Open for Roles
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {siteMeta.name}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#8e8e93',
              fontWeight: 300,
              margin: 0,
            }}
          >
            {siteMeta.role}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #1f1f1f',
            paddingTop: '32px',
            fontSize: 20,
            color: '#8e8e93',
          }}
        >
          <span>React · Next.js · Node.js · Machine Learning · AWS</span>
          <span>{siteMeta.location}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}


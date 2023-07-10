import { ImageResponse } from 'next/server';
 
export const runtime = 'edge';
 
export async function GET() {
  return new ImageResponse(
    (
      <div
        className="text-8xl text-black bg-white w-full h-full flex justify-center items-center"
      >
        🌅
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: 'twemoji',
    },
  );
}
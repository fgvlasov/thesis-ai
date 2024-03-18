import React from 'react';
import { Files, Image } from 'lucide-react';
import ImageGenerator from './ImageGenerator';

interface ThesisItemProps {
  thesis: string;
  idx: number;
  lang: string;
}

const copyTextToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    alert('Text copied to clipboard'); // You might want to replace this with a more user-friendly notification
  } catch (err) {
    console.error('Failed to copy text: ', err);
    alert('Failed to copy text'); // Consider using a more graceful error notification
  }
};

const ThesisItem: React.FC<ThesisItemProps> = ({ thesis, lang, idx }) => {
  return (
    <div className="flex mb-4 justify-between" key={idx}>
      <div className="text-lg font-bold w-8">{idx + 1}.</div>
      <div className="mr-auto">
        {thesis} - [
        <a
          className="text-blue-600 hover:text-blue-800" // Example of adding some styling
          target="_blank"
          rel="noopener noreferrer" // Added for security purposes
          href={`https://www.theseus.fi/discover?query=${thesis}`}
        >
          Check in Theseus.fi
        </a>
        ] - [
        <a
          className="text-blue-600 hover:text-blue-800" // Example of adding some styling
          target="_blank"
          rel="noopener noreferrer" // Added for security purposes
          href={`https://scholar.google.com/scholar?hl=${lang}&q=${thesis}`}
        >
          Check in Google Scholar
        </a>
        ]
      </div>
      <div className="ml-6">
        <Files
          onClick={() => copyTextToClipboard(thesis)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default ThesisItem;

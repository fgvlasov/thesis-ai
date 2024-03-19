import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FileClock, Files, ImageDown, ImageDownIcon } from 'lucide-react';
import Link from 'next/link';

interface ImageGeneratorProps {
  thesis: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ thesis }) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post('/api/generate-image', {
        prompt: thesis,
      });
      setGeneratedImage(response.data.imageUrl);
      console.log(response);
    } catch (error) {
      toast.error('Failed to generate image.');
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.png'; // This could be dynamic or based on a pattern
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="image-generator-container">
      <div onClick={generatedImage ? downloadImage : generateImage}>
        {generatedImage ? (
          <ImageDown />
        ) : isGenerating ? (
          <FileClock />
        ) : (
          <ImageDownIcon />
        )}
      </div>
      {generatedImage && (
        <Image
          src={generatedImage}
          alt="Generated"
          className="mt-2 w-32 h-20 object-cover"
        />
      )}
    </div>
  );
};

export default ImageGenerator;

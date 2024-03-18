import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface ImageGeneratorProps {
  thesis: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ thesis }) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      // Adjust with your actual API endpoint and response structure
      const response = await axios.post<{ imageUrl: string }>(
        '/api/generate-image',
        { thesis }
      );
      setGeneratedImage(response.data.imageUrl);
    } catch (error) {
      toast.error('Failed to generate image.');
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="image-generator-container">
      <Button
        onClick={generateImage}
        disabled={isGenerating}
        className="text-sm"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </Button>
      {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated"
          className="mt-2 w-32 h-20 object-cover"
        />
      )}
    </div>
  );
};

export default ImageGenerator;

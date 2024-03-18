import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Image } from 'lucide-react';

const ImageGenerator = ({ expertise, setPhotos }) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateImages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/images', expertise);
      const urls = response.data.map((image) => image.url);
      setPhotos(urls);
    } catch (error) {
      toast.error('Failed to generate images.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={generateImages}
      disabled={isLoading}
      className="your-custom-classes"
    >
      <Image alt="Generate image" />
    </Button>
  );
};

export default ImageGenerator;

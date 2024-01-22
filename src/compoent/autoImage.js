import React, { useState, useEffect } from 'react';
import { Image, View, Dimensions } from 'react-native';

const AutoHeightImage = ({ source }) => {
  const [imageHeight, setImageHeight] = useState(null);

  useEffect(() => {
    // Fetch image dimensions using Image.getSize()
    Image.getSize(source.uri, (width, height) => {
      // Calculate height based on width and aspect ratio
      const windowWidth = Dimensions.get('window').width;
      const aspectRatio = height / width;
      const calculatedHeight = windowWidth * aspectRatio;
      setImageHeight(calculatedHeight);
    });
  }, [source]);

  return (
    <View style={{ width: '100%' }}>
      {/* Render image with calculated height */}
      <Image
        source={source}
        style={{ width: '100%', height: imageHeight }}
      />
    </View>
  );
};

export default AutoHeightImage;
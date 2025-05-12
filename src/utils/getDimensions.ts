interface Dimension {
    width: number;
    height: number;
  }
  
  export function getDimensions(aspectRatio: string): Dimension {
    const ratios: { [key: string]: Dimension } = {
      
      "1:1-lg":   { width: 1024, height: 1024 },
      "1:1-md":   { width: 768,  height: 768 },
      "1:1-sm":   { width: 512,  height: 512 },
      "2:3-lg":   { width: 768,  height: 1152 },
      "2:3-md":   { width: 384,  height: 576 },
      "3:2-lg":   { width: 1152, height: 768 },
      "3:2-md":   { width: 576,  height: 384 },
      "3:5-lg":   { width: 768,  height: 1280 },
      "3:5-md":   { width: 384,  height: 640 },
      "5:3-lg":   { width: 1280, height: 768 },
      "5:3-md":   { width: 640,  height: 384 },
      "7:9-lg":   { width: 896,  height: 1152 },
      "7:9-md":   { width: 448,  height: 576 },
      "9:7-lg":   { width: 1152, height: 896 },
      "9:7-md":   { width: 576,  height: 448 },
      "6:11-lg":  { width: 768,  height: 1408 },
      "6:11-md":  { width: 384,  height: 704 },
      "11:6-lg":  { width: 1408, height: 768 },
      "11:6-md":  { width: 704,  height: 384 },
      "5:11-lg":  { width: 640,  height: 1408 },
      "5:11-md":  { width: 320,  height: 704 },
      "11:5-lg":  { width: 1408, height: 640 },
      "11:5-md":  { width: 704,  height: 320 },
      "9:5-lg":   { width: 1152, height: 640 },
     //"16:9-lg": { width: 1173, height: 640 },
      "16:9-lg": { width: 1088, height: 1920 },
    };
  
    if (ratios[aspectRatio]) {
      return ratios[aspectRatio];
    } else {
      return { width: 1024, height: 1024 };
    }
  }
  
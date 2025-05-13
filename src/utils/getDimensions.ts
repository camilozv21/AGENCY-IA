interface Dimension {
    width: number;
    height: number;
  }
// medium = md
// large = lg
// small = sm
  export function getDimensions(aspectRatio: string): Dimension {
    const ratios: { [key: string]: Dimension } = {
        "1:1-md":    { width: 1024, height: 1024 },
        "1:1-lg":    { width: 2048, height: 2048 },      
        "1:2-sm":    { width: 512, height: 1024 },
        "1:2-lg":    { width: 1440, height: 2896 },      
        "1:3-sm":    { width: 336, height: 1024 },
        "1:3-lg":    { width: 1168, height: 3536 },      
        "1:4-sm":    { width: 512, height: 2048 },
        "1:4-lg":    { width: 1024, height: 4096 },      
        "2:1-sm":    { width: 1024, height: 512 },
        "2:1-lg":    { width: 2896, height: 1440 },     
        "2:3-sm":    { width: 672, height: 1024 },
        "2:3-lg":    { width: 1664, height: 2512 },     
        "3:1-sm":    { width: 1024, height: 336 },
        "3:1-lg":    { width: 3536, height: 1168 },      
        "3:2-sm":    { width: 1024, height: 627 },
        "3:2-lg":    { width: 2512, height: 1664 },      
        "4:1-md":    { width: 2048, height: 512 },
        "4:1-lg":    { width: 4096, height: 1024 },      
        "4:5-sm":    { width: 816, height: 1024 },
        "4:5-lg":    { width: 1824, height: 2288 },      
        "5:4-sm":    { width: 1024, height: 816 },
        "5:4-lg":    { width: 2288, height: 1824 },      
        "9:16-sm":   { width: 576, height: 1024 },
        "9:16-md":   { width: 720, height: 1280 },
        "9:16-lg":   { width: 1520, height: 2720 },      
        "16:9-sm":   { width: 1024, height: 576 },
        "16:9-md":  { width: 1280, height: 720 },
        "16:9-lg":   { width: 2720, height: 1520 }
      
    };
  
    if (ratios[aspectRatio]) {
      return ratios[aspectRatio];
    } else {
      return { width: 1024, height: 1024 };
    }
  }
  
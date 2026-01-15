import { useEffect } from "react";
import { useSettingsStore } from "../store/useSettingsStore";

export const useThemeEffect = () => {
  const { bgImage, bgColor } = useSettingsStore();

  useEffect(() => {
    const body = document.body;
    
    if (bgImage) {
      
      body.style.backgroundImage = `url('${bgImage}')`;
      body.style.backgroundSize = "cover";
      body.style.backgroundPosition = "center";
      body.style.backgroundAttachment = "fixed";
      body.style.backgroundColor = "transparent"; 
    } else {
     
      body.style.backgroundImage = "none";
      body.style.backgroundColor = bgColor;
    }
    
  }, [bgImage, bgColor]);
};
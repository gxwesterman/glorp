import { useEffect, useState } from "react";

export default function Blob() {

  const [mousePosition, setMousePosition] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <svg className="fixed -right-60 -bottom-60 z-0 opacity-70 sm:size-200 lg:size-250 size-150 transition-[width,height]" width="349" height="349" viewBox="0 0 349 349" fill="none" xmlns="http://www.w3.org/2000/svg">
      {mousePosition.x}
      <g filter="url(#filter0_ii_0_1)">
        <path
          className="hover:cursor-pointer"
          d="M312.263 80.241C312.263 78.706 312.263 77.9384 312.243 77.2895C311.557 55.1943 293.806 37.4427 271.711 36.757C271.062 36.7368 270.294 36.7368 268.759 36.7368C260.572 36.7368 256.479 36.7368 253.017 36.8443C135.176 40.5016 40.5016 135.176 36.8442 253.017C36.7368 256.479 36.7368 260.572 36.7368 268.759C36.7368 270.294 36.7368 271.062 36.757 271.711C37.4427 293.806 55.1943 311.557 77.2895 312.243C77.9385 312.263 78.7059 312.263 80.241 312.263H250.324C269.038 312.263 278.396 312.263 285.819 309.324C296.563 305.07 305.07 296.563 309.324 285.819C312.263 278.396 312.263 269.038 312.263 250.324V80.241Z"
          fill="#1B9388"
        />
      </g>
      <defs>
        <filter id="filter0_ii_0_1" x="26.7368" y="26.7368" width="295.526" height="295.526" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="10" dy="10"/>
          <feGaussianBlur stdDeviation="5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 1 0 0 0 0 0.916666 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_1"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="-10" dy="-10"/>
          <feGaussianBlur stdDeviation="5"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="effect1_innerShadow_0_1" result="effect2_innerShadow_0_1"/>
        </filter>
      </defs>
    </svg>
  )
}
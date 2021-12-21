import { useEffect, useRef } from "react";

const useCanvas = (
  update,
  options = {
    onMouseMove: (context, event) => {},
    onTouchMove: (context, event) => {},
  }
) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameCount = 0;
    let animationFrameId;
    context.canvas.onmousemove = (event) => {
      options.onMouseMove(context, event);
    };
    context.canvas.ontouchmove = (event) => {
      options.onTouchMove(context, event);
    };

    const draw = () => {
      frameCount++;
      update(context, frameCount);
      animationFrameId = window.requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [update, options]);

  return canvasRef;
};

export default useCanvas;

import { useEffect, useRef } from "react"

const useCanvas = (update, options = {
    onMouseMove: (context, event) => {},
    onTouchMove: (context, event) => {}
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.canvas.onmousemove = (event) => {
            options.onMouseMove(context, event);
        }
        context.canvas.ontouchmove = (event) => {
            options.onTouchMove(context, event);
        }
        update(context);
    }, [update, options]);

    return canvasRef;
}

export default useCanvas;

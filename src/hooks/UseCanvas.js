import { useEffect, useRef } from "react"

const useCanvas = (update, options = {
    onMouseMove: (context, event) => {}
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.canvas.onmousemove = (event) => {
            options.onMouseMove(context, event);
        }
        update(context);
    }, [update, options]);

    return canvasRef;
}

export default useCanvas;

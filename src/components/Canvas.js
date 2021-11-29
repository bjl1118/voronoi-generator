import React, { useRef, useEffect, useCallback } from "react";
import { Delaunay } from 'd3-delaunay';

const Canvas = props => {
    const n = 200;
    const canvasRef = useRef(null);
    const particles = Array.from({length: n}, () => [Math.random() * props.width, Math.random() * props.height]);

    const draw = useCallback(ctx => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const delaunay = Delaunay.from(particles);
        const voronoi = delaunay.voronoi([0.5, 0.5, ctx.canvas.width, ctx.canvas.height]);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.beginPath();
        voronoi.render(ctx);
        voronoi.renderBounds(ctx);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }, [particles]);

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        draw(context)
    }, [draw]);

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas;

import React, { useRef, useEffect, useCallback } from "react";
import { Delaunay } from 'd3-delaunay';

const Canvas = props => {
    const n = 50;
    const canvasRef = useRef(null);
    const particles = Array.from({ length: n }, () => [Math.random() * props.width, Math.random() * props.height]);

    const update = useCallback(ctx => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const delaunay = Delaunay.from(particles);
        const voronoi = delaunay.voronoi([0.5, 0.5, ctx.canvas.width, ctx.canvas.height]);

        ctx.beginPath();
        voronoi.render(ctx);
        voronoi.renderBounds(ctx);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }, [particles]);

    const handleMouseMove = useCallback((context, event) => {
        particles[0] = [event.layerX, event.layerY];
        update(context);
    }, [particles, update]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.canvas.onmousemove = event => {
            handleMouseMove(context, event);
        };
        update(context)
    }, [handleMouseMove, update]);

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas;

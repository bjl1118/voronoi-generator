import React, { useCallback } from "react";
import { Delaunay } from 'd3-delaunay';
import { scaleLinear } from 'd3-scale';
import useCanvas from "../hooks/UseCanvas";

const Canvas = props => {
    const n = 200;
    const particles = Array.from({ length: n }, () => [Math.random() * props.width, Math.random() * props.height]);

    const center = useCallback(() => [props.width * 0.5, props.height * 0.5], [props.height, props.width]);

    const colors = useCallback(() => {
        const maxDistance = pythagoras(center()[0], center()[1]);
        return scaleLinear()
            .domain([0, maxDistance])
            .range(['#fff', '#d00']);
    }, [center]);

    const colorsInverted = useCallback(() => {
        const maxDistance = pythagoras(center()[0], center()[1]);
        return scaleLinear()
            .domain([0, maxDistance])
            .range(['#DEDC47', '#edec9b'])
    }, [center]);

    const distance = useCallback((x, y) => {
        const a = center()[0] - x;
        const b = center()[1] - y;
        return pythagoras(a, b);
    }, [center]);

    const pythagoras = (a, b) => Math.sqrt(a * a + b * b);

    const update = useCallback(ctx => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const delaunay = Delaunay.from(particles);
        const voronoi = delaunay.voronoi([0.5, 0.5, ctx.canvas.width, ctx.canvas.height]);

        const color = colorsInverted()(distance(particles[0][0], particles[0][1]));
        ctx.fillStyle = color;
        ctx.beginPath();
        voronoi.renderCell(0, ctx);
        ctx.fill();

        particles.forEach((p, i) => {
            if (i === 0) {
                return;
            }
            const color = colors()(distance(p[0], p[1]));
            ctx.fillStyle = color;
            ctx.beginPath();
            voronoi.renderCell(i, ctx);
            ctx.fill();
        });

        ctx.beginPath();
        voronoi.render(ctx);
        voronoi.renderBounds(ctx);
        ctx.strokeStyle = '#000';
        ctx.stroke();
    }, [colors, colorsInverted, distance, particles]);

    const handleMouseMove = useCallback((context, event) => {
        particles[0] = [event.offsetX, event.offsetY];
        update(context);
    }, [particles, update]);

    const canvasRef = useCanvas(update, { 
        onMouseMove: handleMouseMove,
        onTouchMove: handleMouseMove
    });

    return <canvas ref={canvasRef} {...props} />
}

export default Canvas;

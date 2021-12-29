import React, { useCallback } from "react";
import { Delaunay } from "d3-delaunay";
import { scaleLinear } from "d3-scale";
import useCanvas from "../hooks/UseCanvas";
import { pythagoras, distance } from "../utils/utils";

const Canvas = (props) => {
  const center = useCallback(
    () => [props.width * 0.5, props.height * 0.5],
    [props.height, props.width]
  );

  const colors = useCallback(() => {
    const maxDistance = pythagoras(center()[0], center()[1]);
    return scaleLinear()
      .domain([0, maxDistance])
      .range([props.secondColor, props.firstColor]);
  }, [center, props.firstColor, props.secondColor]);

  const update = useCallback(
    (ctx, frameCount) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const delaunay = Delaunay.from(props.particles);
      const voronoi = delaunay.voronoi([
        0.5,
        0.5,
        ctx.canvas.width,
        ctx.canvas.height,
      ]);

      ctx.fillStyle = props.accentColor;
      ctx.beginPath();
      voronoi.renderCell(0, ctx);
      ctx.fill();

      props.particles.forEach((p, i) => {
        if (i === 0) {
          return;
        }
        const next = props.animation(props.particles, i, ctx, frameCount);
        if (next) {
          props.particles[i] = next;
        }

        const color = colors()(distance(p[0], p[1], center()[0], center()[1]));
        ctx.fillStyle = color;
        ctx.beginPath();
        voronoi.renderCell(i, ctx);
        ctx.fill();
      });

      ctx.beginPath();
      voronoi.render(ctx);
      voronoi.renderBounds(ctx);
      ctx.lineWidth = props.strokeSize;
      ctx.strokeStyle = props.strokeColor;
      ctx.stroke();
    },
    [
      center,
      colors,
      props
    ]
  );

  const handleMouseMove = useCallback(
    (context, event) => {
      props.particles[0] = [event.offsetX, event.offsetY];
      update(context);
    },
    [props.particles, update]
  );

  const canvasRef = useCanvas(update, {
    onMouseMove: handleMouseMove,
    onTouchMove: handleMouseMove,
  });

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;

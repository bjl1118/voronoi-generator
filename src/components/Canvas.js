import React, { useCallback } from "react";
import { Delaunay } from "d3-delaunay";
import { scaleLinear } from "d3-scale";
import useCanvas from "../hooks/UseCanvas";
import { pythagoras, normalize, distance } from "../utils/utils";

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

  const colorsInverted = useCallback(() => {
    const maxDistance = pythagoras(center()[0], center()[1]);
    return scaleLinear().domain([0, maxDistance]).range(["#DEDC47", "#edec9b"]);
  }, [center]);

  // const distance = useCallback(
  //   (x, y) => {
  //     const a = center()[0] - x;
  //     const b = center()[1] - y;
  //     return pythagoras(a, b);
  //   },
  //   [center]
  // );

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

      const color = colorsInverted()(
        distance(props.particles[0][0], props.particles[0][1], center()[0], center()[1])
      );
      ctx.fillStyle = color;
      ctx.beginPath();
      voronoi.renderCell(0, ctx);
      ctx.fill();

      props.particles.forEach((p, i) => {
        if (i === 0) {
          return;
        }

        const vector = normalize(center(), p);
        const nextX = Math.round(p[0] + vector[0]);
        const nextY = Math.round(p[1] + vector[1]);
        props.particles[i] = [nextX, nextY];
        if (
          nextX < 0 ||
          nextY < 0 ||
          nextX > ctx.canvas.width ||
          nextY > ctx.canvas.height
        ) {
          // const widthMax = ctx.canvas.width / 2 + 5;
          // const widthMin = ctx.canvas.width / 2 - 5;
          // const heightMax = ctx.canvas.height / 2 + 5;
          // const heightMin = ctx.canvas.height / 2 - 5;
          // const newX = Math.floor(
          //   Math.random() * (widthMax - widthMin) + widthMin
          // );
          // const newY = Math.floor(
          //   Math.random() * (heightMax - heightMin) + heightMin
          // );
          // props.particles[i] = [newX, newY];
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
      colorsInverted,
      props.particles,
      props.strokeColor,
      props.strokeSize,
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

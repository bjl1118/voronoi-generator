import { normalize } from "../utils/utils";

const expand = (particles, index, ctx) => {
    if (index === 0) {
        return;
    }
    const centerPoint = [ctx.canvas.width / 2, ctx.canvas.height / 2];
    const p = particles[index];
    const vector = normalize(centerPoint, p);
    let nextX = Math.round((p[0] + vector[0]) * 100) / 100;
    let nextY = Math.round((p[1] + vector[1]) * 100) / 100;
    // if (
    //     nextX < 0 ||
    //     nextY < 0 ||
    //     nextX > ctx.canvas.width ||
    //     nextY > ctx.canvas.height
    // ) {
    //     const widthMax = ctx.canvas.width / 2 + 5;
    //     const widthMin = ctx.canvas.width / 2 - 5;
    //     const heightMax = ctx.canvas.height / 2 + 5;
    //     const heightMin = ctx.canvas.height / 2 - 5;
    //     nextX = Math.floor(
    //         Math.random() * (widthMax - widthMin) + widthMin
    //     );
    //     nextY = Math.floor(
    //         Math.random() * (heightMax - heightMin) + heightMin
    //     );
    // }
    return [nextX, nextY];
}

export default expand;
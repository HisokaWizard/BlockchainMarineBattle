import { Button, Grid, Typography } from "@mui/material";
import React, { memo, useEffect, useRef } from "react";
import {
  drawRectangle,
  drawTriangle,
  canvasHeight,
  canvasWidth,
  resetArea,
  drawSmile,
  drawPentogramma,
  drawLoader,
  differentBuzierCurves,
} from "../canvas";

export const GraphicsPage = memo(() => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasContext = useRef<CanvasRenderingContext2D>(null);

  useEffect(() => {
    if (!canvas.current.getContext) return;
    canvasContext.current = canvas.current.getContext("2d");
    resetArea(canvasContext.current);
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4">Graphic compartment</Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent={"stretch"}>
        <Button
          variant="outlined"
          onClick={() => drawRectangle(canvasContext.current)}
          size="small"
        >
          Rectangle
        </Button>
        <Button
          variant="outlined"
          onClick={() => drawTriangle(canvasContext.current)}
          size="small"
        >
          Triangle
        </Button>
        <Button
          variant="outlined"
          onClick={() => drawSmile(canvasContext.current)}
          size="small"
        >
          Smile
        </Button>
        <Button
          variant="outlined"
          onClick={() => drawPentogramma(canvasContext.current)}
          size="small"
        >
          Pentogramma
        </Button>
        <Button
          variant="outlined"
          onClick={() => drawLoader(canvasContext.current)}
          size="small"
        >
          Loader
        </Button>
        <Button
          variant="outlined"
          onClick={() => differentBuzierCurves(canvasContext.current)}
          size="small"
        >
          Buzier
        </Button>
      </Grid>
      <Grid item xs={12}>
        {/* Use 16:9 screen proportion */}
        <canvas
          style={{ border: "2px solid lightgrey", borderRadius: "5px" }}
          id="gamezone"
          width={canvasWidth}
          height={canvasHeight}
          ref={canvas}
        ></canvas>
      </Grid>
    </Grid>
  );
});

GraphicsPage.displayName = "GraphicsPage";

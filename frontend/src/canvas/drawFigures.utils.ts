import { createBox } from "@mui/system";

export const canvasWidth = 800;
export const canvasHeight = 450;

const generateRandomColor = () => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return { r, g, b };
};

export const drawRectangle = (ctx: CanvasRenderingContext2D) => {
  resetArea(ctx);
  const { r, g, b } = generateRandomColor();
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  const x1 = Math.round(Math.random() * 300);
  const x2 = x1 + Math.round(Math.random() * 300);
  const y1 = Math.round(Math.random() * 200);
  const y2 = y1 + Math.round(Math.random() * 200);
  ctx.fillRect(x1, y1, x2, y2);
};

export const resetArea = (ctx: CanvasRenderingContext2D) => {
  if (!ctx) return;
  ctx.fillStyle = `rgb(30, 30, 30)`;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

export const drawTriangle = (ctx: CanvasRenderingContext2D) => {
  resetArea(ctx);
  const { r, g, b } = generateRandomColor();
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  ctx.beginPath();
  ctx.moveTo(100, 100);
  const x1 = 100 + Math.round(Math.random() * 100);
  const y1 = 100 - Math.round(Math.random() * 100);
  ctx.lineTo(x1, y1);
  const x2 = x1;
  const y2 = y1 + Math.round(Math.random() * 200);
  ctx.lineTo(x2, y2);
  ctx.fill();
};

export const drawSmile = (ctx: CanvasRenderingContext2D) => {
  resetArea(ctx);
  const { r, g, b } = generateRandomColor();
  ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
  const startPointX = 200 + Math.round(Math.random() * 200);
  const startPointY = 100 + Math.round(Math.random() * 125);
  ctx.beginPath();
  ctx.arc(startPointX, startPointY, 50, 0, Math.PI * 2, true);
  ctx.moveTo(startPointX + 40, startPointY);
  ctx.arc(startPointX, startPointY, 40, 0, Math.PI, false);
  ctx.moveTo(startPointX - 20 + 5, startPointY - 10);
  ctx.arc(startPointX - 20, startPointY - 10, 5, 0, Math.PI * 2, true);
  ctx.moveTo(startPointX + 20 + 5, startPointY - 10);
  ctx.arc(startPointX + 20, startPointY - 10, 5, 0, Math.PI * 2, true);
  ctx.stroke();
};

export const drawPentogramma = (ctx: CanvasRenderingContext2D) => {
  resetArea(ctx);
  const { r, g, b } = generateRandomColor();
  ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
  const startPointX = 200 + Math.round(Math.random() * 200);
  const startPointY = 100 + Math.round(Math.random() * 125);
  ctx.beginPath();
  ctx.moveTo(startPointX, startPointY);
  ctx.lineTo(startPointX + 30, startPointY + 60);
  ctx.lineTo(startPointX + 60, startPointY);
  ctx.lineTo(startPointX - 10, startPointY + 40);
  ctx.lineTo(startPointX + 70, startPointY + 40);
  ctx.lineTo(startPointX, startPointY);
  ctx.stroke();
};

export const drawLoader = (ctx: CanvasRenderingContext2D) => {
  resetArea(ctx);
  const startX = ctx.canvas.width / 2;
  const startY = ctx.canvas.height / 2;
  ctx.strokeStyle = `rgb(180, 180, 200)`;
  const finalDegree = Math.PI * 2; // 360 in rad
  const step = Math.PI / 180; // 1 degree in rad
  const circalDrawer = (accumStep: number) => {
    if (accumStep >= finalDegree) return;
    setTimeout(() => {
      ctx.beginPath();
      ctx.arc(startX, startY, 150, 0, accumStep, false);
      ctx.stroke();
      circalDrawer(accumStep + step);
    }, 10);
  };
  circalDrawer(step);
};

export const differentBuzierCurves = (ctx: CanvasRenderingContext2D) => {
  resetArea(ctx);
  ctx.strokeStyle = `rgb(180, 180, 200)`;
  ctx.beginPath();
  ctx.moveTo(300, 200);
  ctx.bezierCurveTo(350, 180, 380, 160, 400, 220);
  ctx.bezierCurveTo(370, 250, 300, 300, 200, 280);
  ctx.stroke();
};

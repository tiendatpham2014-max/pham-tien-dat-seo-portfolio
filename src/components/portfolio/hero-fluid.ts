import { get } from "./dom";
import { reducedMotion } from "./state";

const vertexSource = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// A small, source-owned fluid field. No reference shader or asset is copied.
const fragmentSource = `
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
uniform float lightMode;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = uv;
  p.x *= resolution.x / resolution.y;
  float t = time * 0.11;
  vec2 cursor = pointer / resolution - 0.5;
  vec2 flow = vec2(
    noise(p * 1.10 + vec2(t, -t * 0.4)),
    noise(p * 1.25 + vec2(4.2 - t * 0.45, 1.7 + t * 0.55))
  );
  vec2 warp = vec2(
    noise(p * 2.0 + flow * 2.1 + vec2(-t * 0.6, t)),
    noise(p * 1.8 + flow.yx * 2.0 + vec2(3.1 + t, -t * 0.5))
  );
  p += (warp - 0.5) * 0.47;
  p += cursor * 0.075;

  float fold = sin(p.x * 4.6 - p.y * 2.9 + flow.x * 3.5 + t * 0.55);
  float fold2 = sin(p.x * 2.7 + p.y * 4.2 - flow.y * 3.2 - t * 0.35);
  float field = clamp(0.48 + fold * 0.27 + fold2 * 0.18 + (warp.x - 0.5) * 0.32, 0.0, 1.0);
  float sheen = pow(1.0 - abs(fold), 6.0) * 0.13;
  float edge = smoothstep(0.0, 0.42, uv.y) * smoothstep(0.0, 0.12, 1.0 - uv.y);

  vec3 darkBase = vec3(0.035, 0.058, 0.116);
  vec3 darkBlue = vec3(0.15, 0.29, 0.53);
  vec3 darkViolet = vec3(0.34, 0.25, 0.53);
  vec3 lightBase = vec3(0.91, 0.94, 0.98);
  vec3 lightBlue = vec3(0.62, 0.76, 0.98);
  vec3 lightViolet = vec3(0.78, 0.69, 0.94);
  vec3 base = mix(darkBase, lightBase, lightMode);
  vec3 blue = mix(darkBlue, lightBlue, lightMode);
  vec3 violet = mix(darkViolet, lightViolet, lightMode);
  vec3 color = mix(base, blue, smoothstep(0.10, 0.72, field) * 0.78);
  color = mix(color, violet, smoothstep(0.45, 0.95, field + fold2 * 0.12) * 0.55);
  color += sheen * mix(vec3(0.22, 0.25, 0.37), vec3(0.18, 0.17, 0.23), lightMode);
  color = mix(base, color, edge);
  gl_FragColor = vec4(color, 1.0);
}
`;

function makeShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function initHeroFluid(signal: AbortSignal) {
  const canvas = get<HTMLCanvasElement>("#hero-waves-canvas");
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, powerPreference: "low-power" });
  if (!gl) return;
  const vertex = makeShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = makeShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return;
  const program = gl.createProgram();
  if (!program) return;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  const buffer = gl.createBuffer();
  if (!buffer) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  gl.useProgram(program);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = {
    resolution: gl.getUniformLocation(program, "resolution"),
    pointer: gl.getUniformLocation(program, "pointer"),
    time: gl.getUniformLocation(program, "time"),
    lightMode: gl.getUniformLocation(program, "lightMode"),
  };
  let frame = 0;
  let visible = true;
  let pointerX = 0.5;
  let pointerY = 0.5;
  let lastDraw = 0;

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1 : 1.25);
    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (reducedMotion()) draw(0);
  };
  const draw = (seconds: number) => {
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform2f(uniforms.pointer, pointerX * canvas.width, (1 - pointerY) * canvas.height);
    gl.uniform1f(uniforms.time, seconds);
    gl.uniform1f(uniforms.lightMode, document.documentElement.dataset.theme === "light" ? 1 : 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
  const tick = (now: number) => {
    if (signal.aborted || document.hidden || !visible || reducedMotion()) { frame = 0; return; }
    if (now - lastDraw >= (window.innerWidth < 700 ? 30 : 22)) {
      draw(now / 1000);
      lastDraw = now;
    }
    frame = requestAnimationFrame(tick);
  };
  const start = () => {
    if (frame || signal.aborted || document.hidden || !visible || reducedMotion()) return;
    frame = requestAnimationFrame(tick);
  };
  const stop = () => { if (frame) cancelAnimationFrame(frame); frame = 0; };
  resize();
  draw(0);
  start();
  window.addEventListener("resize", resize, { signal });
  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX / window.innerWidth;
    pointerY = event.clientY / window.innerHeight;
  }, { passive: true, signal });
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start(), { signal });
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => {
    stop();
    draw(0);
    start();
  }, { signal });
  const themeObserver = new MutationObserver(() => { if (reducedMotion()) draw(0); });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible) start(); else stop();
  }, { threshold: 0.01 });
  observer.observe(canvas);
  signal.addEventListener("abort", () => {
    stop();
    observer.disconnect();
    themeObserver.disconnect();
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  }, { once: true });
}

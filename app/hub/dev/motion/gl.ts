"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * One full-screen-quad WebGL2 sketch, as a hook.
 *
 * Everything expensive in the top tier runs through here, so the costly
 * decisions are made once: a single triangle rather than a quad (no diagonal
 * seam, one less vertex), device pixel ratio capped at 2 because nothing past
 * that resolves on a phone, and the loop parked entirely while the canvas is
 * off screen. A gallery page with two live shaders on it is exactly where an
 * uncapped raf loop turns into a warm handset.
 *
 * Uniforms arrive through a ref rather than props so a value changing every
 * frame never re-links the program.
 */

const VERT_SRC = `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

export type UniformBag = Record<string, number>;

export interface UseGlSketchOptions {
  /** Float uniforms uploaded every frame, keyed by their GLSL name. */
  uniforms?: MutableRefObject<UniformBag>;
  /** Draw a single frame and stop. Pass the reduced-motion preference here. */
  still?: boolean;
  /** Backing-store cap. Two is already past what a handset can resolve. */
  maxDpr?: number;
}

function compile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("motion lab shader failed:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function useGlSketch(
  fragSrc: string,
  options: UseGlSketchOptions = {},
): MutableRefObject<HTMLCanvasElement | null> {
  const { uniforms, still = false, maxDpr = 2 } = options;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
    const frag = compile(gl, gl.FRAGMENT_SHADER, fragSrc);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("motion lab link failed:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const locations = new Map<string, WebGLUniformLocation | null>();
    const locate = (name: string): WebGLUniformLocation | null => {
      const hit = locations.get(name);
      if (hit !== undefined) return hit;
      const found = gl.getUniformLocation(program, name);
      locations.set(name, found);
      return found;
    };

    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    let width = 0;
    let height = 0;
    const start = performance.now();

    const render = (now: number) => {
      gl.uniform2f(locate("uRes"), width, height);
      gl.uniform1f(locate("uTime"), (now - start) / 1000);
      const bag = uniforms?.current;
      if (bag) {
        for (const [name, value] of Object.entries(bag)) {
          gl.uniform1f(locate(name), value);
        }
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width * dpr));
      const h = Math.max(1, Math.round(rect.height * dpr));
      if (w === width && h === height) return false;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      return true;
    };

    resize();

    // A still canvas still has to survive a rotation, so a resize repaints
    // the one frame rather than leaving a stretched or blank buffer.
    const observer = new ResizeObserver(() => {
      const changed = resize();
      if (changed && still) render(performance.now());
    });
    observer.observe(canvas);

    let visible = true;
    const inView = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    inView.observe(canvas);

    let raf = 0;
    if (still) {
      render(performance.now());
    } else {
      const loop = (now: number) => {
        if (visible) render(now);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      inView.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
    };
  }, [fragSrc, still, maxDpr, uniforms]);

  return canvasRef;
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const VERTEX_SOURCE = `attribute vec2 a_position;
void main(){
  gl_Position=vec4(a_position,0.0,1.0);
}`;

const FRAGMENT_SOURCE = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

mat2 rot(float a){
  float c=cos(a),s=sin(a);
  return mat2(c,-s,s,c);
}

float sdTorus(vec3 p,vec2 t){
  vec2 q=vec2(length(p.xz)-t.x,p.y);
  return length(q)-t.y;
}

float scene(vec3 p){
  float t=u_time*0.12;

  vec3 p1=p;
  p1.xy*=rot(0.8+t*0.15);
  p1.yz*=rot(0.3+sin(t*0.3)*0.1);
  float d1=sdTorus(p1,vec2(2.8,0.7));

  vec3 p2=p;
  p2.xy*=rot(-0.5+t*0.1);
  p2.xz*=rot(1.2+cos(t*0.2)*0.15);
  p2.y-=0.5;
  float d2=sdTorus(p2,vec2(3.2,0.55));

  vec3 p3=p;
  p3.xz*=rot(t*0.08);
  p3.yz*=rot(1.0+sin(t*0.25)*0.2);
  p3.y+=1.0;
  float d3=sdTorus(p3,vec2(2.5,0.5));

  return min(min(d1,d2),d3);
}

void main(){
  vec2 uv=(gl_FragCoord.xy-0.5*u_resolution)/min(u_resolution.x,u_resolution.y);

  vec3 ro=vec3(0.0,0.0,-6.0);
  vec3 rd=normalize(vec3(uv,1.8));

  float totalDist=0.0;
  float d=0.0;

  for(int i=0;i<80;i++){
    vec3 p=ro+rd*totalDist;
    d=scene(p);
    totalDist+=d;
    if(d<0.001||totalDist>25.0)break;
  }

  vec3 bg=vec3(0.05,0.05,0.07);
  vec3 col=bg;

  if(d<0.01){
    vec3 p=ro+rd*totalDist;
    vec2 e=vec2(0.001,0.0);
    vec3 n=normalize(vec3(
      scene(p+e.xyy)-scene(p-e.xyy),
      scene(p+e.yxy)-scene(p-e.yxy),
      scene(p+e.yyx)-scene(p-e.yyx)
    ));

    vec3 lightDir=normalize(vec3(0.4,0.8,-0.6));
    float diff=max(dot(n,lightDir),0.0)*0.4+0.3;
    float spec=pow(max(dot(reflect(rd,n),lightDir),0.0),16.0)*0.15;
    float rim=pow(1.0-max(dot(-rd,n),0.0),3.0)*0.3;
    float fresnel=pow(1.0-max(dot(-rd,n),0.0),5.0)*0.2;

    col=vec3(0.10,0.10,0.14)*diff;
    col+=vec3(0.20,0.20,0.25)*spec;
    col+=vec3(0.12,0.14,0.20)*rim;
    col+=vec3(0.08,0.10,0.18)*fresnel;
  }

  float fog=exp(-totalDist*0.08);
  col=mix(bg,col,fog);
  col=pow(col,vec3(0.92));

  gl_FragColor=vec4(col,1.0);
}`;

function useShader(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    function compile(gl: WebGLRenderingContext, type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SOURCE);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SOURCE);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    startRef.current = performance.now();

    const dpr = Math.min(window.devicePixelRatio, 2);

    function frame() {
      if (!canvas || !gl) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const pw = (w * dpr) | 0;
      const ph = (h * dpr) | 0;
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
      }
      gl.viewport(0, 0, pw, ph);
      gl.uniform1f(uTime, (performance.now() - startRef.current) * 0.001);
      gl.uniform2f(uRes, pw, ph);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [canvasRef]);

  useEffect(() => {
    const cleanup = init();
    return () => cleanup?.();
  }, [init]);
}

function ShaderCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useShader(ref);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full"
      style={{ display: "block" }}
    />
  );
}

function NexusLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="3"
        y="3"
        width="12"
        height="12"
        rx="3"
        stroke="var(--color-sky-500)"
        strokeWidth="1"
      />
      <rect
        x="9"
        y="9"
        width="12"
        height="12"
        rx="3"
        fill="var(--color-sky-500)"
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="grid h-screen w-full grid-cols-1 bg-white lg:grid-cols-2 dark:bg-neutral-900">
      <div className="relative hidden overflow-hidden bg-[#0a0a0f] lg:block">
        <ShaderCanvas />
        <div className="relative z-10 flex h-full flex-row items-center justify-center gap-4 px-6 text-white">
          {/* <NexusLogo className="size-20 text-sky-500" />
          <p className="text-7xl font-light tracking-tight text-shadow-black/80 text-shadow-lg">
            Nexus
          </p> */}
          <Image
            src="/assets/waypoint.png"
            alt="Waypoint Logo"
            width={200}
            height={200}
          />
        </div>
      </div>

      <div className="relative flex items-center justify-center bg-white px-6 py-10 md:px-12 dark:bg-neutral-900">
        <div className="w-full max-w-md">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Sign in
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Welcome back! Please sign in to continue.
          </p>

          <div className="mt-8 flex flex-col gap-y-8">
            <button
              type="button"
              className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-white text-sm font-medium text-neutral-700 shadow-sm ring-1 shadow-black/10 ring-black/10 transition duration-150 hover:bg-neutral-50 active:scale-98 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-none dark:ring-white/10 dark:hover:bg-neutral-700"
            >
              <IconBrandGoogle className="h-4 w-4" />
              Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                or
              </span>
              <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="hello@app.com"
                className="mt-2 h-11 w-full rounded-lg border border-transparent bg-white px-3 text-sm text-neutral-800 shadow-sm ring-1 shadow-black/10 ring-black/10 transition outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500/40 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-none dark:ring-white/10"
              />
            </div>

            <button
              type="button"
              className="h-11 w-full cursor-pointer rounded-lg bg-linear-to-b from-blue-500 to-blue-600 text-sm font-medium text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition duration-150 hover:brightness-105 active:scale-98"
            >
              Continue
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-semibold text-neutral-800 transition hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-white"
            >
              Sign up
            </a>
          </p>

          <p className="mt-10 text-center text-xs text-neutral-400 dark:text-neutral-500">
            &copy; Nexus &middot;{" "}
            <a
              href="#"
              className="transition hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              Privacy
            </a>{" "}
            &middot;{" "}
            <a
              href="#"
              className="transition hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              Terms
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

const IconBrandGoogle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
      <path
        fill="#fff"
        d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"
      />
      <path
        fill="#e33629"
        d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"
      />
      <path
        fill="#f8bd00"
        d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"
      />
      <path
        fill="#587dbd"
        d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
      />
      <path
        fill="#319f43"
        d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"
      />
    </svg>
  );
};

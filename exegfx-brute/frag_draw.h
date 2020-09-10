/* File generated with Shader Minifier 1.1.6
 * http://www.ctrl-alt-test.fr
 */
#ifndef FRAG_DRAW_H_
# define FRAG_DRAW_H_

const char *draw_frag =
 "#version 130\n"
 "#define iResolution gl_TexCoord[0]\n"
 "#define iTime gl_TexCoord[0].z\n"
 "#define pi acos(-1.)\n"
 "const float i=(1.+sqrt(5.))*.5,v=12.,m=v*3.;"
 "vec2 n(vec2 v,float y)"
 "{"
   "float z=cos(y),m=sin(y);"
   "return vec2(v.x*z-v.y*m,v.x*m+v.y*z);"
 "}"
 "float s(vec3 v,vec3 y)"
 "{"
   "return v=abs(v)-y,max(max(v.x,v.y),v.z);"
 "}"
 "float n(vec3 v,vec3 f,vec3 y)"
 "{"
   "return s(v-f,y*.5);"
 "}"
 "float s(vec3 v,vec3 m,vec3 y)"
 "{"
   "return y.xz+=2.,max(n(v,m,y),max(-(length(v.xy-vec2(0,m.y)-y.xy*.5)-y.y*.9),-(length(v.zy-vec2(0,m.y)-y.zy*.5)-y.y*.9)));"
 "}"
 "float t(vec3 v,vec3 m,vec2 y)"
 "{"
   "return v-=m,max(length(v.xz)-y.x,abs(v.y)-y.y*.5);"
 "}"
 "vec2 n(const float v)"
 "{"
   "return fract(sin(vec2(v,v+1.))*vec2(43758.5));"
 "}"
 "const int y=0,z=1,x=2;"
 "int r;"
 "float s(vec3 v)"
 "{"
   "r=0;"
   "const float m=.75,f=m+.1,d=m*2.,i=m*.5;"
   "float g=v.y+1.;"
   "v.xz=abs(v.xz);"
   "v.xz=vec2(max(v.x,v.z),min(v.x,v.z));"
   "float a=min(max(n(v,vec3(0,11.25,0),vec3(12,22.5,9)),-n(v,vec3(6,11.25,0),vec3(3,23,5))),t(v,vec3(4.5,11.25,4.5),vec2(1.5,22.5)));"
   "vec3 e=v;"
   "e.z=abs(abs(abs(e.z)-2.5)-2.5)-2.5;"
   "v.y=abs(v.y-13.)+13.;"
   "float c=min(s(v,vec3(0,15.-i,0),vec3(45,m,17)),min(s(v,vec3(0,15.-i,0),vec3(35,m,25)),s(v,vec3(0,15.-i,0),vec3(29,m,29)))),l=min(s(v,vec3(0,18.-i,0),vec3(35,m,17)),s(v,vec3(0,18.-i,0),vec3(25,m,25))),o=s(v,vec3(0,21.-i,0),vec3(25,m,17)),u=min(min(n(v,vec3(0,15.-i,0),vec3(45,f,17)),n(v,vec3(0,15.-i,0),vec3(35,f,25))),min(min(n(v,vec3(0,15.-i,0),vec3(29,f,29)),n(v,vec3(0,18.-i,0),vec3(35,f,17))),min(n(v,vec3(0,18.-i,0),vec3(25,f,25)),n(v,vec3(0,21.-i,0),vec3(25,f,17)))));"
   "vec3 p=fract(v-vec3(.5,.2,.5))-.5;"
   "float b=max(u,s(p,vec3(1,.4,.4))),R=min(n(v,vec3(0,13,0),vec3(45,4.-d,17)),min(n(v,vec3(0,13,0),vec3(35,4.-d,25)),n(v,vec3(0,13,0),vec3(29,4.-d,29)))),C=min(n(v,vec3(0,16+.5-i,0),vec3(35,3.-m,17)),n(v,vec3(0,16+.5-i,0),vec3(25,3.-m,25))),T=n(v,vec3(0,19+.5-i,0),vec3(25,3.-m,17)),F=min(c,min(l,o)),q=min(R,min(C,T));"
   "v.xz=fract(v.xz)-.5;"
   "float h=s(v,vec3(.02,100,.02));"
   "h=min(h,max(q,F-.04));"
   "float w=max(q,h)-.01,k=max(q,-h)+.01,Z=n(e,vec3(0,8,0),vec3(48,8,.5));"
   "Z=max(Z,dot(vec4(e,1),vec4(normalize(vec3(-5,8,0)),2.)));"
   "Z=min(Z,n(e,vec3(0,5,0),vec3(25,2,.5)));"
   "Z=min(Z,n(e,vec3(7.5,5,0),vec3(25,2,.5).zyx));"
   "Z=max(Z,dot(vec4(e,1),vec4(normalize(vec3(2,-3,0)),-4.)));"
   "F=max(F,-b);"
   "float Y=min(min(min(F,a),min(w,k)),min(Z,g));"
   "if(Y==k)"
     "r=z;"
   "else"
     " if(Y==w)"
       "r=x;"
     "else"
       " r=y;"
   "return Y;"
 "}"
 "vec2 f;"
 "vec3 t(vec3 v,vec3 m)"
 "{"
   "vec3 i=normalize(cross(m,vec3(0.,1.,1.))),z=cross(i,m);"
   "float y=sqrt(f.y),r=y*cos(6.2831*f.x),x=y*sin(6.2831*f.x),Z=sqrt(1.-f.y);"
   "vec3 e=vec3(r*i+x*z+Z*m);"
   "return normalize(e);"
 "}"
 "vec3 e(vec3 v,vec3 i)"
 "{"
   "const vec3 m=normalize(vec3(.7,.4,-1));"
   "const float Z=.02;"
   "float e=10000.;"
   "vec3 g=vec3(1);"
   "bool h=false;"
   "for(int c=0;c<5;++c)"
     "{"
       "f=n(f.x);"
       "float Y=0.,a;"
       "for(int b=0;b<150;++b)"
         "{"
           "a=s(v+i*Y);"
           "e=min(a,e);"
           "Y+=a;"
           "if(abs(a)<Z)"
             "break;"
         "}"
       "if(abs(a)<Z)"
         "{"
           "vec3 p=v+i*Y;"
           "vec2 d=vec2(.001,0);"
           "vec3 b=normalize(vec3(s(p+d.xyy)-s(p-d.xyy),s(p+d.yxy)-s(p-d.yxy),s(p+d.yyx)-s(p-d.yyx)));"
           "if(r==y)"
             "i=t(gl_FragCoord.xyz/iResolution.xyz,b),g*=dot(i,b)*.5;"
           "else"
             " if(r==x)"
               "{"
                 "float k=pow(1.-dot(-i,b),5.);"
                 "k*=1.-step(.99,k);"
                 "g*=k*.99+.01;"
                 "i=reflect(i,b);"
               "}"
             "else"
               " if(r==z)"
                 "{"
                   "b+=sin(p*4.).zyx*.001;"
                   "b+=sin(p*3.77).zyx*.001;"
                   "b+=sin(p*.737).zyx*.001;"
                   "float k=pow(1.-dot(-i,b),5.);"
                   "k*=1.-step(.99,k);"
                   "g*=k*.7+.3;"
                   "i=reflect(i,b);"
                 "}"
           "v=p+i*Z*1.1/dot(i,b);"
           "h=true;"
         "}"
     "}"
   "if(!h)"
     "return vec3(.8);"
   "float Y=2.5*step(.7,dot(i,m));"
   "return g*Y;"
 "}"
 "vec2 e(vec2 v)"
 "{"
   "v=fract(v);"
   "if(v.y>v.x)"
     "v=1.-v;"
   "float i=v.x,m=v.y/v.x*pi*2.;"
   "return vec2(cos(m),sin(m))*i;"
 "}"
 "void main()"
 "{"
   "vec2 v=gl_FragCoord.xy/iResolution.xy-.5;"
   "float y=iTime+(v.x+iResolution.x*v.y)*1.51269;"
   "f=n(24.4317+iTime+y);"
   "v+=(f-.5)/iResolution.xy;"
   "v.x*=iResolution.x/iResolution.y;"
   "vec3 i=vec3(4,1.5,-50.),m=normalize(vec3(v,2.35));"
   "const float z=.05,r=40.;"
   "vec2 x=e(f);"
   "i.xy+=x*z;"
   "m.xy-=x*z/r;"
   "m.yz=n(m.yz,-.28);"
   "m.xz=n(m.xz,-.25);"
   "vec4 a=vec4(e(i,m)*(1.-dot(v,v)*.75),1);"
   "if(a.x>=0.)"
     "gl_FragColor=a;"
   "else"
     " gl_FragColor=vec4(0);"
 "}";

#endif // FRAG_DRAW_H_
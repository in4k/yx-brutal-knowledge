#version 130
#define iResolution gl_TexCoord[0]
#define iTime gl_TexCoord[0].z
#define pi acos(-1.)

const float phi = (1.+sqrt(5.))*.5;
const float kNumShapes = 12.;
const float kLoopSize = kNumShapes*3.;


vec2 rotate(vec2 a, float b)
{
    float c = cos(b);
    float s = sin(b);
    return vec2(
        a.x * c - a.y * s,
        a.x * s + a.y * c
    );
}

float sdBox2( vec3 p, vec3 b )
{
    p=abs(p)-b;
    return max(max(p.x,p.y),p.z);
}

float sdBox3(vec3 p, vec3 center, vec3 size)
{
    return sdBox2(p-center,size*.5);
}

float sdScallopBox(vec3 p,vec3 center,vec3 size)
{
    size.xz+=2.;
    
    return max(
        sdBox3(p,center,size),
        max(
        	-(length(p.xy-vec2(0,center.y)-size.xy*.5)-size.y*.9),
        	-(length(p.zy-vec2(0,center.y)-size.zy*.5)-size.y*.9)
        )
    );
}

float sdCylinder(vec3 p,vec3 center,vec2 size)
{
    p-=center;
    return max(
        length(p.xz)-size.x,
        abs(p.y)-size.y*.5
    );
}

vec2 hash2( const float n ) {
	return fract(sin(vec2(n,n+1.))*vec2(43758.5453123));
}

const int matDiffuse=0;
const int matMirror=1;
const int matBlack=2;

int mat;
float scene(vec3 p)
{
    mat=0;
    //return length(p-vec3(15,15,0))-10.;
        
    
    const float K =  .75; // 1
    const float KK = K+.1;
    const float L = K*2.;
    const float J = K*.5;
    
    float ground = p.y+1.;
    
    // mirror
    p.xz=abs(p.xz);
    p.xz=vec2(max(p.x,p.z),min(p.x,p.z));

    
    float column = min(
        max(
	        sdBox3(p,vec3(0,11.25,0),vec3(12,22.5,9)),
	        -sdBox3(p,vec3(6,11.25,0),vec3(3,23,5))
	    ),
        sdCylinder(p,vec3(4.5,11.25,4.5),vec2(1.5,22.5))
	);

    vec3 sp = p;
    sp.z = abs(abs(abs(sp.z)-2.5)-2.5)-2.5;
    
    
    // vertical mirror
    p.y=abs(p.y-13.)+13.;
    
    float trim4 = min(
        sdScallopBox(p,vec3(0,15.-J,0),vec3(45,K,17)),
        min(
        	sdScallopBox(p,vec3(0,15.-J,0),vec3(35,K,25)),
        	sdScallopBox(p,vec3(0,15.-J,0),vec3(29,K,29))
        )
    );
    
    float trim5 = min(
        sdScallopBox(p,vec3(0,18.-J,0),vec3(35,K,17)),
    	sdScallopBox(p,vec3(0,18.-J,0),vec3(25,K,25))
    );
    
    float trim6 = sdScallopBox(p,vec3(0,21.-J,0),vec3(25,K,17));

    float trimProxy = min(
        min(
        	sdBox3(p,vec3(0,15.-J,0),vec3(45,KK,17)),
        	sdBox3(p,vec3(0,15.-J,0),vec3(35,KK,25))
        ),
        min(
            min(
        		sdBox3(p,vec3(0,15.-J,0),vec3(29,KK,29)),
        		sdBox3(p,vec3(0,18.-J,0),vec3(35,KK,17))
            ),
            min(
    			sdBox3(p,vec3(0,18.-J,0),vec3(25,KK,25)),
				sdBox3(p,vec3(0,21.-J,0),vec3(25,KK,17))
            )
        )
    );

    
    vec3 qp = fract(p-vec3(.5,.2,.5))-.5;
    float trimSlats = max(trimProxy, sdBox2(qp,vec3(1,.4,.4)));
    
    float mirror4 = min(
        sdBox3(p,vec3(0,13,0),vec3(45,2.+2.-L,17)),
        min(
        	sdBox3(p,vec3(0,13,0),vec3(35,2.+2.-L,25)),
        	sdBox3(p,vec3(0,13,0),vec3(29,2.+2.-L,29))
        )
    );
    
    float mirror5 = min(
        sdBox3(p,vec3(0,16+.5-J,0),vec3(35,2.+1.-K,17)),
    	sdBox3(p,vec3(0,16+.5-J,0),vec3(25,2.+1.-K,25))
    );
    
    float mirror6 = sdBox3(p,vec3(0,19+.5-J,0),vec3(25,2.+1.-K,17));
    
    float trim = min(trim4, min(trim5, trim6));
    float mirror = min(mirror4, min(mirror5, mirror6));
    
    p.xz = fract(p.xz)-.5;
    float mirrorPoles = sdBox2(p,vec3(.02,100,.02));
	mirrorPoles = min(mirrorPoles, max(mirror,trim-.04));
    
    float mirrorEdges = max(mirror,mirrorPoles)-.01;
    float mirrorPanes = max(mirror,-mirrorPoles)+.01;
    
    float support = sdBox3(sp,vec3(0,8,0), vec3(48,8,.5));
    support = max(support, dot(vec4(sp,1),vec4(normalize(vec3(-5,8,0)),2.)));
    support = min(support, sdBox3(sp,vec3(0,5,0),vec3(25,2,.5)));
    support = min(support, sdBox3(sp,vec3(7.5,5,0),vec3(25,2,.5).bgr));
    support = max(support, dot(vec4(sp,1),vec4(normalize(vec3(2,-3,0)),-4.)));
    
	trim = max(trim, -trimSlats);
    
    float best = min(min(min(trim,column), min(mirrorEdges,mirrorPanes)), min(support,ground));
    
    if (best == mirrorPanes)
		mat = matMirror;
    else if (best == mirrorEdges)
        mat = matBlack;
    else
        mat = matDiffuse;
        
    return best;
}
// ray bouncing function "borrowed" from I can't remember where
vec2 rv2;
vec3 B( vec3 i, vec3 n ) {
	vec3  uu = normalize( cross( n, vec3(0.0,1.0,1.0) ) );
	vec3  vv = cross( uu, n );
	
	float ra = sqrt(rv2.y);
	float rx = ra*cos(6.2831*rv2.x); 
	float ry = ra*sin(6.2831*rv2.x);
	float rz = sqrt( 1.0-rv2.y );
	vec3  rr = vec3( rx*uu + ry*vv + rz*n );

    return normalize( rr );
}

vec3 trace(vec3 cam, vec3 dir)
{
    const vec3 lightdir = normalize(vec3(.7,.4,-1));
    
    const float THRESHOLD = .02;
    
    float bk=10000.;
    
    vec3 accum = vec3(1);
    bool didBounce=false;
    for(int bounce=0;bounce<5;++bounce)
    {
        rv2=hash2(rv2.x);
        
        // near-clip plane, can't remember why I did this
        float t=0.;
	    float k;
        for(int i=0;i<150;++i)
        {
            k = scene(cam+dir*t);
            bk=min(k,bk);
            t += k;
            if (abs(k) < THRESHOLD)
                break;
        }

        // if we hit something
        if(abs(k)<THRESHOLD)
        {
			vec3 h = cam+dir*t;
			vec2 o = vec2(.001, 0);
			vec3 n = normalize(vec3(
				scene(h+o.xyy)-scene(h-o.xyy),
				scene(h+o.yxy)-scene(h-o.yxy),
				scene(h+o.yyx)-scene(h-o.yyx)
			));
            
            
           	//return (n*.5+.5) * (.7+.3*step(1.4,length(step(.1,fract(h.xz-.5)))));

            if (mat == matDiffuse)
            {
                // bounce the ray in a random direction
                dir = B(gl_FragCoord.xyz/iResolution.xyz,n);
                accum *= dot(dir,n)*.5;
            }
            else if (mat == matBlack)
            {
                float fresnel = pow(1.-dot(-dir,n),5.);
                fresnel*=1.-step(.99,fresnel);
                accum *= fresnel*.99+.01;
                dir = reflect(dir,n);
            }
            else if (mat == matMirror)
            {
                n += sin(h*4.).bgr*.001;
                n += sin(h*3.77).bgr*.001;
                n += sin(h*.737).bgr*.001;
                
                float fresnel = pow(1.-dot(-dir,n),5.);
                fresnel*=1.-step(.99,fresnel);
                accum *= fresnel*.7+.3;
                dir = reflect(dir,n);
            }
            
            cam = h + dir * THRESHOLD * 1.1 / dot(dir,n);

			didBounce=true;
        }
    }
    
    if(!didBounce)
        return vec3(.8);
    
    float light = 2.5*step(.7,dot(dir,lightdir));
    return accum * light;
}

vec2 ringDof(vec2 seed)
{
    seed=fract(seed);
    if (seed.y>seed.x)
        seed=1.-seed;
    float r=seed.x;
    float a=(seed.y/seed.x)*pi*2.;
    return vec2(cos(a),sin(a))*r;
}

void main()
{
    vec2 uv = gl_FragCoord.xy/iResolution.xy-.5;
    //uv.x*=-1.;

    // random function borrowed from I can't remember where
    float seed = iTime+(uv.x+iResolution.x*uv.y)*1.51269341231;
	rv2 = hash2( 24.4316544311+iTime+seed );
    
    // jitter camera for antialiasing
    uv += (rv2-.5)/iResolution.xy;
    
    // correct UVs for aspect ratio
    uv.x*=iResolution.x/iResolution.y;

    // make a camera
	vec3 cam = vec3(4,1.5,-50.);
    vec3 dir = normalize(vec3(uv,2.35));

    // jitter for dof
    const float dofScale = .05 ;
    const float dofDist = 40.;
    vec2 dofJitter = ringDof(rv2);
    cam.xy += dofJitter*dofScale;
    dir.xy -= dofJitter*dofScale/dofDist;

    dir.yz = rotate(dir.yz, -.28);
    dir.xz = rotate(dir.xz, -.25);
    
	vec4 pixel = vec4(trace(cam,dir)*(1.-dot(uv,uv)*.75),1);
	if (pixel.r >= 0.)
		gl_FragColor = pixel;
	else
		gl_FragColor = vec4(0);
}
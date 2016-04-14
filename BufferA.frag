void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float alive = 0.0;
    for (int i = -1; i <= 1; i++)
    {
        for (int j = -1; j <= 1; j++)
        {
            vec2 uv = mod((fragCoord.xy + vec2(i, j)) / iResolution.xy, 1.0);
            alive += texture2D(iChannel0, uv).r;
        }
    }
    
    vec3 cell = texture2D(iChannel0, fragCoord.xy / iResolution.xy).rgb;
    alive -= cell.r;
    
    if (cell.r > 0.0)
    {
        if (alive < 2.0) cell = vec3(0.0);
       	else if (alive > 3.0) cell = vec3(0.0);
        else cell.g -= iTimeDelta/10.0;
    }
    else
    {
        if (alive == 3.0) cell = vec3(1.0);
    }
    
    if (distance(iMouse.xy, fragCoord.xy) < 10.0) cell = vec3(1.0);
    
    fragColor = vec4(cell, 1.0);
}

---
layout: project
title: Gas Struts
description: Struts chosen and used to prop up completed Aeroshell project
technologies: [Solidworks, Mills, 3D Printing, Hand Tools]
image: /assets/images/gas-struts.jpg
category: hyperloop
---

After designing the aeroshell and knowing what size we intended it to be, we started thinking about how to mount it to the chassis. In the past it was bolted at two positions on both sides of the chassis. The issue with this is that when taking the pod to competition it is hard to work on compenents inside that need attention and to show the internal hardware. It requires the shell be completely removed, placed somewhere it won't be disturbed, then placed back afterwards.

Brainstorming with the overall mechanical  
![Force Calculation FBD]({{ "/assets/images/force-calc-fbd.jpg" | relative_url }}){: .inline-image-r style="width: 40%"}
team, we took inspiration from the gas struts that hold up the trunk door of a car and decided it ws a solution worth implementing. I began figuring out how to implement it by; first, doing load calculations on the aeroshell based on how much it weighed, where the strut would need to be mounted, and where it would contact the aeroshell.  

I determined we could use
![Gas Strut CAD]({{ "/assets/images/gas-strut-cad.jpg" | relative_url }}){: .inline-image-r style="width: 40%"}
hinges to attach to the flat "skirt" section of the aeroshell to the brackets that had been machined in semesters prior. Each gas strut would sit on top of the bracket and the other end would contact a 3D printed piece that was made to conform to the shape of the aeroshell at that point. This way, the hinge would allow a 45 degree rotation from close to open position and the gas strut would be activated once pulled outward and upward; thus, holding open the aeroshell like a car trunk door. All that would be left is a latch on the opposite side of the aeroshell to hold it down and oppose the force of the struts when it is in the closed position. 

At the very end I also ensured 
![L-Bracket Ansys]({{ "/assets/images/l-bracket-ansys.jpg" | relative_url }}){: .inline-image-r style="width: 60%"}  
the three L-bracket would be able to support the force of the gas struts and the aeroshell on them by simulating their deformation when cause by double the force the struts are exerting upwards.  

![Weight and Force Calculations]({{ "/assets/images/weight-force-calcs.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"}  
- Moment Balance
    - Fs (Spring Force) = 32 N (x3 springs)
    - Fs (Spring Force) = 8 lbf (x3 springs)  

Took these calculations and purchased gas struts capable of exerting these forces. Bought two rubber latches for the opposite side to be able to oppose 24 lb of force. 3D printed pieces that conformed to contour of aeroshell. Ensured screws went through 
![Gas Strut Apparatus]({{ "/assets/images/gas-strut-irl.jpg" | relative_url }}){: .inline-image-r style="width: 40%"}
3D printed piece normal to surface of aeroshell.
![Rubber Latch]({{ "/assets/images/rubber-latch.jpg" | relative_url }}){: .inline-image-r style="width: 38.5%"}
![Gas Strut Assembly]({{ "/assets/images/gas-strut-assembly.jpg" | relative_url }}){: .inline-image-1 style="width: 100%"}  
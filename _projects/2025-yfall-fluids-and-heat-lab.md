---
layout: project
title: Fluids & Heat Transfer Laboratory
description: Fluid dynamics class with a dissection of a fluid machine at the end
technologies: [Wind Tunnels, Pitot-static tubes, Fusion360, MATLAB, LabVIEW, Microsoft Excel, Microsoft Word]
image: /assets/images/bladedesign.jpg
category: coursework
---

<!-- Intro paragraph -->

As part of MAE 4272: Fluids & Heat Transfer Laboratory, our team was tasked with designing, modeling, and experimentally testing a small-scale wind turbine blade intended to maximize aerodynamic power output while remaining structurally and operationally safe. The project was motivated by a prior blade failure observed in the lab, requiring our design to balance aerodynamic efficiency with conservative limits on stress, rotational speed, and manufacturability. The final blade needed to operate safely across a realistic range of wind speeds while providing measurable power output in a controlled wind tunnel environment.

## Wind Turbine Blade Design Project  

**Design Process**  

Our design process was model-driven and iterative. Using airfoil performance data (NACA 4412) and a MATLAB-based analytical model, we selected blade twist and chord distributions to maintain an effective angle of attack of approximately 6–8° along the span while operating within a prescribed tip-speed ratio range. Structural and geometric constraints—including blade length, wall thickness, hub geometry, and maximum allowable stress—were enforced to prevent overspeed and bending failure. The MATLAB model was used to predict torque and power output across operating conditions, guiding key geometric decisions while maintaining conservative safety margins.

**Testing Summary**  
The final blade was evaluated experimentally in a wind tunnel using a torque brake to generate power curves at multiple fixed wind speeds. Instead of operating at a single target RPM, we swept applied torque from free rotation to stall at each wind speed, measuring rotational speed and torque to compute power output. This approach allowed us to
![3D designed magnet holder]({{ "/assets/images/powercurves.jpg" | relative_url }}){: .inline-image-r style="width: 55%"}
 capture the full operating envelope of the blade and directly compare experimental performance to model predictions. While the blade did not achieve the predicted peak power, testing revealed consistent trends in power generation and stall behavior, providing valuable insight into aerodynamic limitations and model assumptions.

**My Contribution**  

I was primarily responsible for the CAD modeling of the turbine blade, translating the NACA 4412 airfoil geometry into a manufacturable three-dimensional blade model that incorporated the prescribed twist, chord taper, and hub interface. (You can see an image of the final blade generated within our constraints at the top of the page) This required adapting the experimental airfoil shape into a usable blade geometry while maintaining aerodynamic intent and satisfying fabrication constraints. I also contributed to post-test data analysis, where I helped evaluate why the measured power output was significantly lower than predicted and analyzed how deviations between the planned and executed testing procedure affected performance. This analysis informed our final interpretation of the results and the recommendations for future design iterations.
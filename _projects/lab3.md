---
layout: project
title: Lab 3
description: 
technologies: [VS Code, GitHub, Arduino, Python, Jupyter Notebook, Redboard Arduino Nano]
image: /assets/images/lab3-solder.jpg
category: fast-robots-labs
---

<!-- Intro paragraph -->
In this lab we create a time-of-flight (ToF) sensor based on the VL53L1X. We use two Tof sensors, and the address of the sensor is hard-wired into the board so the two sensors cannot be addressed individually. The address can be changed while the device is powered (programmatically), or enable/disable the two sensors separately through their shutdown pins. [Make argument for one approach over the other and how you'll use it]. We also decide the best positioning for them on our robot to best detect future obstacles.

**Considerations:
  - Which connections should be detacheable and which should be permanent
  - Which side of the sensors the wires are mounted from
  - The placement of each sensor in the chassis and how long the wires have to be 

<div class="video-wrap">
  <video class="video" controls preload="metadata" playsinline>
    <source src="{{ '/assets/videos/lab1-demo.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

**Lab 1B**

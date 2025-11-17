---
layout: default
title: MLS
permalink: /projects/machine-shop/
---
<div class="gallery-container">
  <div class="project-gallery">
    {% assign filtered = site.projects | where: "category", "machine-shop" %}
    {% for project in filtered %}
      <div class="gallery-item">
        <a href="{{ project.url | relative_url }}">
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}" />
          <p>{{ project.title }}</p>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

# Machine Shop Projects

In my capacity as an employee and now as a manager in the Sibley School of Mechanical and Aerospace Engineering's Manufacturing Learning Studio I have seen lots of change to the types of tools and the way they are approached within the space. I have helped put together training materials for, and helped train, countless students to use both lathes and mills. I have also had the opportunity to learn how to use those tools as well as programmable lathes, vertical and horizontal band saws, belt and other sanding tools, various hand tools, and now CNC machines and CAM software.  


## MLS Work

**Studio Manager**  
![Bridgeport Mill]({{ "/assets/images/bridgeport.jpg" | relative_url }}){: .inline-image-1 style="width: 250px"}
![Older Lathe]({{ "/assets/images/old-lathe.jpg" | relative_url }}){: .inline-image-1 style="width: 315px"}

The mill and lathe are the two primary tools that we instruct students to use. Our shop has 3 levels: red, green, and blue apron (in that order). We instruct students to create a lamp by fabricating the base on the mill, and the stem on the lathe. The stem screws into the base and the students are given the top of the lamp. They will also be introduced to the belt sander at the end of the 2.5 hour training. With the red apron students are allowed
![New Lathe]({{ "/assets/images/new-lathe.jpg" | relative_url }}){: .inline-image-r style="width: 300px"}
to work using the mills, lathes, belt sander, band saws, horizontal saw,  any hand tools within the shop. The shop also recently has undergone changes all new lathes, a water jet cutter, a laser cutter, 2 benchtop CNC mills, and a 3D scanner.

After completing 100 hours of machining and work in the shop students are allowed to advance to green apron. This gains them access to the programmable lathes and Tormach bandsaw.

Finally, to obtain the blue apron students have to take the blue apron course to learn CAM through Fusion360. This means learning about feeds, speeds, tooling, types of manufacturing processes for manufacturing small and large batches of parts, and how to use all of this on the four HAAS CNC mills to fabricate a few projects.

**Technical Drawings**  
![Lamp Base]({{ "/assets/images/lamp-base.jpg" | relative_url }}){: .inline-image-1 style="width: 275px"}
![Lamp Stem]({{ "/assets/images/lamp-stem.jpg" | relative_url }}){: .inline-image-1 style="width: 282.5px"}

Re-created technical drawings for Red Apron Trainings for both the milled base and the lathed stem. Needed because of change in machining method due to new tools.

## Blue Apron Projects

**Wax Block**  
![Wax Block G-Code]({{ "/assets/images/wax-block-viewer.jpg" | relative_url }}){: .inline-image-1 style="width: 560px"}
![Wax Block]({{ "/assets/images/wax-block.jpg" | relative_url }}){: .inline-image-1 style="width: 300px"}

**Aluminum C-Block**  
![C Block CAM]({{ "/assets/images/c-block-cam.jpg" | relative_url }}){: .inline-image-1 style="width: 500px"}
![C Block Front]({{ "/assets/images/c-block-front.jpeg" | relative_url }}){: .inline-image-1 style="width: 200px"}
![C Block Back]({{ "/assets/images/c-block-back.jpeg" | relative_url }}){: .inline-image-1 style="width: 200px"}

**Final Creative Project: Domino**  
![Domino CAM]({{ "/assets/images/domino-cam.jpg" | relative_url }}){: .inline-image-1 style="width: 500px"}
![Domino Front]({{ "/assets/images/domino-front.jpg" | relative_url }}){: .inline-image-1 style="width: 200px"}
![Domino Back]({{ "/assets/images/domino-back.jpg" | relative_url }}){: .inline-image-1 style="width: 200px"}


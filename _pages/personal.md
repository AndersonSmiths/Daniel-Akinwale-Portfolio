---
layout: default
title: Personal Projects
permalink: /projects/personal/
---
<div class="gallery-container">
  <div class="project-gallery">
    {% assign filtered = site.projects | where: "category", "personal" %}
    {% for project in filtered %}
      <div class="gallery-item">
        <a href="{{ project.url | relative_url }}">
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
          <p>{{ project.title }}</p>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

# Personal Projects
<!-- Intro paragraph -->
My personal projects are simply fun things I 3D printed, designs I am doing, and ideas I am having. Some things on here are not complete, or I have not finished my vision for what they will look like in the end. A lot of them are things I printed just to have, and designs I made for myself or for others.

## Graphic Design

**MLS Crew Designs**  
![MLS Hoodie]({{ "/assets/images/mls-hoodie.jpeg" | relative_url }}){: .inline-image-1 style="width: 565px"}
![MLS Hoodie IRL Front]({{ "/assets/images/mls-hoodie-front.jpg" | relative_url }}){: .inline-image-1 style="width: 49.5%"}
![MLS Hoodie IRL Back]({{ "/assets/images/mls-hoodie-back.jpg" | relative_url }}){: .inline-image-1 style="width: 49.5%"}
![MLS T-Shirt]({{ "/assets/images/mls-tee.jpeg" | relative_url }}){: .inline-image-1 style="width: 450px"}
![Pirelli Hat]({{ "/assets/images/pirelli-hat.jpeg" | relative_url }}){: .inline-image-1 style="width: 272px"}
![MLS Hat]({{ "/assets/images/mls-hat.jpeg" | relative_url }}){: .inline-image-1 style="width: 290px"}
![MLS Logo]({{ "/assets/images/mls-logo.jpeg" | relative_url }}){: .inline-image-1 style="width: 200px"}  
These are just a couple ideas I came up with when trying to think of clothing ideas for the MLS crew. I realized we never had any, except burgundy shop aprons with "Manufacturing Learning Studio Crew" written on them, so I made a bunch of designs and was able to convince the shop supervisor to subsidize the hoodies for employees. From there, I added my own little flourish with the hood as you can see.

**Cornell FSAE Racing Polo**  
![Redbull Polo]({{ "/assets/images/redbull-polo.jpeg" | relative_url }}){: .inline-image-1 style="width: 200px"}
![FSAE Polo]({{ "/assets/images/fsae-polo.jpeg" | relative_url }}){: .inline-image-1 style="width: 565px"}  
Upon request from a Cornell FSAE member that I worked with in the MLS machine shop: I was asked to design a polo similar to the Redbull Formula 1 polo, and this is what I came up with. I don't think they used it sadly, but I'm still proud of the work I did here.


## 3D Printing

**Bose QC Ultra Earbuds Case**  
![Bose QC 3D Scan]({{ "/assets/images/bose-qc.jpg" | relative_url }}){: .inline-image-1 style="width: 200px"}  
During an internship I was lucky enough to be allowed to use a 3D scanner to get a high quality scan of my Bose Quiet Comfort Ultra Earbuds case. Unlike Airpods, other earbuds don't typically have lots of cool cases unless you make them yourself. So now I have this incredible template to work around to make whatever case I might want. I also ordered TPU filament through Cornell's Maker Club to be able to print flexible cases that can absorb impact when dropped, so they are functional as well as good-looking.

**Floating Bookshelf Dragon**  
![Complete Dragon]({{ "/assets/images/dragon.jpg" | relative_url }}){: .inline-image-1 style="width: 300px"}

![Dragon Body]({{ "/assets/images/dragon-body.jpg" | relative_url }}){: .inline-image-1 style="width: 250px"}
![Dragon Flame]({{ "/assets/images/dragon-flame.jpg" | relative_url }}){: .inline-image-1 style="width: 150px"}
![Dragon Stand]({{ "/assets/images/dragon-stand.jpg" | relative_url }}){: .inline-image-1 style="width: 150px"}
Found and adjusted the size and printing conditions for this floating dragon as a gift for a friend of mine who loves the Fourth Wing book series. As you can see, there are three pieces that, when put together, make the dragon float and "breath fire" onto the books when the stand on the opposite side of the fire from the dragon is placed in between the books. The main character has two dragons of different sizes so I printed a large black one and a smaller gold one, both with orange flames. Once all the parts were printed I applied some glue to the connections between them and used clamps to hold them together while they dried.

**Masks**  
![Anbu Mask]({{ "/assets/images/anbu.jpg" | relative_url }}){: .inline-image-1 style="width: 200px"}
![Tengu Mask]({{ "/assets/images/tengu.jpg" | relative_url }}){: .inline-image-1 style="width: 232px"}  
These masks are just a passion of mine. I like to print masks from tv shows and movies that look intriguing. I printed the Tengu mask (the one with the long nose) and realized I did not have a good way to mount it. It was actually much later in time at an internship while working with magnets that I realized this could be a solution to my problem. Speaking with some poeple there who did lots of 3D printing; I found out that you can actually create a print with a void, pause it on the beginning of the void starts to form, embed magnets, and then continue the print. Applying this to my masks, I can find small magnets, embed them in the edges of the mask, and when this is done: I would have the full mask with magnets at specific positions. Then, I can just discretely adhere magnets on the wall, making sure they are opposite the ones in the print, and I'll have masks that seemingly stick to the wall by magic!

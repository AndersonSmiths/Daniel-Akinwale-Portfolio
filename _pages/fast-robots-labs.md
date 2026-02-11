---
layout: default
title: Fast Robots Labs
permalink: /projects/coursework/fast-robots/labs/
image: /assets/images/fast-robots.jpg
---

<!-- Lab tiles - Updated by Daniel Akinwale -->
<div style="min-height: calc(100vh - 200px); margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); padding-left: 20px; padding-right: 20px;">
  <div class="mb-3">
    <a href="{{ "/projects/coursework/fast-robots/" | relative_url }}" class="back-arrow">
      <i class="bi bi-arrow-left me-2"></i>Back to Course Hub
    </a>
  </div>

  <h2 class="text-white text-center mb-5">Fast Robots Labs</h2>

  <div class="hyperloop-grid">
    {% assign filtered = site.projects | where: "category", "fast-robots-labs" %}
    {% for project in filtered %}
      <a href="{{ project.url | relative_url }}" class="hyperloop-tile">
        <div class="tile-overlay">
          <h5>{{ project.title }}</h5>
        </div>
        <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
      </a>
    {% endfor %}
  </div>
</div>

<style>
.hyperloop-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 320px));
  gap: 30px;
  justify-content: center;
  margin: 0 auto;
  padding: 0 20px 30px 20px;
  max-width: 1300px;
}

@media (max-width: 768px) {
  .hyperloop-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .hyperloop-grid {
    grid-template-columns: 1fr;
  }
}

.hyperloop-tile {
  display: block;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
}

.hyperloop-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tile-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.75));
  z-index: 1;
  transition: background 0.3s ease;
}

.tile-overlay h5 {
  color: white;
  font-size: 1.3rem;
  font-weight: 700;
  text-align: center;
  padding: 20px;
  margin: 0;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.9);
}

.hyperloop-tile:hover {
  transform: scale(1.06);
  box-shadow: 0 12px 28px rgba(255, 255, 255, 0.2);
}

.hyperloop-tile:hover img {
  transform: scale(1.1);
}

.hyperloop-tile:hover .tile-overlay {
  background: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.65));
}
</style>

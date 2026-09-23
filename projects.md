---
layout: default
title: Projects
permalink: /projects/
---
<style>
    .project-links { list-style: none; margin: -0.5rem 0 1rem; padding: 0; font-size: 0.9rem; }
    .project-links li { margin-bottom: 0.4rem; }
    .project-links a { color: var(--text); font-weight: 500; }
    .project-links span { color: var(--text-muted); }
</style>
<main>
    <h1>Projects</h1>
    {% if site.data.projects.size > 0 %}
    <div class="project-grid">
        {% for project in site.data.projects %}
        <div class="project-card">
            <h3>
                <a href="{{ project.url }}">{{ project.name }}</a>
                <span class="project-status status-{{ project.status }}">{{ project.status | capitalize }}</span>
            </h3>
            <p>{{ project.description }}</p>
            {% if project.links %}
            <ul class="project-links">
                {% for link in project.links %}
                <li><a href="{{ link.url }}">{{ link.name }}</a> <span>{{ link.blurb }}</span></li>
                {% endfor %}
            </ul>
            {% endif %}
            <div class="tags">
                {% for tag in project.tags %}
                <span class="tag">{{ tag }}</span>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
    </div>
    {% else %}
    <p style="color: var(--text-muted);">Coming soon.</p>
    {% endif %}
</main>

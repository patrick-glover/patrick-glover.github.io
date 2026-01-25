---
layout: default
title: Projects
permalink: /projects/
---
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

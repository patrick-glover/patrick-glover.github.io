---
layout: default
title: Writing
permalink: /writing/
---
<main>
    <h1>Writing</h1>
    {% if site.posts.size > 0 %}
    <ul class="post-list">
        {% for post in site.posts %}
        <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            <span class="date">{{ post.date | date: "%B %d, %Y" }}</span>
        </li>
        {% endfor %}
    </ul>
    {% else %}
    <p style="color: var(--text-muted);">Coming soon.</p>
    {% endif %}
</main>

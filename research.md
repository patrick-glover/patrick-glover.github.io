---
layout: default
title: Research
permalink: /research/
---
<main>
    <h1>Research</h1>

    <section class="research-interests">
        <h2 id="area-one">Area One</h2>
        <p>Brief description of this research area.</p>

        <h2 id="area-two">Area Two</h2>
        <p>Brief description of this research area.</p>
    </section>

    <section class="publications">
        <h2>Publications</h2>
        {% for pub in site.data.publications %}
        <div class="pub-entry">
            <span class="pub-title">{{ pub.title }}.</span>
            <span class="pub-authors">{{ pub.authors | join: ", " }}.</span>
            <span class="pub-venue">{{ pub.venue }}, {{ pub.year }}.</span>
            {% if pub.doi %}<a href="https://doi.org/{{ pub.doi }}">[DOI]</a>{% endif %}
            {% if pub.pdf != "" %}<a href="{{ pub.pdf }}">[PDF]</a>{% endif %}
            {% if pub.preprint != "" %}<a href="{{ pub.preprint }}">[Preprint]</a>{% endif %}
        </div>
        {% endfor %}
    </section>
</main>

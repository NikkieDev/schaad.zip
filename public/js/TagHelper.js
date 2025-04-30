class TagHelper
{
    constructor()
    {
        this.title = document.querySelector('.content-title');
        this.tags = Array.from(document.querySelectorAll('.tag')).map(t => ({
            element: t,
            target: document.querySelector(t.getAttribute('data-target')),
            name: t.textContent
        }));

        this.setContent = this.setContent.bind(this)
        this.tags.forEach(t => t.element.addEventListener('click', this.setContent));
    }

    findTag(element)
    {
        return this.tags.find(t => t.element == element);
    }

    getContent()
    {
        return document.querySelector('.tag-content.active');
    }

    setContent(event)
    {
        const clickedTag = this.findTag(event.target);
        const currentActive = this.getContent();

        currentActive.classList.remove('active');
        clickedTag.target.classList.add('active');
        this.setTitle(clickedTag);
    }

    setTitle(tag)
    {
        this.title.textContent = tag.name
    }
}

new TagHelper();
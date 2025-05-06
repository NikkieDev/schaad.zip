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

        this.handleClick = this.handleClick.bind(this)
        this.tags.forEach(t => t.element.addEventListener('click', this.handleClick));
    }
    
    handleClick(event)
    {
        const eventObj = {
            event: 'click',
            target: this.getTagName(event.target),
        };

        Analytics.getInstance().addEvent(eventObj);
        this.setContent(event.target);
    }

    findTag(element)
    {
        return this.tags.find(t => t.element == element);
    }

    getTagName(element)
    {
        return this.findTag(element).name;
    }

    getContent()
    {
        return document.querySelector('.tag-content.active');
    }

    setContent(clickedElement)
    {
        const clickedTag = this.findTag(clickedElement);
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
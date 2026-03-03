document.addEventListener('DOMContentLoaded', () => {
    const portfolioCards = document.querySelector('.portfolio-cards');

    if (!portfolioCards) return;

    let targetScroll = portfolioCards.scrollLeft;
    let currentScroll = portfolioCards.scrollLeft;
    let animating = false;

    const animate = () => {
        const diff = targetScroll - currentScroll;
        
        if (Math.abs(diff) < 0.1) {
            currentScroll = targetScroll;
            portfolioCards.scrollLeft = currentScroll;
            animating = false;
            return;
        }

        currentScroll += diff * 0.2;
        portfolioCards.scrollLeft = currentScroll;
        requestAnimationFrame(animate);
    };

    portfolioCards.addEventListener('wheel', (event) => {
        const maxScroll = portfolioCards.scrollWidth - portfolioCards.clientWidth;
        if (maxScroll <= 0) return;

        // Use whichever axis has more movement (supports mice and trackpads)
        const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
            ? event.deltaX
            : event.deltaY;

        if (delta === 0) return;

        const scrollingBack = delta < 0;
        const scrollingForward = delta > 0;

        const isAtStart = currentScroll <= 1;
        const isAtEnd = currentScroll >= maxScroll - 1;

        if ((scrollingBack && isAtStart) || (scrollingForward && isAtEnd)) {
            return;
        }

        event.preventDefault();

        targetScroll += delta * 0.8;
        targetScroll = Math.max(0, Math.min(maxScroll, targetScroll));

        if (!animating) {
            animating = true;
            currentScroll = portfolioCards.scrollLeft;
            requestAnimationFrame(animate);
        }
    }, { passive: false });

    portfolioCards.addEventListener('scroll', () => {
        if (!animating) {
            targetScroll = portfolioCards.scrollLeft;
            currentScroll = portfolioCards.scrollLeft;
        }
    });
});

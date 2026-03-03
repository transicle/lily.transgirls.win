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
        const isVerticalScroll = Math.abs(event.deltaY) > Math.abs(event.deltaX);
        
        if (!isVerticalScroll) return;

        const maxScroll = portfolioCards.scrollWidth - portfolioCards.clientWidth;
        
        if (maxScroll <= 0) return;

        const scrollingLeft = event.deltaY < 0;
        const scrollingRight = event.deltaY > 0;
        
        const isAtStart = currentScroll <= 1;
        const isAtEnd = currentScroll >= maxScroll - 1;

        if ((scrollingLeft && isAtStart) || (scrollingRight && isAtEnd)) {
            return;
        }

        event.preventDefault();
        
        targetScroll += event.deltaY * 0.8;
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

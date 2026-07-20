(function () {
    document.querySelectorAll('.main-nav').forEach((nav) => {
        const menu = nav.querySelector('ul');
        if (!menu) return;

        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        toggle.innerHTML = '<span></span><span></span><span></span><span class="nav-toggle-label">Menu</span>';
        nav.prepend(toggle);

        const closeMenu = () => {
            nav.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open navigation menu');
        };

        toggle.addEventListener('click', () => {
            const willOpen = !nav.classList.contains('nav-open');
            nav.classList.toggle('nav-open', willOpen);
            toggle.setAttribute('aria-expanded', String(willOpen));
            toggle.setAttribute('aria-label', willOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    });
}());

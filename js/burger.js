(() => {
    function setBurger(params) {
        const btn = document.querySelector(`.${params.btnClass}`);
        const nav = document.querySelector(`.${params.navClass}`);
        const links = nav.querySelectorAll(`.${params.linksClass}`);

        function onBtnClick() {
            btn.classList.toggle(params.activeClass);

            if (
                !nav.classList.contains(params.activeClass) &&
                !nav.classList.contains(params.hiddenClass)
            ) {
                nav.classList.add(params.activeClass);
                document.body.style.overflow = 'hidden';
                btn.setAttribute('aria-expanded', true);
            } else {
                nav.classList.add(params.hiddenClass);
                document.body.removeAttribute('style');
                btn.setAttribute('aria-expanded', false);
            }
        }

        btn.setAttribute('aria-expanded', false);

        nav.addEventListener('animationend', function () {
            if (this.classList.contains(params.hiddenClass)) {
                this.classList.remove(params.activeClass);
                this.classList.remove(params.hiddenClass);
            }
        });

        btn.addEventListener('click', window.debounce(onBtnClick, 500));

        links.forEach((link) => {
            link.addEventListener('click', window.debounce(onBtnClick, 500));
        });
    }

    setBurger({
        btnClass: 'js-burger', // класс бургера
        navClass: 'js-nav-wrap', // класс меню
        activeClass: 'is-opened', // класс открытого состояния
        hiddenClass: 'is-closed', // класс закрывающегося состояния
        linksClass: 'js-nav-link' // класс ссылки
    });
})();

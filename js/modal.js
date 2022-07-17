(() => {
    class Modal {
        constructor(options) {
            let defaultOptions = {
                isOpen: () => { },
                isClose: () => { },
                animation: 'fade',
            }
            this.options = Object.assign(defaultOptions, options);
            this.modal = document.querySelector('.modal');
            this.speed = false;
            this.animation = false;
            this.isOpen = false;
            this.modalWrapper = false;
            this.previousActiveElement = false;
            this.fixBlocks = document.querySelectorAll('.fix-block');
            this.focusElements = [
                'a[href]',
                'input',
                'button',
                'select',
                'textarea',
                '[tabindex]'
            ];
            this.events();
        }

        events() {
            if (this.modal) {
                document.addEventListener('click', function (e) {
                    const clickedElement = e.target.closest('[data-path]');
                    if (clickedElement) {
                        let target = clickedElement.dataset.path;
                        let animation = clickedElement.dataset.animation;
                        let speed = clickedElement.dataset.speed;
                        this.animation = animation ? animation : 'fade';
                        this.speed = speed ? parseInt(speed) : 300;
                        this.modalWrapper = document.querySelector(`[data-target="${target}"]`);
                        this.open();
                        return;
                    }

                    if (e.target.closest('.modal__close')) {
                        this.close();
                        return;
                    }
                }.bind(this));

                window.addEventListener('keydown', function (e) {
                    if (e.keyCode == 27) {
                        if (this.isOpen) {
                            this.close();
                        }
                    }

                    if (e.keyCode == 9 && this.isOpen) {
                        this.focusCatch(e);
                        return;
                    }

                }.bind(this));

                this.modal.addEventListener('click', function (e) {
                    if (!e.target.classList.contains('modal__wrapper') && !e.target.closest('.modal__wrapper') && this.isOpen) {
                        this.close();
                    }
                }.bind(this));
            }
        }

        open(selector) {
            // открыть окно
            // сайт не скролится
            // нет прыжка
            // фокус внутри окна
            // выделение первого элемента
            // анимация
            this.previousActiveElement = document.activeElement;

            this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
            this.modal.classList.add('is-open');
            this.disableScroll();

            this.modalWrapper.classList.add('modal-open');
            this.modalWrapper.classList.add(this.animation);

            setTimeout(() => {
                this.modalWrapper.classList.add('animate-open');
                this.options.isOpen(this);
                this.isOpen = true;
                this.focusTrap();
            }, this.speed);
        }

        close() {
            if (this.modalWrapper) {
                this.modalWrapper.classList.remove('animate-open');
                this.modalWrapper.classList.remove(this.animate);
                this.modal.classList.remove('is-open');
                this.modalWrapper.classList.remove('modal-open');

                this.enableScroll();
                this.options.isClose(this);
                this.isOpen = false;
                this.focusTrap();
            }
        }

        focusCatch(e) {
            const focusable = this.modalWrapper.querySelectorAll(this.focusElements);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);

            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }

            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }

        focusTrap() {
            const focusable = this.modalWrapper.querySelectorAll(this.focusElements);
            if (this.isOpen) {
                if (focusable) focusable[1].focus();
            } else {
                this.previousActiveElement.focus();
            }
        }

        disableScroll() {
            let pagePosition = window.scrollY;
            this.lockPadding();
            document.body.classList.add('disable-scroll');
            document.body.dataset.position = pagePosition;
            document.body.style.top = -pagePosition + 'px';
        }

        enableScroll() {
            let pagePosition = parseInt(document.body.dataset.position, 10);
            this.unlockPadding();
            document.body.style.top = 'auto';
            document.body.classList.remove('disable-scroll');
            window.scroll({ top: pagePosition, left: 0 });
            document.body.removeAttribute('data-position');
        }

        lockPadding() {
            let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
            this.fixBlocks.forEach((el) => {
                el.style.paddingRight = paddingOffset;
            });
            document.body.style.paddingRight = paddingOffset;
        }

        unlockPadding() {
            this.fixBlocks.forEach((el) => {
                el.style.paddingRight = '0px';
            });
            document.body.style.paddingRight = '0px';
        }
    }

    const modal = new Modal({
        isOpen: () => {
            console.log(modal);
            console.log('opened');
        },
        isClose: () => {
            console.log('closed');
        }
    });
})();

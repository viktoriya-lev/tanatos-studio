(() => {
    let readMoreBtn = document.querySelectorAll('.works__btn-more');
    let readLessBtn = document.querySelectorAll('.works__btn-less');

    for (i = 0; i < readMoreBtn.length; i++) {
        readMoreBtn[i].addEventListener('click', showContentFunction);
        function showContentFunction() {
            showContent(this);
        }
    }

    let showContent = (elem) => {
        dadElement = elem.parentElement;
        contentHeight = dadElement.querySelector('.works__list-wrapper');
        contentInner = dadElement.querySelector('.works__list');
        contentInnerHeight = contentInner.offsetHeight;

        contentHeight.style.height = `${contentInnerHeight}px`;
        elem.classList.add('inactive');
        elem.classList.remove('active');
        elem.nextElementSibling.classList.add('active');
    }


    for (i = 0; i < readLessBtn.length; i++) {

        readLessBtn[i].addEventListener('click', hideContentFunction);

        function hideContentFunction() {
            hideContent(this);
        }
    }

    let hideContent = (elem) => {
        dadElement = elem.parentElement;
        contentHeight = dadElement.querySelector('.works__list-wrapper');
        contentInner = dadElement.querySelector('.works__list');
        contentInnerHeight = contentInner.offsetHeight;

        contentHeight.style.height = `755px`;
        elem.previousElementSibling.classList.add('active');
        elem.classList.remove('active');
        elem.classList.add('inactive');
    }
})();

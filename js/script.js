document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.site-nav a');
    var sections = Array.prototype.map.call(navLinks, function (link) {
        var id = link.getAttribute('href');
        return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    });

    function setActive() {
        var pos = window.scrollY + 120;
        var activeIdx = -1;
        for (var i = 0; i < sections.length; i++) {
            var s = sections[i];
            if (s && s.offsetTop <= pos) activeIdx = i;
        }
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        if (activeIdx >= 0) navLinks[activeIdx].classList.add('active');
    }

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
});

const slides = document.querySelectorAll(".slide");

const fadeIns = [
  {
    keyframes: [
      {opacity: 0},
      {opacity: 1}
    ],
    options: {
      duration: 1000,
      iterations: 1
    }
  },
  {
    keyframes: [
      {
        opacity: 0,
        transform: "translateX(-100%) translateY(0)"
      },
      {
        opacity: .25,
        transform: "translateX(-50%) translateY(-25%)"
      },
      {
        opacity: .5,
        transform: "translateX(-30%) translateY(0)"
      },
      {
        opacity: .75,
        transform: "translateX(-15%) translateY(25%)"
      },
      {
        opacity: 1,
        transform: "translateX(0) translateY(0)"
      }
    ],
    options: {
      duration: 1000,
      iterations: 1,
      easing: "ease-in-out"
    }
  },
  {
    keyframes: [
      {
        opacity: 0,
        transform: "rotate(360deg) translate3D(100%, 0, 0)"
      },
      {
        opacity: 1,
        transform: "rotate(0deg) translate3D(0, 0, 0)"
      }
    ],
    options: {
      duration: 1000,
      iterations: 1,
      easing: "ease-in-out"
    }
  }
];

const fadeOuts = [
  {
    keyframes: [
      {opacity: 1},
      {opacity: 0}
    ],
    options: {
      duration: 1000,
      iterations: 1
    }
  },
  {
    keyframes: [
      {
        opacity: 1,
        transform: "translateX(0) translateY(0)"
      },
      {
        opacity: .75,
        transform: "translateX(15%) translateY(-25%)"
      },
      {
        opacity: .5,
        transform: "translateX(30%) translateY(0)"
      },
      {
        opacity: .25,
        transform: "translateX(50%) translateY(25%)"
      },
      {
        opacity: 0,
        transform: "translateX(100%) translateY(0)"
      }
    ],
    options: {
      duration: 1000,
      iterations: 1,
      easing: "ease-in-out"
    }
  },
  {
    keyframes: [
      {
        opacity: 1,
        transform: "rotate(0deg) translate3D(0, 0, 0)"
      },
      {
        opacity: 0,
        transform: "rotate(360deg) translate3D(100%, 0, 0)"
      }
    ],
    options: {
      duration: 1000,
      iterations: 1,
      easing: "ease-in-out"
    }
  }
];

const firstAnimation = fadeIns[0];

const currentAnimations = {
  oldElement: {},
  nextElement: {}
};

slides.forEach((el, idx) => {
  el.addEventListener("click", nextSlide(el, slides[(idx + 1) % slides.length]));
});
slides[0].classList.add("active");
animate(slides[0], firstAnimation, "nextElement");

function nextSlide(oldElement, nextElement) {
  return () => {
    currentAnimations.oldElement.finish && currentAnimations.oldElement.finish();
    currentAnimations.nextElement.finish && currentAnimations.nextElement.finish();

    const fo = Math.floor(Math.random() * fadeOuts.length);
    const fi = Math.floor(Math.random() * fadeIns.length);
    console.log("fadeout", fo, "fadein", fi);
    const fadeOutEffect = fadeOuts[fo];
    const fadeInEffect = fadeIns[fi];

    nextElement.classList.add("active");

    animate(oldElement, {
      ...fadeOutEffect,
      end: element => element.classList.remove("active")
    }, "oldElement");
    animate(nextElement, fadeInEffect, "nextElement");
  };
}

function animate(element, effect, saveTo) {
  const animation = element.animate(effect.keyframes, effect.options);
  if (effect.end) {
    animation.onfinish = () => effect.end(element);
  }
  currentAnimations[saveTo] = animation;
}

const $text = document.getElementById("text");

const leftText = "Web";
const rightText = "Animations";

const leftElements = createElements($text, leftText);
const rightElements = createElements($text, rightText);

const lefts = {
  elements: leftElements,
  width: leftElements.reduce((w, e) => e.width + w, 0)
};

const rights = {
  elements: rightElements,
  width: rightElements.reduce((w, e) => e.width + w, 0)
};

const ANIMATION_LENGTH = 500;

lefts.elements.forEach((element, idx) => {
  if (idx > 0) {
    element.$span.animate([
        {
          transformOrigin: "center",
          transform: "translate3D(0, 0, 0) rotate(90deg)",

        },
        {
          transformOrigin: `center ${element.height - (element.height / 3)}px`,
          transform: `translate3D(${element.left - lefts.width}px, 0, 0) rotate(0deg)`,
        }
      ],
      {
        duration: ANIMATION_LENGTH,
        iterations: 1,
        fill: "forwards"
      });
  } else {
    element.$span.animate([
      {
        transformOrigin: "center",
        transform: "translate3D(0, 0, 0)",
      },
      {
        transformOrigin: "center",
        transform: `translate3D(${element.left - lefts.width}px, 0, 0)`,
      }
    ], {
      duration: ANIMATION_LENGTH,
      iterations: 1,
      fill: "forwards"
    });
  }
});

rights.elements.forEach((element, idx) => {
  if (0 < idx && idx < rights.elements.length - 1) {
    element.$span.animate([
        {
          transformOrigin: `center`,
          transform: "translate3D(0, 0, 0) rotate(270deg)",
        },
        {
          transformOrigin: `center ${element.height - (element.height / 3)}px`,
          transform: `translate3D(${element.left}px, 0, 0) rotate(360deg)`,
        }
      ],
      {
        duration: ANIMATION_LENGTH,
        iterations: 1,
        fill: "forwards"
      });
  } else {
    element.$span.animate([
      {
        transformOrigin: "center",
        transform: "translate3D(0, 0, 0)",
      },
      {
        transformOrigin: "center",
        transform: `translate3D(${element.left}px, 0, 0)`,
      }
    ], {
      duration: ANIMATION_LENGTH,
      iterations: 1,
      fill: "forwards"
    });
  }
});

function createElements($outerWrap, text) {
  const $wrapper = document.createElement("span");
  $outerWrap.append($wrapper);
  return splitIntoElements($wrapper, text);
}

function splitIntoElements($wrapper, text) {
  const letters = text.split("");
  const $firstSpan = toSpan(letters[0], 0);
  $wrapper.append($firstSpan);
  $firstSpan.style.position = "absolute";
  const firstElement = {
    left: 0,
    height: $firstSpan.offsetHeight,
    width: $firstSpan.offsetWidth,
    $span: $firstSpan
  };
  return letters.slice(1).reduce(
    (acc, letter, idx) => {
      const lastElement = acc[acc.length - 1];
      const $span = toSpan(letter, idx + 1);
      $span.style.position = "absolute";
      $wrapper.append($span);
      return [
        ...acc,
        {
          left: lastElement.left + lastElement.width,
          width: $span.offsetWidth,
          height: $span.offsetHeight,
          $span: $span
        }
      ];
    },
    [firstElement]
  );
}

function toSpan(letter, index) {
  const $elem = document.createElement("span");
  $elem.className = `letter${index ? ` letter-${index}` : ""}`;
  $elem.innerHTML = letter;
  return $elem;
}

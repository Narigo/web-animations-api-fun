export function createAnimation($text, leftText, rightText) {
  const leftElements = createElements($text, leftText, 1);
  const rightElements = createElements($text, rightText, -1);

  const lefts = {
    elements: leftElements,
    width: leftElements.reduce((w, e) => e.width + w, 0)
  };

  const rights = {
    elements: rightElements,
    width: rightElements.reduce((w, e) => e.width + w, 0)
  };

  return {
    start(animationLength) {
      return new Promise(resolve => {
        let animationsCounter = lefts.elements.length + rights.elements.length;
        const animations = [];
        const done = (animation) => {
          animations.push(animation);
          animationsCounter--;
          if (animationsCounter <= 0) {
            resolve(animations);
          }
        };

        lefts.elements.forEach((element, idx) => {
          let animation = null;
          if (0 < idx && idx < lefts.elements.length - 1) {
            animation = element.$span.animate([
                {
                  transformOrigin: "center",
                  transform: `translate3D(0, 0, 0) rotate(${Math.round(element.percentage * 90)}deg)`,
                },
                {
                  transformOrigin: `center ${element.height - (element.height / 3)}px`,
                  transform: `translate3D(${element.left - lefts.width - 10}px, 0, 0) rotate(0deg)`,
                }
              ],
              {
                duration: animationLength,
                iterations: 1,
                easing: "ease-out",
                fill: "forwards"
              });
          } else {
            animation = element.$span.animate([
              {
                transformOrigin: "center",
                transform: `translate3D(-${element.width}px, 0, 0)`,
              },
              {
                transformOrigin: "center",
                transform: `translate3D(${element.left - lefts.width - 10}px, 0, 0)`,
              }
            ], {
              duration: animationLength,
              iterations: 1,
              easing: "ease-out",
              fill: "forwards"
            });
          }
          animation.onfinish = () => done(animation);
        });

        rights.elements.forEach((element, idx) => {
          let animation = null;
          if (0 < idx && idx < rights.elements.length - 1) {
            animation = element.$span.animate([
                {
                  transformOrigin: `center`,
                  transform: `translate3D(0, 0, 0) rotate(${-Math.round((1 - element.percentage) * 90)}deg)`,
                },
                {
                  transformOrigin: `center ${element.height - (element.height / 3)}px`,
                  transform: `translate3D(${element.left}px, 0, 0) rotate(0deg)`,
                }
              ],
              {
                duration: animationLength,
                iterations: 1,
                easing: "ease-out",
                fill: "forwards"
              });
          } else {
            animation = element.$span.animate([
              {
                transformOrigin: "center",
                transform: "translate3D(0, 0, 0)",
              },
              {
                transformOrigin: "center",
                transform: `translate3D(${element.left}px, 0, 0)`,
              }
            ], {
              duration: animationLength,
              iterations: 1,
              easing: "ease-out",
              fill: "forwards"
            });
          }
          animation.onfinish = () => done(animation);
        });
      });
    }
  };
}

function createElements($outerWrap, text, x) {
  const $wrapper = document.createElement("span");
  $outerWrap.append($wrapper);
  return splitIntoElements($wrapper, text, x);
}

function splitIntoElements($wrapper, text, x) {
  const letters = text.split("");
  const $firstSpan = toSpan(letters[0], 0);
  $wrapper.append($firstSpan);
  $firstSpan.style.position = "absolute";
  $firstSpan.style.backgroundColor = "#fff";
  $firstSpan.style.zIndex = letters.length * 2 + 1;
  const firstElement = {
    left: 0,
    height: $firstSpan.offsetHeight,
    percentage: 0,
    width: $firstSpan.offsetWidth,
    $span: $firstSpan
  };
  return letters.slice(1).reduce(
    (acc, letter, idx) => {
      const lastElement = acc[acc.length - 1];
      const $span = toSpan(letter, idx + 1);
      $span.style.position = "absolute";
      $span.style.backgroundColor = "#fff";
      $span.style.zIndex = (idx < letters.length - 2 ? (letters.length - idx * x) : letters.length * 2);
      $wrapper.append($span);
      return [
        ...acc,
        {
          left: lastElement.left + lastElement.width,
          width: $span.offsetWidth,
          height: $span.offsetHeight,
          percentage: idx / letters.length,
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
  $elem.innerHTML = `${letter}`.replace(/ /, "&nbsp;");
  return $elem;
}

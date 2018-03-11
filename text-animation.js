const $text = document.getElementById("text");

const leftText = "Some";
const rightText = "Text";

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


function createElements($outerWrap, text) {
  const $wrapper = document.createElement("span");
  $outerWrap.append($wrapper);
  return splitIntoElements($wrapper, text);
}

function splitIntoElements($wrapper, text) {
  const letters = text.split("");
  const $firstSpan = toSpan(letters[0], 0);
  $wrapper.append($firstSpan);
  const firstElement = {
    left: 0,
    width: $firstSpan.offsetWidth,
    $span: $firstSpan
  };
  return letters.slice(1).reduce(
    (acc, letter, idx) => {
      const lastElement = acc[acc.length - 1];
      const $span = toSpan(letter, idx + 1);
      $wrapper.append($span);
      return [
        ...acc,
        {
          left: lastElement.left + lastElement.width,
          width: $span.offsetWidth,
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

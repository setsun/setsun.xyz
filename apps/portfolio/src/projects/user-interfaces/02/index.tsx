const RANGE = [...Array(12).keys()];

// 2. Scroll-Driven Animations: https://developer.chrome.com/articles/scroll-driven-animations/
// Adaption from https://scroll-driven-animations.style/demos/cover-flow/css/
// Other interesting demos: https://scroll-driven-animations.style/
const UserInterface = () => {
  return (
    <ul className="cards">
      {RANGE.map((_, index) => (
        <li key={index}>
          <img src="https://placekitten.com/512/512" alt="kitten" />
        </li>
      ))}
    </ul>
  );
};

export default UserInterface;

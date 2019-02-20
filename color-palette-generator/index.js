// Write your app here! (HINT: First thing should be a call to ReactDOM.render()... )
const NUMBER_OF_COLORS = 6;

const App = props => (
  <div>
    <div className="text-center bg-dark fixed-top">
      <button onClick={props.onPressReset} className="btn btn-secondary m-1">
        RANDOMIZE YOUR COLORS BRO
      </button>
    </div>
    <div className="w-100 d-flex" style={{ height: "100vh" }}>
      {props.children.map((color, i) => (
        <BlockClass key={i} color={color} />
      ))}
    </div>
  </div>
);

const Block = props => (
  <div
    style={{ backgroundColor: props.color }}
    className="w-100 d-flex flex-column align-items-center justify-content-center"
  >
    <h1>{props.color}</h1>
    <button
      onClick={props.onPress}
      className={props.locked ? "btn btn-dark" : "btn btn-outline-dark"}
    >
      {props.locked ? "unlock" : "lock"}
    </button>
  </div>
);

class BlockClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { localColor: props.color, locked: false };
  }

  // lol
  componentWillReceiveProps(nextProps) {
    if (!this.state.locked) {
      this.setState({ localColor: nextProps.color });
    }
  }

  render() {
    return (
      <Block
        color={this.state.localColor}
        onPress={() => this.setState({ locked: !this.state.locked })}
        locked={this.state.locked}
      />
    );
  }
}

class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: this.generateRandomColors(NUMBER_OF_COLORS)
    };
  }

  generateRandomColors(numberOfColors) {
    return Array.apply(null, Array(numberOfColors)).map(
      () => "#" + Math.floor(Math.random() * 16777215).toString(16)
    );
  }

  render() {
    return (
      <App
        onPressReset={() =>
          this.setState({ colors: this.generateRandomColors(NUMBER_OF_COLORS) })
        }
      >
        {this.state.colors}
      </App>
    );
  }
}

ReactDOM.render(<AppClass />, document.getElementById("root"));

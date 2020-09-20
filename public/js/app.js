class ButtonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
    };
    this.handleButtonChangeColor = this.handleButtonChangeColor.bind(this);
  }
//load in default data
  componentDidMount() {
    this.setState({ buttons: Seed.buttons });
  }

  handleButtonChangeColor(buttonId) {
    const nextButtons = this.state.buttons.map((button) => {
      if (button.id === buttonId) {
        let newColor;
        if(button.color == 'red') {
          newColor = 'blue';
        } else {
          newColor = 'red';
        }
        return Object.assign({}, button, {
          color: newColor,
        });
      } else {
        return button;
      }
    });
    this.setState({
      buttons: nextButtons,
    });
  }

  render() {
    const buttons = this.state.buttons;
    const buttonComponents = buttons.map((button) => (
      <Button
        key={'button-' + button.id}
        id={button.id}
        title={button.title}
        url={button.url}
        color={button.color}
        onChangeColor={this.handleButtonChangeColor}
      />
    ));
    return (
      <div className='buttons'>
        {buttonComponents}
      </div>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  handleChangeColor() {
    this.props.onChangeColor(this.props.id);
  }

  render() {
    return (
      <div className='btn-wrapper'>
        <a className={'btn ' + this.props.color} href={this.props.url}>
          {this.props.title}
        </a>
        <div className='btn-controls'>
          <div className='btn-wrapper'>
            <a onClick={this.handleChangeColor} className='btn' href='#'> change color </a>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ButtonList />,
  document.getElementById('content')
);

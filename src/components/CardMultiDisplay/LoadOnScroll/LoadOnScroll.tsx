import React from 'react';

import './LoadOnScroll.scss';

interface LoadOnScrollProps {
  onLoad: () => void,
}

export default class LoadOnScroll extends React.PureComponent<LoadOnScrollProps> {
  ref: any;

  constructor(props: LoadOnScrollProps) {
    super(props);

    this.ref = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const rect = this.ref.current.getBoundingClientRect();
    const height = window.innerHeight;

    if (rect.top < (height - (rect.height / 2))) {
      this.props.onLoad();
    }
  };

  render() {
    const {
      ref,
    } = this;
    return (
      <div className={'load-on-scroll'} ref={ref}><p>Scroll to load more</p></div>
    );
  }
}
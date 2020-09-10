declare module 'react-block-ui' {

  import { Component, HTMLProps } from 'react';

  interface Props extends HTMLProps<any> {
    tag?: string
    blocking?: boolean
    loader: Component<any>
  }

  export default class BlockUI extends Component<Props> { }
}
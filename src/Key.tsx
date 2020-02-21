import React from "react";
import {Note} from "./slices/keyboard.slice";
import onClickOutside from "react-onclickoutside";

export interface KeyProps {
  note: Note
  noteOn: () => void
  noteOff: () => void
}

// const ClickOutsideButtonNominal: React.FC<{ onClickOutside: () => void } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> & {
//   onClickOutside?: () => void
// } = (props) => {
//   const {children, onClickOutside, ...rest} = props
//   ClickOutsideButtonNominal.onClickOutside = onClickOutside
//   return <button {...rest}>{children}</button>
// }
//
// export const ClickOutsideButton = onClickOutside(ClickOutsideButtonNominal, {
//   handleClickOutside: () => ClickOutsideButtonNominal.onClickOutside
// })

interface OnClickOutsideProps {
  onClickOutside: () => void;
}

export class XOutsideClickHandler extends React.Component<OnClickOutsideProps>{
  public handleClickOutside = () => this.props.onClickOutside();
  public render = () => this.props.children;
}

export const OutsideClickHandler: React.ComponentClass<OnClickOutsideProps> = onClickOutside(XOutsideClickHandler);


export const Key: React.FC<KeyProps> = ({ note, noteOn, noteOff }) => {
  // Key.handleClickOutside = noteOff
  return (
    <li>
      <OutsideClickHandler onClickOutside={noteOff}>
        <button onMouseDown={noteOn} onMouseUp={noteOff}>{note.frequency}</button>
      </OutsideClickHandler>
    </li>
  )
}

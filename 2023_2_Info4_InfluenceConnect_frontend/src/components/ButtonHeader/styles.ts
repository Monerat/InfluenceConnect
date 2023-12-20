import styled from 'styled-components';
import { Dark } from '../../GlobalStyle';

export const StyledButton = styled.button<{ $fontSizeButton: string, $darkMode: boolean }>`
  font-size: ${props => props.$fontSizeButton};
  color: ${props => props.$darkMode ? '#E94C50' : Dark };
  display: inline-block;
  outline: 0;
  border: 0;
  cursor: pointer;
  will-change: box-shadow, transform;
  background: ${props => props.$darkMode ? 'radial-gradient(100% 100% at 100% 0%, #E9A64C 0%, #E94C50 100%)' : 'radial-gradient(100% 100% at 100% 0%, #5468FF 0%, #33409B 100%)' };
  box-shadow: 0px 0.01em 0.01em rgb(45 35 66 / 40%),
    0px 0.3em 0.7em -0.01em rgb(45 35 66 / 30%),
    inset 0px -0.01em 0px rgb(58 65 111 / 50%);
  padding: 0 0.8em;
  border-radius: 0.3em;
  height: 2.6em;
  text-shadow: 0 1px 0 rgb(0 0 0 / 40%);
  transition: box-shadow 0.15s ease, transform 0.15s ease;

  &:hover {
    box-shadow: 0px 0.1em 0.2em rgb(45 35 66 / 40%),
      0px 0.4em 0.7em -0.1em rgb(45 35 66 / 30%),
      inset 0px -0.1em 0px #E94C50;
    transform: translateY(-0.1em);
  }

  &:active {
    box-shadow: inset 0px 0.1em 0.6em #E94C50;
    transform: translateY(0em);
  }
  &:focus{
    background: ${props => props.$darkMode ? 'radial-gradient(100% 100% at 100% 0%, #E94C50 0%, #E9A64C 100%)' : 'radial-gradient(100% 100% at 100% 0%, #33409B 0%, #5468FF 100%)' }
  }
`;

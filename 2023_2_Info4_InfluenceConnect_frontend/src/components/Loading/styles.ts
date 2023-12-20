import styled from 'styled-components'
import { Dark, Light } from '../../GlobalStyle'

export const SpinnerContainer = styled.div<{ $darkMode: boolean }>`

    background: ${props => props.$darkMode ? Dark : Light };
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;

    p {

        font-size: 3.5rem;
        text-transform: capitalize;
    }

    .spinnerContainer {

        width: 30%;
        height: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .spinner {

        animation: tri-spinner 1s infinite linear;
        width: 56px;
        height: 56px;
        display: grid;
        border: 4px solid #0000;
        border-radius: 50%;
        border-right-color: #299fff;
    }

    .spinner::before,
    .spinner::after {

        animation: tri-spinner 2s infinite;
        content: "";
        grid-area: 1/1;
        margin: 2px;
        border: inherit;
        border-radius: 50%;
    }

    .spinner::after {

        animation-duration: 3s;
        margin: 8px;
    }

    .loader {

        color: ${props => props.$darkMode ? Light : Dark };
        font-weight: 500;
        font-size: 25px;
        box-sizing: content-box;
        height: 40px;
        padding: 10px 10px;
        display: flex;
        border-radius: 8px;
    }

    .words {

        font-size: 3rem;
        overflow: hidden;
        transform: translateY(20px);
        line-height: 4px;
    }

    .word {

        animation: cycle-words 5s alternate infinite;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding-left: 6px;
        color: #6D22F5;
        margin: 8px 0;
    }

    @keyframes cycle-words {

        10% {

            transform: translateY(-155%);
            color: #F8D347;
        }

        25% {

            transform: translateY(-140%);
            color: #E94C50;
        }

        35% {

            transform: translateY(-250%);
            color: #DA2FBE;
        }

        50% {

            transform: translateY(-255%);
            color: #6D22F5;
        }

        60% {

            transform: translateY(-355%);
            color: #E94C50;
        }

        75% {

            transform: translateY(-385%);
            color: #F8D347;
        }

        85% {

            transform: translateY(-395%);
            color: #E94C50;
        }
    }

    @keyframes tri-spinner {

        100% {

            transform: rotate(1turn);
        }
    }

`

export const Infinite = styled.div`

    #outline {

        stroke-dasharray: 2.42777px, 242.77666px;
        stroke-dashoffset: 0;
        animation: anim 1.6s linear infinite;
    }

    @keyframes anim {

        12.5% {

            stroke-dasharray: 33.98873px, 242.77666px;
            stroke-dashoffset: -26.70543px;
            stroke: #F8D347;
        }

        43.75% {

            stroke-dasharray: 84.97183px, 242.77666px;
            stroke-dashoffset: -84.97183px;
            stroke: #E94C50;
        }

        100% {

            stroke-dasharray: 2.42777px, 242.77666px;
            stroke-dashoffset: -240.34889px;
            stroke: #DA2FBE;
        }
    }

`
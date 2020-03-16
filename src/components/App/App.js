import React from 'react';
import './App.scss';
import Emoji from './Emoji/Emoji';

function App() {
  return (
    <div className="App">
      <div className="App__left">
        <h1 className="App__left--title App__left--title_top">Student</h1>
        <h1 className="App__left--title App__left--title_bottom">Meals</h1>
        <button className="App__left--btn">
          <span>Begin your journey</span> 
          <i className="material-icons">arrow_forward</i>
        </button>
      </div>
      <div className="App__right">
      <Emoji></Emoji>
      <svg width="1018" height="1042" viewBox="0 0 1018 1042" className="App__right--blob" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i)">
          <path fillRule="evenodd" clipRule="evenodd" d="M63.6424 535.675C54.0172 437.666 64.9543 329.838 128.91 254.951C188.611 185.045 297.468 199.735 381.798 163.136C458.212 129.972 515.17 55.2984 598.37 51.2051C690.822 46.6566 796.706 67.4545 854.338 139.887C911.17 211.315 854.979 318.092 880.463 405.741C912.2 514.9 1040.51 596.258 1019.51 707.981C998.334 820.658 890.96 915.349 779.581 942.534C672.644 968.634 581.305 864.802 473.795 841.176C376.435 819.78 263.516 871.1 183.572 811.555C101.138 750.154 73.6886 637.972 63.6424 535.675Z" fill="#FFC370"/>
        </g>
        <defs>          
          <filter id="filter0_i" x="0" y="-15" width="1082.78" height="1059.3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="25" dy="-15"/>
            <feGaussianBlur stdDeviation="25"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </filter>
        </defs>
      </svg>
      </div>
      <div className="App__border"></div>
    </div>
  );
}

export default App;

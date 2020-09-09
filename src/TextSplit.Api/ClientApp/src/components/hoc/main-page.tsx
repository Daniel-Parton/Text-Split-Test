import React from "react";

function MainPage<P>(Component: React.ComponentType<P>) {
  return function MainPageComponent(props: P) {
    return (
      <div className='main-page'>
        <Component {...props} />
      </div>
    );
  }
}

export default MainPage;
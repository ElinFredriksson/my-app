

import React from 'react';

interface SectionProps {
    page: string;
    description: string;
    }



const Section: React.FC<SectionProps> = (props) => {
    return (
      <>
      <div className="smallHero">
        <h1 >{props.page}</h1>
        <p >{props.description}</p>
      </div>
      </>
    )
  }
  
  export default Section
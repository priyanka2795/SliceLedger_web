import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn } from '@fortawesome/free-solid-svg-icons'
export default function ServiceCard() {
  return (
    <>
      <div className="slice_serviceCard">
        <div className="slice_serviceContent">
          <FontAwesomeIcon icon={faBurn} />
          <h4 className='my-3'>Title</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe repellendus nostrum, deserunt consectetur sed velit mollitia. Laboriosam libero adipisci dicta earum mollitia minima velit officia impedit. Magnam illum quis officiis!</p>
        </div>
      </div>
    </>
  )
}
